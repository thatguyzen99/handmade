"""Full-page and section screenshots of the local Handmade studio."""
import json, sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = "/workspace/zen-studio/shots"

def page_for(browser, mode, width=1440, height=900, mobile=False, path="/"):
    ctx = browser.new_context(
        viewport={"width": width, "height": height},
        device_scale_factor=1 if not mobile else 2,
        is_mobile=mobile,
        has_touch=mobile,
    )
    p = ctx.new_page()
    errors = []
    p.on("pageerror", lambda e: errors.append(str(e)))
    p.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    if mode == "dark":
        ctx.add_init_script("""
          try {
            const k = 'handmade:theme';
            let c = {};
            try { c = JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) {}
            c.mode = 'dark';
            c.primary = '#0A0A0A';
            c.primaryDark = '#F7F4EE';
            localStorage.setItem(k, JSON.stringify(c));
          } catch (e) {}
        """)
    p.goto(BASE + path, wait_until="load")
    p.wait_for_timeout(800)
    h = p.evaluate("document.body.scrollHeight")
    for y in range(0, int(h), 800):
        p.evaluate(f"window.scrollTo(0,{y})"); p.wait_for_timeout(60)
    p.evaluate("window.scrollTo(0,0)"); p.wait_for_timeout(600)
    return ctx, p, errors

def overflow_at(p):
    return p.evaluate("""() => {
      const sw = document.documentElement.scrollWidth - window.innerWidth;
      const wide = [...document.querySelectorAll('body *')].filter(e => {
        const r = e.getBoundingClientRect();
        const s = getComputedStyle(e);
        return r.right > window.innerWidth + 2 && s.position !== 'fixed' && s.position !== 'sticky';
      }).slice(0, 12).map(e => (e.id || e.className || e.tagName).toString().slice(0, 90));
      return { overflow_px: sw, wide };
    }""")

with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    report = {}
    for mode in ["light", "dark"]:
        ctx, p, errors = page_for(b, mode)
        p.screenshot(path=f"{OUT}/home-{mode}.png", full_page=True)
        p.locator("header").first.screenshot(path=f"{OUT}/nav-{mode}.png")
        # first-viewport hero
        p.screenshot(path=f"{OUT}/hero-{mode}.png", full_page=False)
        for sid in ["brand", "foundations", "more-components", "widgets", "patterns", "animation"]:
            el = p.locator(f"#{sid}")
            if el.count():
                el.scroll_into_view_if_needed(); p.wait_for_timeout(400)
                el.screenshot(path=f"{OUT}/{sid}-{mode}.png")
        report[mode] = errors
        report[f"{mode}_overflow_1440"] = overflow_at(p)

        # Close-ups: play buttons, pricing highlight
        music = p.locator("[data-slot='music-player']")
        if music.count():
            music.first.scroll_into_view_if_needed(); p.wait_for_timeout(300)
            music.first.screenshot(path=f"{OUT}/widget-music-{mode}.png")
            play = music.first.locator("[aria-label='Play']")
            if play.count():
                play.first.screenshot(path=f"{OUT}/play-music-{mode}.png")
        featured = p.get_by_text("Most popular", exact=True)
        if featured.count():
            card = featured.first.locator("xpath=ancestor::*[@data-slot='pricing-card']")
            if card.count():
                card.first.scroll_into_view_if_needed(); p.wait_for_timeout(200)
                card.first.screenshot(path=f"{OUT}/pricing-featured-{mode}.png")
        patt_play = p.locator("[data-music-play]")
        if patt_play.count():
            patt_play.first.scroll_into_view_if_needed(); p.wait_for_timeout(200)
            # wider crop around the control
            patt_play.first.screenshot(path=f"{OUT}/play-pattern-music-{mode}.png")
        rec = p.get_by_role("button", name="Play recording")
        if rec.count():
            rec.first.scroll_into_view_if_needed(); p.wait_for_timeout(200)
            rec.first.screenshot(path=f"{OUT}/play-standup-{mode}.png")
        ctx.close()

        # animation route
        ctx, p, errors = page_for(b, mode, path="/animation")
        p.screenshot(path=f"{OUT}/animation-page-{mode}.png", full_page=True)
        report[f"animation_{mode}"] = errors
        ctx.close()

    ctx, p, errors = page_for(b, "light", 390, 844, mobile=True)
    p.screenshot(path=f"{OUT}/home-mobile-light.png", full_page=True)
    report["mobile"] = errors
    report["mobile_overflow_390"] = overflow_at(p)
    ctx.close()

    ctx, p, errors = page_for(b, "dark", 390, 844, mobile=True)
    p.screenshot(path=f"{OUT}/home-mobile-dark.png", full_page=True)
    ctx.close()

    ctx, p, errors = page_for(b, "light", 390, 844, mobile=True, path="/animation")
    p.screenshot(path=f"{OUT}/animation-mobile.png", full_page=True)
    report["animation_mobile"] = errors
    ctx.close()

    # 360 overflow
    ctx, p, errors = page_for(b, "light", 360, 800, mobile=True)
    report["overflow_360"] = overflow_at(p)
    p.screenshot(path=f"{OUT}/home-360-light.png", full_page=False)
    ctx.close()

    b.close()
    print(json.dumps(report, indent=1))

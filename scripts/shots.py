"""Full-page screenshots of the local studio (light, dark, mobile) and its new sections."""
import json, sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = "/workspace/zen-studio/shots"

def page_for(browser, mode, width=1440, height=900, mobile=False):
    ctx = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1 if not mobile else 2, is_mobile=mobile, has_touch=mobile)
    if mode == "dark":
        ctx.add_init_script("""
          try {
            const k = 'zen:theme';
            const c = JSON.parse(localStorage.getItem(k) || 'null');
            if (!c || c.mode !== 'dark') localStorage.setItem(k, JSON.stringify({ ...(c || {}), mode: 'dark' }));
          } catch (e) {}
        """)
    p = ctx.new_page()
    errors = []
    p.on("pageerror", lambda e: errors.append(str(e)))
    p.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    p.goto(BASE + "/", wait_until="networkidle")
    p.wait_for_timeout(1500)
    # scroll through so charts (ResponsiveContainer) measure and lazy fonts load
    h = p.evaluate("document.body.scrollHeight")
    for y in range(0, h, 800):
        p.evaluate(f"window.scrollTo(0,{y})"); p.wait_for_timeout(60)
    p.evaluate("window.scrollTo(0,0)"); p.wait_for_timeout(600)
    return ctx, p, errors

with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    report = {}
    for mode in ["light", "dark"]:
        ctx, p, errors = page_for(b, mode)
        p.screenshot(path=f"{OUT}/home-{mode}.png", full_page=True)
        for sid in ["more-components", "widgets", "patterns"]:
            el = p.locator(f"#{sid}")
            el.scroll_into_view_if_needed(); p.wait_for_timeout(300)
            el.screenshot(path=f"{OUT}/{sid}-{mode}.png")
        report[mode] = errors
        ctx.close()
    ctx, p, errors = page_for(b, "light", 390, 844, mobile=True)
    p.screenshot(path=f"{OUT}/home-mobile-light.png", full_page=True)
    overflow = p.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    report["mobile"] = errors; report["mobile_overflow_px"] = overflow
    # elements wider than the viewport
    report["mobile_wide"] = p.evaluate("""() => [...document.querySelectorAll('main *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > window.innerWidth + 1 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 15).map(e => (e.id || e.className || e.tagName).toString().slice(0, 90))""")
    ctx.close()
    ctx, p, errors = page_for(b, "dark", 390, 844, mobile=True)
    p.screenshot(path=f"{OUT}/home-mobile-dark.png", full_page=True)
    ctx.close()
    b.close()
    print(json.dumps(report, indent=1))

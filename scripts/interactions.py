"""Opens the new overlays one by one and screenshots them (checks they work, and catches console errors)."""
import json
from playwright.sync_api import sync_playwright
OUT = "/workspace/zen-studio/shots"
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    p = b.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    p.on("pageerror", lambda e: errors.append(str(e)))
    p.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    p.goto("http://localhost:3100/#more-components", wait_until="networkidle"); p.wait_for_timeout(800)
    sec = p.locator("#more-components")
    def shot(name):
        p.wait_for_timeout(400); p.screenshot(path=f"{OUT}/interact-{name}.png")
    def esc():
        p.keyboard.press("Escape"); p.wait_for_timeout(300)
    results = {}
    def step(name, fn):
        try:
            fn(); shot(name); results[name] = "ok"
        except Exception as e:
            results[name] = f"FAIL {e}"[:200]
        esc()
    step("dropdown", lambda: (sec.get_by_role("button", name="Account").scroll_into_view_if_needed(), sec.get_by_role("button", name="Account").click()))
    step("popover", lambda: sec.get_by_role("button", name="Share").click())
    step("combobox", lambda: (sec.get_by_role("combobox", name="Framework").click(), p.keyboard.type("sv")))
    step("command-dialog", lambda: (p.mouse.click(5, 300), p.keyboard.press("Control+k")))
    def toast():
        sec.get_by_role("button", name="With action").scroll_into_view_if_needed(); sec.get_by_role("button", name="With action").click()
        sec.get_by_role("button", name="Success").click()
    step("toast", toast)
    step("sheet", lambda: sec.get_by_role("button", name="Open sheet").click())
    step("drawer", lambda: sec.get_by_role("button", name="Open drawer").click())
    step("date-picker", lambda: (sec.locator("[data-slot=date-picker-trigger]").first.scroll_into_view_if_needed(), sec.locator("[data-slot=date-picker-trigger]").first.click()))
    # sort the table by amount
    def sort():
        btn = sec.locator("[data-slot=table-sort]", has_text="Amount"); btn.scroll_into_view_if_needed(); btn.click(); btn.click()
        results["sorted_first_amount"] = sec.locator("[data-slot=table] tbody tr").first.locator("td").nth(2).inner_text()
    step("table-sorted", sort)
    # dark mode via the customizer toggle
    p.evaluate("localStorage.setItem('melxels:theme', JSON.stringify({...JSON.parse(localStorage.getItem('melxels:theme')||'{}'), mode:'dark'}))")
    p.reload(wait_until="networkidle"); p.wait_for_timeout(800)
    sec = p.locator("#more-components")
    step("dropdown-dark", lambda: (sec.get_by_role("button", name="Account").scroll_into_view_if_needed(), sec.get_by_role("button", name="Account").click()))
    step("sheet-dark", lambda: (sec.get_by_role("button", name="Open sheet").scroll_into_view_if_needed(), sec.get_by_role("button", name="Open sheet").click()))
    results["errors"] = errors
    print(json.dumps(results, indent=1))
    b.close()

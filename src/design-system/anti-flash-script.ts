/** Blocking head script: apply stored mode and visual style before first paint. */
export const antiFlashScript = `(function(){
  try {
    var style = "handmade";
    var dark = false;
    var raw = localStorage.getItem("handmade:theme") || localStorage.getItem("melxels:theme") || localStorage.getItem("zen:theme");
    var c = raw ? JSON.parse(raw) : {};
    var t = new URLSearchParams(location.hash.slice(1)).get("t");
    if (t) {
      try {
        var d = JSON.parse(atob(t));
        if (d && typeof d === "object") c = d;
      } catch (e) {}
    }
    if (c.style === "glass" || c.style === "brutal") style = c.style;
    if (c.mode === "dark") dark = true;
    document.documentElement.setAttribute("data-style", style);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();`;

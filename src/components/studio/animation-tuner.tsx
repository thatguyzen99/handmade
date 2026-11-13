"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabList, TabTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { CHROME_CLASS } from "@/design-system/tokens";
import { useTheme } from "./theme-provider";

type Mode = "bezier" | "spring";
type BZ = [number, number, number, number];

const PRESETS: Record<string, BZ> = {
  "ease-out (snappy)": [0.16, 1, 0.3, 1],
  "ease-tactile (theme)": [0.23, 1, 0.32, 1],
  "ease-in-out": [0.65, 0, 0.35, 1],
  "ease-out quint": [0.22, 1, 0.36, 1],
  "ease-out back": [0.34, 1.56, 0.64, 1],
  "material standard": [0.2, 0, 0, 1],
  "ios sheet": [0.32, 0.72, 0, 1],
  linear: [0, 0, 1, 1],
  "ease-in (exits)": [0.55, 0, 1, 0.45],
};

const DEFAULTS = {
  mode: "bezier" as Mode,
  preset: "ease-tactile (theme)",
  bz: PRESETS["ease-tactile (theme)"],
  duration: 160,
  delay: 0,
  stiffness: 260,
  damping: 22,
  mass: 1,
  velocity: 0,
  x: 0,
  y: 24,
  scale: 0.96,
  rotate: 0,
  opacity: 0,
  blur: 6,
  count: 4,
  stagger: 60,
  loop: true,
  slow: false,
};
type State = typeof DEFAULTS;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const r2 = (n: number) => Math.round(n * 100) / 100;
const isState = (v: unknown): v is State => !!v && typeof v === "object" && Array.isArray((v as State).bz) && (v as State).bz.length === 4;

function springCurve(stiffness: number, damping: number, mass: number, velocity: number) {
  const dt = 1 / 120;
  let x = 0, v = velocity;
  const pts: number[] = [];
  let t = 0, settled = 0, ok = false;
  while (t < 6) {
    const f = -stiffness * (x - 1) - damping * v;
    v += (f / Math.max(0.1, mass)) * dt;
    x += v * dt;
    pts.push(x);
    t += dt;
    if (Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.01) {
      settled++;
      if (settled > 6) { ok = true; break; }
    } else settled = 0;
  }
  return { points: pts, duration: Math.round(t * 1000), settled: ok };
}

function linearEasing(pts: number[]) {
  const step = Math.max(1, Math.floor(pts.length / 60));
  const out: string[] = [];
  for (let i = 0; i < pts.length; i += step) out.push(pts[i].toFixed(3));
  out.push("1");
  return `linear(${out.join(", ")})`;
}

function bezierAt(p: BZ, t: number) {
  const u = 1 - t;
  return {
    x: 3 * u * u * t * p[0] + 3 * u * t * t * p[2] + t * t * t,
    y: 3 * u * u * t * p[1] + 3 * u * t * t * p[3] + t * t * t,
  };
}

function usePersist() {
  const [saved, setSaved] = React.useState<State>(DEFAULTS);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("melxels:anim");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isState(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate knobs from browser storage
          setSaved({ ...DEFAULTS, ...parsed });
        }
      }
    } catch {}
    setReady(true);
  }, []);
  React.useEffect(() => {
    if (ready) localStorage.setItem("melxels:anim", JSON.stringify(saved));
  }, [saved, ready]);
  return [saved, setSaved] as const;
}

function Knob({
  label, value, onChange, min, max, step = 1, unit,
}: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; unit?: string }) {
  return (
    <div className="min-w-0 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-ui-xs text-fg-muted">{label}</Label>
        <span className="text-ui-xs tabular-nums text-fg">{unit ? `${value}${unit}` : value}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0] ?? value)} />
    </div>
  );
}

export function AnimationTuner() {
  const { update, config } = useTheme();
  const [saved, setSaved] = usePersist();
  const s: State = { ...DEFAULTS, ...saved };
  const set = <K extends keyof State>(k: K, v: State[K]) => setSaved((p) => ({ ...DEFAULTS, ...p, [k]: v }));
  const setBzAt = (i: number, n: number) => {
    const next = [...s.bz] as BZ;
    next[i] = n;
    setSaved((p) => ({ ...DEFAULTS, ...p, bz: next, preset: "custom" }));
  };

  const [run, setRun] = React.useState(0);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  const count = clamp(Math.round(s.count), 1, 8);
  const spring = springCurve(s.stiffness, s.damping, s.mass, s.velocity);
  const bz = s.bz.map((n, i) => (i % 2 === 0 ? clamp(n, 0, 1) : clamp(n, -1, 2))) as BZ;
  const easing = s.mode === "spring" ? linearEasing(spring.points) : `cubic-bezier(${bz.join(", ")})`;
  const dur = s.mode === "spring" ? spring.duration : clamp(s.duration, 50, 2000);
  const factor = s.slow ? 4 : 1;
  const [fallback, setFallback] = React.useState(false);

  React.useEffect(() => {
    const anims: Animation[] = [];
    const from = { transform: `translate(${s.x}px, ${s.y}px) scale(${s.scale}) rotate(${s.rotate}deg)`, opacity: s.opacity, filter: `blur(${s.blur}px)` };
    const to = { transform: "translate(0px, 0px) scale(1) rotate(0deg)", opacity: 1, filter: "blur(0px)" };
    let fb = false;
    refs.current.slice(0, count).forEach((el, i) => {
      if (!el || !el.animate) return;
      const opts = { duration: dur * factor, delay: (s.delay + i * s.stagger) * factor, fill: "both" as FillMode };
      try { anims.push(el.animate([from, to], { ...opts, easing })); }
      catch { fb = true; anims.push(el.animate([from, to], { ...opts, easing: "ease-out" })); }
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- animation engine capability is discovered while playing
    setFallback(fb);
    let timer = 0;
    if (s.loop) {
      const total = (dur + s.delay + (count - 1) * s.stagger) * factor + 900;
      timer = window.setTimeout(() => setRun((r) => r + 1), total);
    }
    return () => { anims.forEach((a) => a.cancel()); window.clearTimeout(timer); };
  }, [run, easing, dur, s.delay, s.x, s.y, s.scale, s.rotate, s.opacity, s.blur, count, s.stagger, s.loop, factor]);

  const graph = (() => {
    const W = 220, H = 160, pad = 30;
    const ys: { t: number; v: number }[] = [];
    if (s.mode === "spring") {
      const n = spring.points.length;
      spring.points.forEach((v, i) => { if (i % 2 === 0 || i === n - 1) ys.push({ t: i / Math.max(1, n - 1), v }); });
    } else {
      for (let i = 0; i <= 60; i++) { const p = bezierAt(bz, i / 60); ys.push({ t: p.x, v: p.y }); }
    }
    const lo = Math.min(0, ...ys.map((p) => p.v)), hi = Math.max(1, ...ys.map((p) => p.v));
    const yOf = (v: number) => pad + H - ((v - lo) / (hi - lo)) * H;
    const d = "M" + ys.map((p) => `${(pad + p.t * W).toFixed(1)},${yOf(p.v).toFixed(1)}`).join(" L");
    return { d, y0: yOf(0), y1: yOf(1) };
  })();

  const css = `.item {
  animation: enter ${dur}ms ${s.mode === "spring" ? "var(--spring)" : easing} both;
  animation-delay: calc(${s.delay}ms + var(--i) * ${s.stagger}ms);
}
${s.mode === "spring" ? `:root { --spring: ${easing}; }\n` : ""}@keyframes enter {
  from { opacity: ${s.opacity}; transform: translate(${s.x}px, ${s.y}px) scale(${s.scale}) rotate(${s.rotate}deg); filter: blur(${s.blur}px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@media (prefers-reduced-motion: reduce) { .item { animation: none; } }`;

  const transition = s.mode === "spring"
    ? `transition={{ type: "spring", stiffness: ${s.stiffness}, damping: ${s.damping}, mass: ${s.mass}, velocity: ${s.velocity}, delay: ${s.delay / 1000} }}`
    : `transition={{ duration: ${dur / 1000}, ease: [${bz.join(", ")}], delay: ${s.delay / 1000} }}`;
  const framer = `<motion.div
  initial={{ opacity: ${s.opacity}, x: ${s.x}, y: ${s.y}, scale: ${s.scale}, rotate: ${s.rotate}, filter: "blur(${s.blur}px)" }}
  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
  ${transition}
/>
// stagger children: ${s.stagger / 1000}s`;

  const tokens = s.mode === "bezier"
    ? `:root {
  --ease-tactile: cubic-bezier(${bz.join(", ")});
  --duration-enter: ${dur}ms;
}`
    : `:root {
  --duration-enter: ${dur}ms;
  /* Spring easing isn't a cubic-bezier; copy the CSS or Framer Motion instead. */
}`;

  const warnings: string[] = [];
  if (s.mode === "spring" && !spring.settled) warnings.push("This spring does not settle within 6 seconds; the preview cuts it at 6000ms. Raise damping or stiffness.");
  if (dur > 1000 && s.mode === "bezier") warnings.push("Over 1000ms reads as slow for UI entrances.");
  if (Math.abs(s.x) > 64 || Math.abs(s.y) > 64) warnings.push("Movement over 64px can feel like a slide, not an entrance.");
  if (s.scale === 0) warnings.push("Scale 0 makes items pop from a point; 0.9 to 0.98 is usually calmer.");
  if (fallback) warnings.push("This browser cannot play linear() spring easing; the preview is using ease-out. The copied code still has the spring.");

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const applyTheme = () => {
    if (s.mode === "bezier") {
      update({ motion: { ease: bz, duration: dur } });
    } else {
      update({ motion: { ...config.motion, duration: dur } });
    }
    toast.success("Applied to the Melxels theme — duration and easing are in the export.");
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-ui-md text-fg">Preview</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="small" onClick={() => setRun((r) => r + 1)}>Replay</Button>
            <label className="flex items-center gap-2 text-ui-xs text-fg-muted">
              <Switch size="sm" checked={s.loop} onCheckedChange={(v) => set("loop", v)} />
              Loop
            </label>
            <label className="flex items-center gap-2 text-ui-xs text-fg-muted">
              <Switch size="sm" checked={s.slow} onCheckedChange={(v) => set("slow", v)} />
              Slow motion
            </label>
          </div>
        </div>
        <div className="flex min-h-64 flex-wrap items-center justify-center gap-4 overflow-hidden rounded-2xl bg-canvas p-5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="flex h-36 w-28 flex-col gap-2 rounded-2xl bg-surface p-4 shadow-sm will-change-[transform,opacity,filter]"
            >
              <div className={["h-14 rounded-xl bg-primary", "h-14 rounded-xl bg-highlight", "h-14 rounded-xl bg-caution"][i % 3]} />
              <div className="h-2 w-4/5 rounded-full bg-track-strong" />
              <div className="h-2 w-1/2 rounded-full bg-track" />
            </div>
          ))}
        </div>
        {warnings.map((w) => (
          <p key={w} className="text-body-xs text-danger-fg">{w}</p>
        ))}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <h3 className="text-ui-md text-fg">Timing</h3>
          <div className="space-y-2">
            <Label className="text-ui-xs text-fg-muted">Timing mode</Label>
            <SegmentedControl value={s.mode} onValueChange={(v) => set("mode", v as Mode)} className="w-full">
              <SegmentedControlItem value="bezier">Cubic bezier</SegmentedControlItem>
              <SegmentedControlItem value="spring">Spring physics</SegmentedControlItem>
            </SegmentedControl>
          </div>
          {s.mode === "bezier" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-ui-xs text-fg-muted">Preset</Label>
                <Select
                  value={PRESETS[s.preset] ? s.preset : "custom"}
                  onValueChange={(v) => { if (PRESETS[v]) setSaved((p) => ({ ...DEFAULTS, ...p, preset: v, bz: PRESETS[v] })); }}
                >
                  <SelectTrigger size="small"><SelectValue /></SelectTrigger>
                  <SelectContent className={CHROME_CLASS}>
                    {Object.keys(PRESETS).map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                    <SelectItem value="custom">Custom (from knobs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Knob label="Duration" value={s.duration} onChange={(n) => set("duration", n)} min={50} max={2000} step={10} unit="ms" />
              <div className="grid grid-cols-2 gap-4">
                <Knob label="x1" value={bz[0]} onChange={(n) => setBzAt(0, n)} min={0} max={1} step={0.01} />
                <Knob label="y1" value={bz[1]} onChange={(n) => setBzAt(1, n)} min={-1} max={2} step={0.01} />
                <Knob label="x2" value={bz[2]} onChange={(n) => setBzAt(2, n)} min={0} max={1} step={0.01} />
                <Knob label="y2" value={bz[3]} onChange={(n) => setBzAt(3, n)} min={-1} max={2} step={0.01} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Knob label="Stiffness" value={s.stiffness} onChange={(n) => set("stiffness", n)} min={20} max={1000} step={5} />
              <Knob label="Damping" value={s.damping} onChange={(n) => set("damping", n)} min={1} max={80} />
              <Knob label="Mass" value={s.mass} onChange={(n) => set("mass", r2(n))} min={0.1} max={5} step={0.1} />
              <Knob label="Initial velocity" value={s.velocity} onChange={(n) => set("velocity", n)} min={-20} max={20} step={0.5} />
              <p className="text-body-xs text-fg-muted">{spring.settled ? `Settles in about ${spring.duration}ms.` : "Still moving at 6000ms (not settled)."}</p>
            </div>
          )}
          <Knob label="Delay" value={s.delay} onChange={(n) => set("delay", n)} min={0} max={1000} step={10} unit="ms" />
        </Card>

        <Card className="space-y-4 p-5">
          <h3 className="text-ui-md text-fg">Easing curve</h3>
          <svg viewBox="0 0 280 220" className="w-full max-w-md text-primary" role="img" aria-label="Easing curve: progress over time">
            <rect x="30" y="30" width="220" height="160" fill="none" className="stroke-line" />
            <line x1="30" y1={graph.y1} x2="250" y2={graph.y1} className="stroke-line-strong" strokeDasharray="3 3" />
            <line x1="30" y1={graph.y0} x2="250" y2={graph.y0} className="stroke-line-strong" strokeDasharray="3 3" />
            <path d={graph.d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="30" y="210" className="fill-fg-subtle" fontSize="11" fontFamily="var(--ds-font-mono)">time →</text>
            <text x="4" y={graph.y1 + 4} className="fill-fg-subtle" fontSize="11" fontFamily="var(--ds-font-mono)">1</text>
            <text x="4" y={graph.y0 + 4} className="fill-fg-subtle" fontSize="11" fontFamily="var(--ds-font-mono)">0</text>
            <text x="250" y="210" textAnchor="end" className="fill-fg-subtle" fontSize="11" fontFamily="var(--ds-font-mono)">{dur}ms</text>
          </svg>
        </Card>
      </div>

      <Card className="space-y-4 p-5">
        <h3 className="text-ui-md text-fg">Motion</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Knob label="Start X" value={s.x} onChange={(n) => set("x", n)} min={-200} max={200} unit="px" />
          <Knob label="Start Y" value={s.y} onChange={(n) => set("y", n)} min={-200} max={200} unit="px" />
          <Knob label="Start scale" value={s.scale} onChange={(n) => set("scale", r2(n))} min={0} max={1.5} step={0.01} />
          <Knob label="Start rotate" value={s.rotate} onChange={(n) => set("rotate", n)} min={-180} max={180} unit="°" />
          <Knob label="Start opacity" value={s.opacity} onChange={(n) => set("opacity", r2(n))} min={0} max={1} step={0.05} />
          <Knob label="Start blur" value={s.blur} onChange={(n) => set("blur", n)} min={0} max={30} unit="px" />
          <Knob label="Items" value={count} onChange={(n) => set("count", n)} min={1} max={8} />
          <Knob label="Stagger" value={s.stagger} onChange={(n) => set("stagger", n)} min={0} max={300} step={5} unit="ms" />
        </div>
        <p className="text-body-sm text-fg-muted">Good defaults: entrances 200 to 500ms with ease-out, exits shorter with ease-in, stagger 30 to 80ms, movement under 32px, and a short blur for softness.</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={applyTheme}>Apply to theme</Button>
          <Button variant="neutral" mode="outline" onClick={() => { setSaved(DEFAULTS); setRun((r) => r + 1); }}>Reset knobs</Button>
        </div>
      </Card>

      <Card className="space-y-4 p-5">
        <h3 className="text-ui-md text-fg">Code</h3>
        <Tabs defaultValue="css">
          <TabList>
            <TabTrigger value="css">CSS</TabTrigger>
            <TabTrigger value="framer">Framer Motion</TabTrigger>
            <TabTrigger value="tokens">Theme tokens</TabTrigger>
          </TabList>
          <TabsContent value="css" className="space-y-3 pt-4">
            <pre className="max-h-80 overflow-auto rounded-xl bg-canvas p-4 text-body-xs text-fg whitespace-pre-wrap break-all">{css}</pre>
            <Button size="small" onClick={() => copy(css, "CSS")}>Copy CSS</Button>
          </TabsContent>
          <TabsContent value="framer" className="space-y-3 pt-4">
            <pre className="max-h-80 overflow-auto rounded-xl bg-canvas p-4 text-body-xs text-fg whitespace-pre-wrap break-all">{framer}</pre>
            <div className="flex flex-wrap gap-2">
              <Button size="small" onClick={() => copy(framer, "Framer Motion")}>Copy Framer Motion</Button>
              <Button size="small" variant="neutral" mode="outline" onClick={() => copy(JSON.stringify({ ...s, easing, durationMs: dur }, null, 2), "settings JSON")}>Copy settings JSON</Button>
            </div>
          </TabsContent>
          <TabsContent value="tokens" className="space-y-3 pt-4">
            <pre className="max-h-80 overflow-auto rounded-xl bg-canvas p-4 text-body-xs text-fg whitespace-pre-wrap break-all">{tokens}</pre>
            <p className="text-body-xs text-fg-muted">These tokens ship with the registry and the Claude skill once you apply them to the theme.</p>
            <div className="flex flex-wrap gap-2">
              <Button size="small" onClick={() => copy(tokens, "theme tokens")}>Copy tokens</Button>
              <Button size="small" variant="neutral" mode="outline" onClick={applyTheme}>Apply to theme</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

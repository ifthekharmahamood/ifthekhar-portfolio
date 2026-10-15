import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FileText, LayoutTemplate, Code2, ShieldCheck, Users } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   The day of a product manager, drawn as a single line.
   A signal travels: requirements → planning → building →
   shipping → the people who actually use the thing.
   Each station lights as the signal arrives, then dims behind it.
   ────────────────────────────────────────────────────────────── */

/* A cosine valley rather than a sine wave: the curve dives to its
   lowest point at dead centre, so the name in the middle of the hero
   never has a station sitting behind it. `fx/fy` are fractions of the
   hero box — `c` variants kick in below 768px. */
const STATIONS = [
  { id: '01', label: 'REQUIREMENTS', Icon: FileText,      fx: 0.08, fy: 0.26, cx: 0.10, cy: 0.16 },
  { id: '02', label: 'PLANNING',     Icon: LayoutTemplate, fx: 0.25, fy: 0.52, cx: 0.24, cy: 0.72 },
  { id: '03', label: 'DEVELOPING',   Icon: Code2,          fx: 0.50, fy: 0.85, cx: 0.50, cy: 0.90 },
  { id: '04', label: 'SHIPPING',     Icon: ShieldCheck,    fx: 0.75, fy: 0.52, cx: 0.76, cy: 0.72 },
  { id: '05', label: 'END USERS',    Icon: Users,          fx: 0.92, fy: 0.26, cx: 0.90, cy: 0.16 },
];

const TRAVEL = 900; // ms between two stations
const DWELL = 620; // ms held at a station

/* Cubic béziers with horizontal tangents at every point — a clean
   sine-like wave that flattens as it arrives at each station. */
function smoothPath(pts) {
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cx = (x2 - x1) * 0.5;
    d += ` C ${(x1 + cx).toFixed(1)},${y1.toFixed(1)} ${(x2 - cx).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return d;
}

/* Below 768px the stations use their compact coordinates. */
const at = (s, compact) => [compact ? s.cx : s.fx, compact ? s.cy : s.fy];

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

export default function JourneyBackdrop() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const trailRef = useRef(null);
  const pulseRef = useRef(null);
  const glowRef = useRef(null);
  const stationRefs = useRef([]);

  const [box, setBox] = useState({ w: 0, h: 0 });

  const compact = box.w > 0 && box.w < 768;
  const nodeSize = compact ? 46 : 72;

  /* Measure the hero and rebuild the curve on resize. */
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setBox(prev => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const d = useMemo(() => {
    const { w, h } = box;
    if (!w || !h) return '';
    const edge = compact ? 0.05 : 0.14;
    const pts = [
      [-0.13 * w, edge * h],
      ...STATIONS.map(s => {
        const [x, y] = at(s, compact);
        return [x * w, y * h];
      }),
      [1.13 * w, edge * h],
    ];
    return smoothPath(pts);
  }, [box, compact]);

  /* Drive the travelling signal. */
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !d) return;

    const total = path.getTotalLength();
    if (!total) return;

    // Where each station sits along the curve.
    const SAMPLES = 900;
    const marks = STATIONS.map(s => {
      const [ax, ay] = at(s, compact);
      const target = { x: ax * box.w, y: ay * box.h };
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= SAMPLES; i++) {
        const len = (i / SAMPLES) * total;
        const p = path.getPointAtLength(len);
        const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = len;
        }
      }
      return best;
    });

    // travel → dwell → travel → … → exit
    const legs = [];
    legs.push({ from: 0, to: marks[0], dur: TRAVEL });
    marks.forEach((m, i) => {
      legs.push({ from: m, to: m, dur: DWELL });
      if (i < marks.length - 1) legs.push({ from: m, to: marks[i + 1], dur: TRAVEL });
    });
    legs.push({ from: marks[marks.length - 1], to: total, dur: TRAVEL });
    const cycle = legs.reduce((a, l) => a + l.dur, 0);

    const TRAIL = Math.min(190, total * 0.14);
    const SPREAD = compact ? 90 : 132;
    const nodes = stationRefs.current;

    const paint = pos => {
      const p = path.getPointAtLength(Math.max(0, Math.min(total, pos)));

      if (pulseRef.current) {
        pulseRef.current.setAttribute('cx', p.x);
        pulseRef.current.setAttribute('cy', p.y);
      }
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', p.x);
        glowRef.current.setAttribute('cy', p.y);
      }
      if (trailRef.current) {
        trailRef.current.setAttribute('stroke-dasharray', `${TRAIL} ${total}`);
        trailRef.current.setAttribute('stroke-dashoffset', `${TRAIL - pos}`);
      }

      marks.forEach((m, i) => {
        const node = nodes[i];
        if (!node) return;
        const k = Math.exp(-(((pos - m) / SPREAD) ** 2));
        node.style.setProperty('--k', k.toFixed(3));
      });
    };

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      paint(marks[2]);
      return;
    }

    let raf = 0;
    let start = 0;

    const tick = now => {
      if (!start) start = now;
      let t = (now - start) % cycle;
      let pos = 0;
      for (const leg of legs) {
        if (t <= leg.dur) {
          pos = leg.from === leg.to ? leg.from : lerp(leg.from, leg.to, easeInOut(t / leg.dur));
          break;
        }
        t -= leg.dur;
        pos = leg.to;
      }
      paint(pos);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d, box, compact]);

  return (
    <div ref={wrapRef} className="journey absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        .journey { pointer-events: none; }
        .journey-node {
          --k: 0;
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -50%);
        }
        .journey-node .idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          margin-bottom: 10px;
          color: rgba(154,154,154, calc(0.18 + 0.62 * var(--k)));
        }
        .journey-node .box {
          display: grid;
          place-items: center;
          border-radius: 18px;
          border: 1px solid rgba(245,197,24, calc(0.09 + 0.71 * var(--k)));
          background: rgba(245,197,24, calc(0.015 + 0.055 * var(--k)));
          box-shadow:
            0 0 calc(34px * var(--k)) rgba(245,197,24, calc(0.28 * var(--k))),
            inset 0 0 calc(26px * var(--k)) rgba(245,197,24, calc(0.10 * var(--k)));
          transform: scale(calc(1 + 0.05 * var(--k)));
          transition: none;
        }
        .journey-node .box svg {
          color: rgba(245,197,24, calc(0.16 + 0.84 * var(--k)));
          opacity: calc(0.5 + 0.5 * var(--k));
        }
        .journey-node .cap {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          margin-top: 12px;
          white-space: nowrap;
          color: rgba(154,154,154, calc(0.20 + 0.7 * var(--k)));
        }
        @media (max-width: 767px) {
          .journey-node .cap, .journey-node .idx { display: none; }
        }
      `}</style>

      {d && (
        <svg
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          fill="none"
          className="absolute inset-0"
        >
          <defs>
            <filter id="pulse-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* the road */}
          <path
            ref={pathRef}
            d={d}
            stroke="rgba(245,197,24,0.20)"
            strokeWidth="1"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          {/* the stretch the signal just covered */}
          <path
            ref={trailRef}
            d={d}
            stroke="#F5C518"
            strokeWidth="1.4"
            strokeDasharray="0 99999"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* the signal */}
          <circle ref={glowRef} r="7" fill="#F5C518" opacity="0.5" filter="url(#pulse-glow)" />
          <circle ref={pulseRef} r="2.6" fill="#F5C518" />
        </svg>
      )}

      {box.w > 0 &&
        STATIONS.map((s, i) => (
          <div
            key={s.id}
            ref={el => (stationRefs.current[i] = el)}
            className="journey-node"
            style={{ left: `${at(s, compact)[0] * 100}%`, top: `${at(s, compact)[1] * 100}%` }}
          >
            <span className="idx">{s.id}</span>
            <span className="box" style={{ width: nodeSize, height: nodeSize }}>
              <s.Icon size={compact ? 18 : 24} strokeWidth={1.4} />
            </span>
            <span className="cap">{s.label}</span>
          </div>
        ))}
    </div>
  );
}

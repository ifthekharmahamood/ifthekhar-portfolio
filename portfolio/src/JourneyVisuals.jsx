/**
 * One diagram per product-lifecycle stage.
 *
 * These are inline SVG rather than image files on purpose: the whole set adds
 * a few KB to a bundle that already ships, costs no extra network request, is
 * resolution-independent on any display, and inherits the theme colours via
 * currentColor — so it stays correct if the palette changes. Each diagram
 * shows the actual shape of the work at that stage, not decoration.
 */

const T = '#2e5f45';   // teal, primary strokes
const M = '#8a9b86';   // muted, secondary strokes
const F = '#e7eee4';   // soft fill

// 01 — Ideation: scattered signals converging on one framed problem.
function Ideation() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="Scattered user signals converging into one framed problem">
      <g fill="none" stroke={M} strokeWidth="1.5">
        <path d="M18 28 Q70 46 96 88" strokeDasharray="3 4" />
        <path d="M40 150 Q74 124 96 100" strokeDasharray="3 4" />
        <path d="M196 34 Q140 52 120 86" strokeDasharray="3 4" />
        <path d="M186 158 Q146 126 124 102" strokeDasharray="3 4" />
      </g>
      {[[18, 28], [40, 150], [196, 34], [186, 158]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill={F} stroke={M} strokeWidth="1.5" />
      ))}
      <rect x="78" y="78" width="64" height="46" rx="8" fill={F} stroke={T} strokeWidth="2" />
      <path d="M92 101h36M110 89v24" stroke={T} strokeWidth="2" strokeLinecap="round" />
      <text x="110" y="156" textAnchor="middle" fontSize="12" fill={T} fontWeight="600">one problem</text>
    </svg>
  );
}

// 02 — Planning: a backlog cut by a scope line; what ships first vs. later.
function Planning() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="A prioritised backlog divided by a scope line">
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="24" y={30 + i * 26} width={118 - i * 16} height="17" rx="4" fill={F} stroke={T} strokeWidth="1.6" />
          <circle cx="34" cy={38.5 + i * 26} r="3" fill={T} />
        </g>
      ))}
      <path d="M14 122h192" stroke={T} strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" />
      <text x="206" y="117" textAnchor="end" fontSize="12" fill={T} fontWeight="600">scope</text>
      {[0, 1].map(i => (
        <rect key={i} x="24" y={134 + i * 24} width={92 - i * 18} height="15" rx="4"
              fill="none" stroke={M} strokeWidth="1.5" strokeDasharray="4 4" />
      ))}
      <text x="196" y="186" textAnchor="end" fontSize="12" fill={M}>later</text>
    </svg>
  );
}

// 03 — Design: a flow of screens with a tested branch feeding back.
function Design() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="A prototype flow of three screens with feedback returning to the first">
      {[22, 86, 150].map((x, i) => (
        <g key={i}>
          <rect x={x} y="52" width="48" height="62" rx="6" fill={F} stroke={i === 1 ? T : M} strokeWidth={i === 1 ? 2 : 1.5} />
          <path d={`M${x + 9} 66h30M${x + 9} 76h22M${x + 9} 86h26`} stroke={i === 1 ? T : M} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      <g stroke={T} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M70 83h14" /><path d="M78 79l6 4-6 4" />
        <path d="M134 83h14" /><path d="M142 79l6 4-6 4" />
      </g>
      <path d="M174 124q0 24-28 24H74q-28 0-28-24" fill="none" stroke={M} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M50 130l-4-7 8 0z" fill={M} />
      <text x="110" y="166" textAnchor="middle" fontSize="12" fill={M}>tested with users</text>
    </svg>
  );
}

// 04 — Development: work moving across a board, with one lane in review.
function Development() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="A delivery board with work moving between three columns">
      {['', '', ''].map((_, c) => (
        <rect key={c} x={16 + c * 66} y="26" width="56" height="150" rx="7"
              fill="none" stroke={M} strokeWidth="1.4" strokeDasharray="3 4" />
      ))}
      <g>
        <rect x="23" y="36" width="42" height="22" rx="4" fill={F} stroke={M} strokeWidth="1.5" />
        <rect x="23" y="64" width="42" height="22" rx="4" fill={F} stroke={M} strokeWidth="1.5" />
        <rect x="89" y="36" width="42" height="22" rx="4" fill={F} stroke={T} strokeWidth="2" />
        <rect x="89" y="64" width="42" height="22" rx="4" fill={F} stroke={T} strokeWidth="2" />
        <rect x="89" y="92" width="42" height="22" rx="4" fill={F} stroke={T} strokeWidth="2" />
        <rect x="155" y="36" width="42" height="22" rx="4" fill={T} stroke={T} strokeWidth="1.5" />
      </g>
      <path d="M163 47l5 5 9-10" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="190" textAnchor="middle" fontSize="12" fill={M}>todo</text>
      <text x="110" y="190" textAnchor="middle" fontSize="12" fill={T} fontWeight="600">building</text>
      <text x="176" y="190" textAnchor="middle" fontSize="12" fill={M}>done</text>
    </svg>
  );
}

// 05 — Launch: a staged rollout widening to the full audience.
function Launch() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="A staged rollout expanding from a small group to everyone">
      {[[58, 26, T], [110, 56, T], [162, 40, M]].map(([cx, r, stroke], i) => (
        <circle key={i} cx={cx} cy="96" r={r} fill={i === 2 ? 'none' : F} stroke={stroke}
                strokeWidth={i === 2 ? 1.5 : 2} strokeDasharray={i === 2 ? '5 5' : undefined} />
      ))}
      <g fill={T}>
        <circle cx="58" cy="96" r="4" />
        {[[100, 86], [118, 86], [100, 104], [118, 104], [109, 95]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" />)}
      </g>
      <g fill={M} opacity=".55">
        {[[150, 82], [168, 82], [150, 100], [168, 100], [159, 112], [159, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" />)}
      </g>
      <g stroke={T} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M86 96h10" /><path d="M90 92l5 4-5 4" />
        <path d="M170 96h12" /><path d="M176 92l5 4-5 4" />
      </g>
      <text x="58" y="156" textAnchor="middle" fontSize="12" fill={T} fontWeight="600">pilot</text>
      <text x="110" y="166" textAnchor="middle" fontSize="12" fill={T} fontWeight="600">region</text>
      <text x="166" y="156" textAnchor="middle" fontSize="12" fill={M}>everyone</text>
    </svg>
  );
}

// 06 — Follow-up: measured result against the goal, feeding the next cycle.
function Followup() {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="A measured result rising against a target line, feeding back into discovery">
      <g stroke={M} strokeWidth="1" opacity=".5">
        {[48, 80, 112, 144].map(y => <path key={y} d={`M26 ${y}h168`} />)}
      </g>
      <path d="M26 62h168" stroke={T} strokeWidth="1.6" strokeDasharray="5 4" />
      <text x="194" y="52" textAnchor="end" fontSize="12" fill={T} fontWeight="600">goal</text>
      <path d="M34 140 L72 128 L110 104 L148 84 L182 70" fill="none" stroke={T} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
      {[[34, 140], [72, 128], [110, 104], [148, 84], [182, 70]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={T} strokeWidth="2" />
      ))}
      <path d="M30 170q46 16 92 0" fill="none" stroke={M} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M30 170l-2-7 8 2z" fill={M} />
      <text x="134" y="178" fontSize="12" fill={M}>back to discovery</text>
    </svg>
  );
}

const visuals = [Ideation, Planning, Design, Development, Launch, Followup];

export default function JourneyVisual({ stage }) {
  const Visual = visuals[stage] ?? visuals[0];
  return (
    <div className="journey-visual" key={stage} aria-hidden="false">
      <Visual />
    </div>
  );
}

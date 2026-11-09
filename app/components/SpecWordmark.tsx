import type { CSSProperties } from 'react'
import Wordmark from './Wordmark'
import { wordmark as w } from './wordmark-data'

/*
 * The wordmark drawn as a technical figure: x-height and baseline guides,
 * and a leader line from the dot to the "fig. 1" label.
 *
 * Every position comes from the font geometry in wordmark-data.ts, so the
 * annotations stay attached to the letters at any size. Lines that need a
 * constant 1px weight are SVG with non-scaling strokes; dashed guides and
 * labels are HTML positioned in % of the wordmark's box.
 */

// Font units -> % of the wordmark box.
const pctX = (x: number) => ((x - w.minX) / w.width) * 100
const pctY = (y: number) => ((y - w.minY) / w.height) * 100

// Optional dashed ring hugging the dot; it must clear the top of the ı stem.
const dotToStem = -w.dot.cy - w.xHeight // distance from dot centre down to the stem top
const ringR = Math.min(w.dot.r * 1.35, dotToStem - 20)

// Leader runs up-right at 45° from the edge of the dot (or of the ring), then horizontal.
function leaderFrom(r: number) {
  const d = r * Math.SQRT1_2
  const start = { x: w.dot.cx + d, y: w.dot.cy - d }
  const elbow = { x: start.x + 360, y: start.y - 360 }
  const end = { x: elbow.x + 520, y: elbow.y }
  return { points: `${start.x},${start.y} ${elbow.x},${elbow.y} ${end.x},${end.y}`, end }
}

const vars = (v: Record<string, string>) => v as CSSProperties

type Props = {
  /** "touch": leader starts on the dot itself. "ring": dashed ring around the dot. */
  marker?: 'touch' | 'ring'
}

export default function SpecWordmark({ marker = 'touch' }: Props) {
  const leader = leaderFrom(marker === 'ring' ? ringR : w.dot.r)
  return (
    <div className="spec">
      <Wordmark block>
        {marker === 'ring' && (
          <circle
            cx={w.dot.cx}
            cy={w.dot.cy}
            r={ringR}
            fill="none"
            stroke="currentColor"
            // In font units: ~1px at the largest hero size, scaling down with it.
            // (Dashes on non-scaling strokes render unreliably, so this one scales.)
            strokeWidth={10}
            // pathLength makes the dash count independent of size: 24 dashes, 24 gaps.
            pathLength={48}
            strokeDasharray="1 1"
          />
        )}
        <polyline
          points={leader.points}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </Wordmark>

      <span className="spec-guide" style={vars({ '--y': `${pctY(-w.xHeight)}%` })} aria-hidden="true">
        <span className="spec-label spec-label--above">x-height</span>
      </span>
      <span className="spec-guide" style={vars({ '--y': `${pctY(0)}%` })} aria-hidden="true">
        <span className="spec-label spec-label--below">baseline</span>
      </span>
      <span
        className="spec-fig"
        style={vars({ '--x': `${pctX(leader.end.x)}%`, '--y': `${pctY(leader.end.y)}%` })}
        aria-hidden="true"
      >
        fig. 1<span className="spec-fig-long"> — the spark</span>
      </span>
    </div>
  )
}

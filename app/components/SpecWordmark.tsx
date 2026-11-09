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

// Leader runs up-right at 45° from the edge of the dot, then horizontal to the label.
const start = { x: w.dot.cx + w.dot.r * Math.SQRT1_2, y: w.dot.cy - w.dot.r * Math.SQRT1_2 }
const elbow = { x: start.x + 360, y: start.y - 360 }
const leaderEnd = { x: elbow.x + 520, y: elbow.y }
const leaderPoints = `${start.x},${start.y} ${elbow.x},${elbow.y} ${leaderEnd.x},${leaderEnd.y}`

const vars = (v: Record<string, string>) => v as CSSProperties

export default function SpecWordmark() {
  return (
    <div className="spec">
      <Wordmark block>
        <polyline
          points={leaderPoints}
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
        style={vars({ '--x': `${pctX(leaderEnd.x)}%`, '--y': `${pctY(leaderEnd.y)}%` })}
        aria-hidden="true"
      >
        fig. 1<span className="spec-fig-long"> — the spark</span>
      </span>
    </div>
  )
}

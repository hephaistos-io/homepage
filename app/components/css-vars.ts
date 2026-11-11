import type { CSSProperties } from 'react'

/**
 * Pass data to the stylesheet as CSS custom properties, e.g.
 * `style={cssVars({ '--stage-ratio': 0.46 })}`. Presentation stays in app.css;
 * components only hand over values that come from data.
 */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectImage } from '../projects/types'

/**
 * Filmstrip + thumbnail grid. Works for any mix of image shapes:
 *
 * - Strip: a 16:9-high box that scrolls sideways. Every image is shown at the
 *   strip's height and its own width (phone screenshots sit three abreast, a
 *   landscape shot takes most of the width), snapping per image. Width/height
 *   come from the build (`?dims`), so nothing shifts while images load.
 * - Thumbnails: as many full rows as fit in the remaining column height.
 *   Clicking one scrolls the strip to it; the ones in view are highlighted and
 *   the grid slides along with the strip. Rows are measured after hydration;
 *   the prerendered HTML shows one row. Column count comes from CSS (`--cols`).
 */
export default function Gallery({ images, fig }: { images: ProjectImage[]; fig: number }) {
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState<ReadonlySet<number>>(() => new Set([0]))
  const [perPage, setPerPage] = useState(5)

  // Which images are (mostly) visible in the strip.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const visible = new Set<number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.index)
          if (e.isIntersecting) visible.add(i)
          else visible.delete(i)
        }
        if (visible.size) setInView(new Set(visible))
      },
      { root: strip, threshold: 0.6 },
    )
    for (const el of strip.children) io.observe(el)
    return () => io.disconnect()
  }, [images])

  // How many thumbnail rows fit.
  useEffect(() => {
    const box = thumbsRef.current
    const grid = box?.firstElementChild as HTMLElement | null
    if (!box || !grid) return
    const ro = new ResizeObserver(() => {
      const style = getComputedStyle(grid)
      const cols = style.gridTemplateColumns.split(' ').length
      const gap = parseFloat(style.columnGap) || 0
      const cell = (box.clientWidth - gap * (cols - 1)) / cols
      const rows = Math.max(1, Math.floor((box.clientHeight + gap) / (cell + gap)))
      setPerPage(cols * rows)
    })
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  if (images.length === 0) return null

  const first = Math.min(...inView)
  const last = Math.max(...inView)
  // Sliding window that starts at the first image in view, so every image in
  // view has its thumbnail on screen (pinned to the end near the last image).
  const start = Math.max(0, Math.min(first, images.length - perPage))
  const visibleThumbs = images.slice(start, start + perPage)

  const scrollTo = (index: number) => {
    const strip = stripRef.current
    const el = strip?.children[index] as HTMLElement | undefined
    if (!strip || !el) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    strip.scrollTo({ left: el.offsetLeft, behavior: smooth ? 'smooth' : 'auto' })
  }

  const range = first === last ? `${first + 1}` : `${first + 1}–${last + 1}`

  return (
    <div className="gallery">
      <figure className="stage">
        <div className="film" ref={stripRef} tabIndex={0} role="region" aria-label="Images">
          {images.map((img, i) => (
            <img
              key={img.file}
              data-index={i}
              src={img.src}
              width={img.width}
              height={img.height}
              alt={`fig. ${fig}.${i + 1}`}
              loading={i < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>
        <figcaption className="mono stage-caption">
          <span>
            fig. {fig}.{range}
          </span>
          <span className="stage-nav">
            <span className="muted">
              {range} / {images.length}
            </span>
            {images.length > 1 && (
              <>
                <button type="button" className="strip-btn" aria-label="Previous image" disabled={first === 0} onClick={() => scrollTo(first - 1)}>
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button type="button" className="strip-btn" aria-label="Next image" disabled={last >= images.length - 1} onClick={() => scrollTo(first + 1)}>
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}
          </span>
        </figcaption>
      </figure>

      {images.length > 1 && (
        <div className="thumbs" ref={thumbsRef}>
          <div className="thumbs-grid">
            {visibleThumbs.map((img, i) => {
              const index = start + i
              return (
                <button
                  key={img.file}
                  type="button"
                  className="thumb"
                  aria-label={`Go to image ${index + 1} of ${images.length}`}
                  aria-current={inView.has(index) ? 'true' : undefined}
                  onClick={() => scrollTo(index)}
                >
                  <img src={img.src} alt="" loading="lazy" decoding="async" />
                  <span className="mono thumb-label">
                    {fig}.{index + 1}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

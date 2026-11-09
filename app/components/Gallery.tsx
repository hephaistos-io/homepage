import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectImage } from '../projects/types'

/**
 * One stage image (16:9 frame, image fitted inside, never cropped) and a
 * thumbnail grid below it. Clicking a thumbnail puts it on the stage.
 *
 * The grid fills the remaining height of the column: it shows as many full
 * rows as fit and the arrows page by that many. Rows are measured after
 * hydration; the prerendered HTML shows one row, and extra rows only grow
 * into empty space. Column count comes from CSS (`--cols` on .thumbs).
 */
export default function Gallery({ images, fig }: { images: ProjectImage[]; fig: number }) {
  const [selected, setSelected] = useState(0)
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = thumbsRef.current
    const grid = box?.firstElementChild as HTMLElement | null
    if (!box || !grid) return
    const measure = () => {
      const style = getComputedStyle(grid)
      const cols = style.gridTemplateColumns.split(' ').length
      const gap = parseFloat(style.columnGap) || 0
      const cell = (box.clientWidth - gap * (cols - 1)) / cols
      const rows = Math.max(1, Math.floor((box.clientHeight + gap) / (cell + gap)))
      setPerPage(cols * rows)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  if (images.length === 0) return null

  const pages = Math.max(1, Math.ceil(images.length / perPage))
  const current = Math.min(page, pages - 1)
  const start = current * perPage
  const visible = images.slice(start, start + perPage)
  const shown = images[selected]

  return (
    <div className="gallery">
      <figure className="stage">
        <div className="stage-frame">
          <img src={shown.src} alt={`fig. ${fig}.${selected + 1}`} />
        </div>
        <figcaption className="mono stage-caption">
          <span>
            fig. {fig}.{selected + 1}
          </span>
          <span className="stage-nav">
            <span className="muted">
              {selected + 1} / {images.length}
            </span>
            {pages > 1 && (
              <>
                <button type="button" className="strip-btn" aria-label="Previous thumbnails" disabled={current === 0} onClick={() => setPage(current - 1)}>
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button type="button" className="strip-btn" aria-label="Next thumbnails" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}>
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
            {visible.map((img, i) => {
              const index = start + i
              return (
                <button
                  key={img.file}
                  type="button"
                  className="thumb"
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={index === selected}
                  onClick={() => setSelected(index)}
                >
                  <img src={img.src} alt="" loading="lazy" />
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

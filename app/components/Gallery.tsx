import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectImage } from '../projects/types'

/**
 * One large image at a time, plus a single scrollable row of thumbnails.
 *
 * The stage is as tall as the project's tallest image needs (its shape comes
 * from the build via `?dims`), capped to what fits on screen next to the
 * thumbnails. So phone screenshots get the full available height, and a
 * landscape-only project gets a landscape stage. Images are never cropped.
 */
export default function Gallery({ images, fig }: { images: ProjectImage[]; fig: number }) {
  const [selected, setSelected] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  // Keep the selected thumbnail in view (scrolls the row only, not the page).
  useEffect(() => {
    const row = rowRef.current
    const thumb = row?.children[selected] as HTMLElement | undefined
    if (!row || !thumb) return
    const left = thumb.offsetLeft - row.clientWidth / 2 + thumb.clientWidth / 2
    row.scrollTo({ left, behavior: 'smooth' })
  }, [selected])

  if (images.length === 0) return null

  const shown = images[selected]
  // Width/height of the tallest image sets the stage shape (never taller than 1:2.5).
  const ratio = Math.max(0.4, Math.min(...images.map((i) => i.width / i.height)))
  const go = (i: number) => setSelected((i + images.length) % images.length)

  return (
    <div className="gallery">
      <figure className="stage">
        <div className="stage-frame" style={{ aspectRatio: String(ratio) }}>
          <img key={shown.file} src={shown.src} width={shown.width} height={shown.height} alt={`fig. ${fig}.${selected + 1}`} />
        </div>
        <figcaption className="mono stage-caption">
          <span>
            fig. {fig}.{selected + 1}
          </span>
          <span className="stage-nav">
            <span className="muted">
              {selected + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <>
                <button type="button" className="strip-btn" aria-label="Previous image" onClick={() => go(selected - 1)}>
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button type="button" className="strip-btn" aria-label="Next image" onClick={() => go(selected + 1)}>
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}
          </span>
        </figcaption>
      </figure>

      {images.length > 1 && (
        <div className="thumb-row" ref={rowRef}>
          {images.map((img, i) => (
            <button
              key={img.file}
              type="button"
              className="thumb"
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <img src={img.src} alt="" loading="lazy" decoding="async" />
              <span className="mono thumb-label">
                {fig}.{i + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

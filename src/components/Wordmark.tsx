/**
 * "hephaistos" with the dot of the i rendered as a separate, coloured element.
 * Uses the dotless ı (U+0131) so the dot can be styled independently.
 */
export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} aria-label="hephaistos">
      <span aria-hidden="true">
        hepha
        <span className="wordmark-i">
          ı<span className="wordmark-dot" />
        </span>
        stos
      </span>
    </span>
  )
}

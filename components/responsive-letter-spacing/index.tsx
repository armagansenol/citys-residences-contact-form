import { useCallback, useLayoutEffect, useRef, useState } from "react"

interface ResponsiveLetterSpacingProps {
  text: string
}

export function ResponsiveLetterSpacing({ text }: ResponsiveLetterSpacingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [letterSpacing, setLetterSpacing] = useState(0)

  const stretch = useCallback(
    (item: HTMLSpanElement, container: HTMLDivElement) => {
      const currentLength = text.length
      if (currentLength === 0) return // Avoid division by zero

      const currentCharWidth = item.offsetWidth / currentLength
      const spaceForChar = container.offsetWidth / currentLength
      const charWidth = spaceForChar - currentCharWidth + (spaceForChar - currentCharWidth) / currentLength
      setLetterSpacing(charWidth)
    },
    [text.length]
  )

  useLayoutEffect(() => {
    if (!textRef.current || !containerRef.current) return
    stretch(textRef.current, containerRef.current)
  }, [text.length, stretch])

  return (
    <p className="text-justify" ref={containerRef}>
      <span
        className="whitespace-nowrap flex-grow-0 flex-shrink-1 flex-basis-[0%]"
        ref={textRef}
        style={{ letterSpacing: `${letterSpacing}px` }}
      >
        {text}
      </span>
    </p>
  )
}

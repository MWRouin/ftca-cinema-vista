/* import React from "react"

interface hoverImageProps {
    src: string
    size?: number;
    alt?: string;
}

export default function HoverPlayImage({ src, size = 40, alt = "photo" }: hoverImageProps) {
    const ref = React.useRef<HTMLImageElement>(null)

    function handleMouseMove(e: React.MouseEvent) {
        const el = ref.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        el.style.transform = `
      scale(1.1)
      translate(${-x * 0.05}px, ${-y * 0.05}px)
    `
    }

    function reset() {
        if (ref.current) {
            ref.current.style.transform = ""
        }
    }

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            width={size}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="transition-transform duration-200 ease-out"
        />
    )
} */
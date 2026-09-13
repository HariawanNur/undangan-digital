import { useReveal } from "../hooks/useReveal";

/**
 * Bungkus elemen apapun supaya muncul dengan animasi saat discroll.
 * variant: "up" (default) | "left" | "right" | "pop"
 * delay: 1-6, opsional, untuk efek berurutan (mis. grid galeri)
 */
export default function Reveal({ as: Tag = "div", variant = "up", delay, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();

  const variantClass =
    variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : variant === "pop" ? "reveal-pop" : "reveal";

  const delayClass = delay ? `reveal-d${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${delayClass} ${visible ? "in" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

import type { CardProps } from "../../models/components/card/card.model";
import type { MouseEvent as ReactMouseEvent } from "react";

// Header de la Card
function Header({
  title,
  subtitle,
  icon,
}: Pick<CardProps, "title" | "subtitle" | "icon">) {
  if (!title && !subtitle && !icon) return null;
  return (
    <div className="card-header bg-transparent">
      <div className="d-flex align-items-center gap-2">
        {icon && <span className="fs-5 d-inline-flex">{icon}</span>}
        <div>
          {title && <h5 className="card-title mb-0">{title}</h5>}
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </div>
    </div>
  );
}

function BodySkeleton() {
  return (
    <div className="placeholder-glow">
      <span className="placeholder col-7"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-6"></span>
      <span className="placeholder col-8"></span>
    </div>
  );
}

export default function Card({
  title,
  subtitle,
  icon,
  children,
  footer,
  loading = false,
  error = null,
  variant = "default",
  clickable = false,
  onClick,
  className = "",
}: CardProps) {
  const borderClass =
    variant === "default" ? "border-0" : `border-${variant} border-2`;

    const classes =
    "card shadow-sm h-100 " +
    borderClass +
    (clickable ? " card-hover" : "") +
    (className ? " " + className : "");

  return (
    <div
      className={classes}
      role={clickable ? "button" : undefined}
      onClick={clickable ? (onClick as (e: ReactMouseEvent<HTMLDivElement>) => void) : undefined}
    >
      <Header title={title} subtitle={subtitle} icon={icon} />

      <div className="card-body">
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        {loading ? <BodySkeleton /> : children}
      </div>

      {footer && <div className="card-footer bg-transparent">{footer}</div>}
    </div>
  );
}

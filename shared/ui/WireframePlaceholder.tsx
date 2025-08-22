interface WireframePlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  aspectRatio?: string;
  variant?: "default" | "book" | "cert" | "image";
}

export default function WireframePlaceholder({ 
  width = "100%", 
  height = "100%", 
  label = "Image", 
  className = "",
  aspectRatio,
  variant = "default"
}: WireframePlaceholderProps) {
  const style = aspectRatio ? { aspectRatio } : { width, height };
  
  const getIcon = () => {
    switch (variant) {
      case "book":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
        );
      case "cert":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        );
    }
  };
  
  return (
    <div 
      className={`bg-muted/10 border border-dashed border-muted/30 rounded-lg flex items-center justify-center text-muted-foreground/70 ${className}`}
      style={style}
    >
      <div className="text-center p-3">
        <div className="mx-auto mb-2 opacity-50">
          {getIcon()}
        </div>
        <div className="text-xs opacity-60 font-medium max-w-20 leading-tight">
          {label}
        </div>
      </div>
    </div>
  );
}

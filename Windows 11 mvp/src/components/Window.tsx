import { useState, useRef, useEffect } from "react";
import { X, Minimize, Maximize2, Square } from "lucide-react";
import { AppWindow } from "./Desktop";

interface WindowProps extends AppWindow {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

const Window = ({
  id,
  title,
  content,
  isMinimized,
  isMaximized,
  position,
  size,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        onPositionChange({
          x: e.clientX - dragStart.x,
          y: Math.max(0, e.clientY - dragStart.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, onPositionChange, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    
    onFocus();
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 48px)",
        transform: "none",
      }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute win-glass win-shadow-lg rounded-lg overflow-hidden flex flex-col border border-border/30 ${
        isMaximized ? "" : "animate-in zoom-in-95 duration-200"
      }`}
      style={{
        ...windowStyle,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-background/30 border-b border-border/30 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary/20 rounded-sm"></div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        
        <div className="window-controls flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-11 h-8 hover:bg-foreground/10 transition-smooth flex items-center justify-center rounded"
          >
            <Minimize className="w-3 h-3 text-foreground/70" />
          </button>
          <button
            onClick={onMaximize}
            className="w-11 h-8 hover:bg-foreground/10 transition-smooth flex items-center justify-center rounded"
          >
            {isMaximized ? (
              <Square className="w-3 h-3 text-foreground/70" />
            ) : (
              <Maximize2 className="w-3 h-3 text-foreground/70" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-11 h-8 hover:bg-destructive hover:text-destructive-foreground transition-smooth flex items-center justify-center rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-card overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default Window;

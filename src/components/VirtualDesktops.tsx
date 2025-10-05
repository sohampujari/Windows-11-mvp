import { Plus, X } from "lucide-react";

interface VirtualDesktop {
  id: string;
  name: string;
  windows: string[];
}

interface VirtualDesktopsProps {
  desktops: VirtualDesktop[];
  activeDesktop: string;
  onDesktopChange: (id: string) => void;
  onAddDesktop: () => void;
  onRemoveDesktop: (id: string) => void;
}

const VirtualDesktops = ({
  desktops,
  activeDesktop,
  onDesktopChange,
  onAddDesktop,
  onRemoveDesktop,
}: VirtualDesktopsProps) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
      <div className="win-glass win-shadow rounded-lg px-3 py-2 flex items-center gap-2 border border-border/30">
        {desktops.map((desktop) => (
          <div key={desktop.id} className="relative group">
            <button
              onClick={() => onDesktopChange(desktop.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                activeDesktop === desktop.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              {desktop.name}
            </button>
            {desktops.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDesktop(desktop.id);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        ))}
        
        {desktops.length < 4 && (
          <button
            onClick={onAddDesktop}
            className="w-8 h-8 rounded-md bg-secondary hover:bg-secondary/80 transition-smooth flex items-center justify-center"
            title="Add Virtual Desktop"
          >
            <Plus className="w-4 h-4 text-secondary-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VirtualDesktops;

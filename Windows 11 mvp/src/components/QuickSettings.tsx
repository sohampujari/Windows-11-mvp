import { Wifi, Bluetooth, Plane, Volume2, Sun, Battery, Settings } from "lucide-react";
import { Slider } from "./ui/slider";

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSettings = ({ isOpen, onClose }: QuickSettingsProps) => {
  if (!isOpen) return null;

  const quickActions = [
    { name: "Wi-Fi", icon: <Wifi className="w-5 h-5" />, active: true },
    { name: "Bluetooth", icon: <Bluetooth className="w-5 h-5" />, active: false },
    { name: "Airplane mode", icon: <Plane className="w-5 h-5" />, active: false },
  ];

  return (
    <div
      className="absolute bottom-16 right-4 w-96 win-glass win-shadow-lg rounded-xl border border-border/30 overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-2 transition-smooth ${
                action.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {action.icon}
              <span className="text-xs font-medium">{action.name}</span>
            </button>
          ))}
        </div>

        {/* Volume Slider */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Volume2 className="w-5 h-5 text-foreground/70" />
            <div className="flex-1">
              <div className="text-xs text-foreground/60 mb-1">Volume</div>
              <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
            <Sun className="w-5 h-5 text-foreground/70" />
            <div className="flex-1">
              <div className="text-xs text-foreground/60 mb-1">Brightness</div>
              <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Battery Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <Battery className="w-5 h-5 text-foreground/70" />
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Battery</div>
            <div className="text-xs text-foreground/60">85% - 4 hours remaining</div>
          </div>
        </div>
      </div>

      {/* Settings Footer */}
      <div className="border-t border-border/30 p-3">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 transition-smooth">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-foreground/70" />
            <span className="text-sm text-foreground">Settings</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickSettings;

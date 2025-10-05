import { 
  Search, 
  Folder, 
  Chrome, 
  MessageSquare, 
  Mail, 
  ShoppingBag,
  Settings,
  Wifi,
  Volume2,
  Battery
} from "lucide-react";
import { AppWindow } from "./Desktop";

interface TaskbarProps {
  onStartClick: (e: React.MouseEvent) => void;
  onQuickSettingsClick: (e: React.MouseEvent) => void;
  windows: AppWindow[];
  onWindowClick: (id: string) => void;
  onOpenApp: (name: string, icon: string, content: React.ReactNode) => void;
}

const Taskbar = ({ 
  onStartClick, 
  onQuickSettingsClick, 
  windows, 
  onWindowClick,
  onOpenApp 
}: TaskbarProps) => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  const pinnedApps = [
    { name: "Search", icon: <Search className="w-5 h-5" />, content: <div className="p-6">Search Windows</div> },
    { name: "File Explorer", icon: <Folder className="w-5 h-5" />, content: <div className="p-6">File Explorer Content</div> },
    { name: "Microsoft Edge", icon: <Chrome className="w-5 h-5" />, content: <div className="p-6">Microsoft Edge Browser</div> },
    { name: "Microsoft Teams", icon: <MessageSquare className="w-5 h-5" />, content: <div className="p-6">Microsoft Teams</div> },
    { name: "Mail", icon: <Mail className="w-5 h-5" />, content: <div className="p-6">Mail Application</div> },
    { name: "Microsoft Store", icon: <ShoppingBag className="w-5 h-5" />, content: <div className="p-6">Microsoft Store</div> },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 win-glass border-t border-border/30 flex items-center justify-between px-2 z-50">
      {/* Start Button */}
      <div className="flex items-center gap-1">
        <button
          onClick={onStartClick}
          className="h-10 px-3 rounded-md hover:bg-foreground/5 transition-smooth flex items-center justify-center"
        >
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-[1px]"></div>
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-[1px]"></div>
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-[1px]"></div>
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-[1px]"></div>
            </div>
          </div>
        </button>

        {/* Pinned Apps */}
        <div className="flex items-center gap-1">
          {pinnedApps.map((app) => (
            <button
              key={app.name}
              onClick={() => onOpenApp(app.name, app.name, app.content)}
              className="h-10 w-10 rounded-md hover:bg-foreground/5 transition-smooth flex items-center justify-center text-foreground/70 hover:text-foreground"
              title={app.name}
            >
              {app.icon}
            </button>
          ))}
        </div>

        {/* Running Windows */}
        <div className="flex items-center gap-1 ml-2">
          {windows.filter(w => !w.isMinimized).map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className="h-10 px-3 rounded-md bg-foreground/10 hover:bg-foreground/15 transition-smooth flex items-center gap-2 text-sm"
            >
              <div className="w-4 h-0.5 bg-primary rounded-full"></div>
              <span className="max-w-32 truncate text-foreground/90">{window.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onQuickSettingsClick}
          className="h-10 px-3 rounded-md hover:bg-foreground/5 transition-smooth flex items-center gap-3 text-foreground/70"
        >
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </button>
        
        <button 
          onClick={onQuickSettingsClick}
          className="h-10 px-3 rounded-md hover:bg-foreground/5 transition-smooth text-right"
        >
          <div className="text-xs font-medium text-foreground/90">{currentTime}</div>
          <div className="text-[10px] text-foreground/60">{currentDate}</div>
        </button>
      </div>
    </div>
  );
};

export default Taskbar;

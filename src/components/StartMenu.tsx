import { Search, Folder, Chrome, MessageSquare, Mail, ShoppingBag, Settings, Image, Music, Film, FileText, Power } from "lucide-react";
import { Input } from "./ui/input";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (name: string, icon: string, content: React.ReactNode) => void;
}

const StartMenu = ({ isOpen, onClose, onOpenApp }: StartMenuProps) => {
  if (!isOpen) return null;

  const pinnedApps = [
    { name: "File Explorer", icon: <Folder className="w-6 h-6" />, color: "text-yellow-500" },
    { name: "Microsoft Edge", icon: <Chrome className="w-6 h-6" />, color: "text-blue-500" },
    { name: "Settings", icon: <Settings className="w-6 h-6" />, color: "text-gray-500" },
    { name: "Microsoft Store", icon: <ShoppingBag className="w-6 h-6" />, color: "text-blue-600" },
    { name: "Photos", icon: <Image className="w-6 h-6" />, color: "text-purple-500" },
    { name: "Music", icon: <Music className="w-6 h-6" />, color: "text-orange-500" },
    { name: "Movies", icon: <Film className="w-6 h-6" />, color: "text-red-500" },
    { name: "Mail", icon: <Mail className="w-6 h-6" />, color: "text-blue-400" },
    { name: "Teams", icon: <MessageSquare className="w-6 h-6" />, color: "text-purple-600" },
    { name: "Word", icon: <FileText className="w-6 h-6" />, color: "text-blue-700" },
  ];

  const recentFiles = [
    { name: "Document.docx", app: "Word", time: "2 hours ago" },
    { name: "Presentation.pptx", app: "PowerPoint", time: "Yesterday" },
    { name: "Budget.xlsx", app: "Excel", time: "2 days ago" },
  ];

  return (
    <div
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[640px] win-glass win-shadow-lg rounded-xl border border-border/30 overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Box */}
      <div className="p-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for apps, settings, and documents"
            className="pl-10 h-10 bg-background/80 border-border/50 rounded-lg"
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Pinned</h3>
          <button className="text-xs text-primary hover:underline">All apps &gt;</button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {pinnedApps.map((app) => (
            <button
              key={app.name}
              onClick={() => {
                onOpenApp(app.name, app.name, <div className="p-6">{app.name} Content</div>);
                onClose();
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-foreground/5 transition-smooth group"
            >
              <div className={`${app.color} group-hover:scale-110 transition-transform`}>
                {app.icon}
              </div>
              <span className="text-[10px] text-foreground/80 text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Recommended</h3>
          <button className="text-xs text-primary hover:underline">More &gt;</button>
        </div>
        <div className="space-y-2">
          {recentFiles.map((file) => (
            <button
              key={file.name}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm text-foreground">{file.name}</div>
                <div className="text-xs text-muted-foreground">{file.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User Profile and Power */}
      <div className="border-t border-border/30 p-4 flex items-center justify-between bg-background/30">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-foreground/5 transition-smooth">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            U
          </div>
          <span className="text-sm text-foreground">User</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-foreground/5 transition-smooth">
          <Power className="w-5 h-5 text-foreground/70" />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;

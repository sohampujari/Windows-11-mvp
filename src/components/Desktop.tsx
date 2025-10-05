import { useState } from "react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Window from "./Window";
import QuickSettings from "./QuickSettings";
import VirtualDesktops from "./VirtualDesktops";
import wallpaper from "@/assets/windows-wallpaper.jpg";

export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const Desktop = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [virtualDesktops, setVirtualDesktops] = useState([
    { id: "desktop-1", name: "Desktop 1", windows: [] as string[] }
  ]);
  const [activeDesktop, setActiveDesktop] = useState("desktop-1");

  const openApp = (appName: string, icon: string, content: React.ReactNode) => {
    const newWindow: AppWindow = {
      id: `${appName}-${Date.now()}`,
      title: appName,
      icon,
      content,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
      size: { width: 800, height: 600 },
      zIndex: maxZIndex + 1,
    };
    
    setWindows([...windows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
    setShowStartMenu(false);

    // Add window to current desktop
    setVirtualDesktops(desktops => 
      desktops.map(d => 
        d.id === activeDesktop 
          ? { ...d, windows: [...d.windows, newWindow.id] }
          : d
      )
    );
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    setVirtualDesktops(desktops =>
      desktops.map(d => ({
        ...d,
        windows: d.windows.filter(wId => wId !== id)
      }))
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const restoreWindow = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const visibleWindows = windows.filter(w => 
    virtualDesktops.find(d => d.id === activeDesktop)?.windows.includes(w.id)
  );

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        setShowStartMenu(false);
        setShowQuickSettings(false);
      }}
    >
      {/* Virtual Desktops Indicator */}
      <VirtualDesktops
        desktops={virtualDesktops}
        activeDesktop={activeDesktop}
        onDesktopChange={setActiveDesktop}
        onAddDesktop={() => {
          const newDesktop = {
            id: `desktop-${virtualDesktops.length + 1}`,
            name: `Desktop ${virtualDesktops.length + 1}`,
            windows: []
          };
          setVirtualDesktops([...virtualDesktops, newDesktop]);
        }}
        onRemoveDesktop={(id) => {
          if (virtualDesktops.length > 1) {
            setVirtualDesktops(virtualDesktops.filter(d => d.id !== id));
            if (activeDesktop === id) {
              setActiveDesktop(virtualDesktops[0].id);
            }
          }
        }}
      />

      {/* Windows */}
      {visibleWindows.map((window) => (
        <Window
          key={window.id}
          {...window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
          onSizeChange={(size) => updateWindowSize(window.id, size)}
        />
      ))}

      {/* Start Menu */}
      <StartMenu 
        isOpen={showStartMenu} 
        onClose={() => setShowStartMenu(false)}
        onOpenApp={openApp}
      />

      {/* Quick Settings */}
      <QuickSettings
        isOpen={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />

      {/* Taskbar */}
      <Taskbar
        onStartClick={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
          setShowQuickSettings(false);
        }}
        onQuickSettingsClick={(e) => {
          e.stopPropagation();
          setShowQuickSettings(!showQuickSettings);
          setShowStartMenu(false);
        }}
        windows={visibleWindows}
        onWindowClick={restoreWindow}
        onOpenApp={openApp}
      />
    </div>
  );
};

export default Desktop;

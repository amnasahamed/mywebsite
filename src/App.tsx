import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Terminal,
  Folder,
  FileText,
  Mail,
  Code,
  Briefcase,
  Trash2,
  Image as ImageIcon,
  History,
  Gamepad2,
  Music,
  BookOpen,
  Settings,
  Zap,
  Laptop,
  Monitor,
  Globe,
  FileDown,
  Usb,
  Camera,
  Lock,
  Unlock,
} from 'lucide-react';

import {
  RetroWindow,
  DesktopIcon,
  SoundToggle,
  MacosDock,
  MacosMenuBar,
  AppIcon,
  BootSequence,
  AIAssistant,
  DesktopWidgets,
} from './components';
import {
  AboutContent,
  ProjectsContent,
  VenturesContent,
  CaseStudiesContent,
  RecycleBinContent,
  MediaContent,
  TimelineContent,
  TerminalContent,
  ContactContent,
  MinesweeperContent,
  WinampContent,
  GuestbookContent,
  SheetsChatContent,
  SecretZipContent,
  ScreenshotToolContent,
} from './windows';
import { useClock } from './hooks/useClock';
import { useWindowManager } from './hooks/useWindowManager';
import { useSounds } from './hooks/useSounds';
import { useContextMenu, WALLPAPERS, type WallpaperId } from './hooks/useContextMenu';
import type { WindowData, Theme } from './types';
import { analytics } from './analytics';

const initialWindows: WindowData[] = [
  {
    id: 'photo',
    title: 'Amnas.jpg',
    icon: <ImageIcon size={14} className="text-teal-600" />,
    content: (props: { theme?: Theme }) => {
      const isMacos = props.theme === 'macos';
      return (
        <div className={`p-2 h-full flex items-center justify-center ${isMacos ? 'bg-transparent' : 'bg-black'}`}>
          <img
            src="/media/amnas_me.png"
            alt="Amnas"
            className={`max-w-full max-h-full object-contain ${isMacos ? 'rounded-2xl shadow-2xl' : 'retro-border'}`}
          />
        </div>
      );
    },
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 200, y: 100 },
    defaultSize: { w: 400, h: 500 },
  },
  {
    id: 'about',
    title: 'About_Me.txt',
    icon: <FileText size={14} className="text-blue-600" />,
    content: <AboutContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 2,
    defaultPos: { x: 120, y: 50 },
    defaultSize: { w: 500, h: 600 },
  },
  {
    id: 'projects',
    title: 'Projects.exe',
    icon: <Code size={14} className="text-purple-600" />,
    content: <ProjectsContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 160, y: 80 },
    defaultSize: { w: 550, h: 500 },
  },
  {
    id: 'ventures',
    title: 'Ventures.folder',
    icon: <Folder size={14} className="text-yellow-500 fill-yellow-500" />,
    content: <VenturesContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 200, y: 110 },
    defaultSize: { w: 500, h: 550 },
  },
  {
    id: 'casestudies',
    title: 'Case_Studies.folder',
    icon: <Briefcase size={14} className="text-amber-700 fill-amber-700" />,
    content: <CaseStudiesContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 240, y: 130 },
    defaultSize: { w: 600, h: 550 },
  },
  {
    id: 'terminal',
    title: 'Vibe_Coding.exe',
    icon: <Terminal size={14} className="text-black" />,
    content: <TerminalContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 3,
    defaultPos: { x: 550, y: 150 },
    defaultSize: { w: 500, h: 400 },
  },
  {
    id: 'contact',
    title: 'Contact.exe',
    icon: <Mail size={14} className="text-blue-500" />,
    content: <ContactContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 240, y: 140 },
    defaultSize: { w: 400, h: 500 },
  },
  {
    id: 'recyclebin',
    title: 'Recycle_Bin',
    icon: <Trash2 size={14} className="text-gray-600" />,
    content: <RecycleBinContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 280, y: 160 },
    defaultSize: { w: 450, h: 500 },
  },
  {
    id: 'media',
    title: 'Media.folder',
    icon: <ImageIcon size={14} className="text-teal-600" />,
    content: <MediaContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 320, y: 100 },
    defaultSize: { w: 550, h: 500 },
  },
  {
    id: 'timeline',
    title: 'Timeline.exe',
    icon: <History size={14} className="text-blue-800" />,
    content: <TimelineContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 360, y: 80 },
    defaultSize: { w: 500, h: 600 },
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper.exe',
    icon: <Gamepad2 size={14} className="text-gray-700" />,
    content: <MinesweeperContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 100, y: 60 },
    defaultSize: { w: 380, h: 480 },
  },
  {
    id: 'winamp',
    title: 'Winamp.exe',
    icon: <Music size={14} className="text-green-600" />,
    content: <WinampContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 450, y: 120 },
    defaultSize: { w: 320, h: 500 },
  },
  {
    id: 'guestbook',
    title: 'Guestbook.exe',
    icon: <BookOpen size={14} className="text-amber-600" />,
    content: <GuestbookContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 180, y: 90 },
    defaultSize: { w: 420, h: 550 },
  },
  {
    id: 'sheetschat',
    title: 'SheetsChat.exe',
    icon: <img src="/media/sheetschat.png" alt="" className="w-3.5 h-3.5" />,
    content: <SheetsChatContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 300, y: 150 },
    defaultSize: { w: 450, h: 550 },
  },
  {
    id: 'secret',
    title: 'Secret.zip',
    icon: <Lock size={14} className="text-amber-600" />,
    content: <SecretZipContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 400, y: 200 },
    defaultSize: { w: 350, h: 450 },
  },
  {
    id: 'screenshot',
    title: 'Screen_Capture.exe',
    icon: <Camera size={14} className="text-blue-500" />,
    content: <ScreenshotToolContent />,
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPos: { x: 450, y: 100 },
    defaultSize: { w: 320, h: 480 },
  },
];

export default function App() {
  const time = useClock();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wallpaperId, setWallpaperId] = useState<WallpaperId>('teal');
  const [theme, setTheme] = useState<Theme>('retro');
  const [isBooting, setIsBooting] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const { play } = useSounds(soundEnabled);
  const { windows, openWindow, closeWindow, minimizeWindow, focusWindow, activeWindowId } =
    useWindowManager(initialWindows);

  const handleOpenWindow = useCallback(
    (id: string) => {
      openWindow(id);
      play('open');
      setStartMenuOpen(false);
      analytics.windowOpen(id);
    },
    [openWindow, play]
  );

  const handleCloseWindow = useCallback(
    (id: string) => {
      closeWindow(id);
      play('close');
    },
    [closeWindow, play]
  );

  const handleMinimizeWindow = useCallback(
    (id: string) => {
      minimizeWindow(id);
      play('minimize');
    },
    [minimizeWindow, play]
  );

  const handleWallpaperChange = useCallback((id: WallpaperId) => {
    setWallpaperId(id);
    localStorage.setItem('amnasos-wallpaper', id);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsBooting(true);
    play('click');
  }, [play]);

  const handleBootComplete = useCallback(() => {
    const newTheme = theme === 'retro' ? 'macos' : 'retro';
    setTheme(newTheme);
    localStorage.setItem('amnasos-theme', newTheme);
    setIsBooting(false);
  }, [theme]);

  const toggleNightMode = useCallback(() => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    localStorage.setItem('amnasos-nightmode', String(newMode));
    play('click');
  }, [isNightMode, play]);

  const { ContextMenu, handleContextMenu } = useContextMenu(handleWallpaperChange, toggleNightMode);

  // Load saved theme and wallpaper
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('amnasos-wallpaper') as WallpaperId | null;
    if (savedWallpaper && WALLPAPERS.some((w) => w.id === savedWallpaper)) {
      setWallpaperId(savedWallpaper);
    }

    const savedTheme = localStorage.getItem('amnasos-theme') as Theme | null;
    if (savedTheme === 'retro' || savedTheme === 'macos') {
      setTheme(savedTheme);
    }

    const savedNightMode = localStorage.getItem('amnasos-nightmode') === 'true';
    setIsNightMode(savedNightMode);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Analytics
  useEffect(() => {
    analytics.pageView();
  }, []);

  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];
  const isMacos = theme === 'macos';

  return (
    <div
      className={`h-[100dvh] w-screen overflow-hidden flex flex-col select-none transition-all duration-700 ease-in-out ${isMacos ? 'font-sans' : 'font-retro'}`}
      style={{
        backgroundImage: isMacos ? 'url("/wallpaper.avif")' : 'url("/retro-wallpaper.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: wallpaper.color,
        filter: isNightMode ? 'brightness(0.6) contrast(1.1) saturate(1.2)' : 'none'
      }}
    >
      {/* Scanline / CRT Effect for Retro */}
      {!isMacos && !isBooting && (
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] overflow-hidden bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      )}

      {isBooting && <BootSequence theme={theme === 'retro' ? 'macos' : 'retro'} onComplete={handleBootComplete} />}
      
      {/* Top Menu Bar for macOS */}
      {isMacos && (
        <MacosMenuBar time={time} activeWindowId={activeWindowId} windows={windows} />
      )}

      {/* Desktop */}
      <div
        className={`flex-1 min-h-0 relative p-4 md:p-6 mt-0 overflow-y-auto md:overflow-hidden`}
        onClick={() => setStartMenuOpen(false)}
        onContextMenu={handleContextMenu}
        ref={desktopRef}
      >
        {/* Desktop Widgets */}
        {!isMobile && <DesktopWidgets theme={theme} />}

        {/* Desktop Icons */}
        <div className={`grid grid-cols-4 sm:grid-cols-6 md:flex md:flex-col gap-x-2 gap-y-6 md:gap-y-4 md:flex-wrap h-auto md:h-full content-start transition-all duration-500 ${isMacos ? 'md:gap-y-4' : 'md:gap-x-12 md:gap-y-8'}`}>
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={
              <AppIcon 
                theme={theme} 
                type="white" 
                size={isMobile ? 28 : 36} 
                icon={
                  <div className={`w-full h-full overflow-hidden ${theme === 'retro' ? 'retro-border' : 'rounded-[10px]'}`}>
                    <img src="/media/amnas_me.png" alt="" className="w-full h-full object-cover" />
                  </div>
                } 
              />
            }
            label={isMacos ? 'amnas.jpg' : 'My Photo'}
            onClick={() => handleOpenWindow('photo')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="blue" size={isMobile ? 28 : 32} icon={<FileText />} />}
            label={isMacos ? 'About Me' : 'About_Me.txt'}
            onClick={() => handleOpenWindow('about')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={
              <AppIcon 
                theme={theme} 
                type="white" 
                size={isMobile ? 28 : 36} 
                icon={
                  <div className={`w-full h-full p-1 flex items-center justify-center ${theme === 'retro' ? 'retro-border' : ''}`}>
                    <img src="/media/sheetschat.png" alt="" className="w-full h-full object-contain" />
                  </div>
                } 
              />
            }
            label="SheetsChat"
            onClick={() => handleOpenWindow('sheetschat')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type={isMacos ? 'black' : 'white'} size={isMobile ? 28 : 32} icon={isMacos ? <Laptop /> : <Zap className="text-yellow-500 fill-yellow-500" />} />}
            label={isMacos ? 'Retro UI' : 'Modern UI'}
            onClick={toggleTheme}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="blue" size={isMobile ? 28 : 32} icon={<History />} />}
            label={isMacos ? 'Timeline' : 'Timeline.exe'}
            onClick={() => handleOpenWindow('timeline')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="purple" size={isMobile ? 28 : 32} icon={<Code />} />}
            label={isMacos ? 'Projects' : 'Projects.exe'}
            onClick={() => handleOpenWindow('projects')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="yellow" size={isMobile ? 28 : 32} icon={<Folder className="fill-white" />} />}
            label={isMacos ? 'Ventures' : 'Ventures'}
            onClick={() => handleOpenWindow('ventures')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="orange" size={isMobile ? 28 : 32} icon={<Briefcase className="fill-white" />} />}
            label={isMacos ? 'Case Studies' : 'Documents'}
            onClick={() => handleOpenWindow('casestudies')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="pink" size={isMobile ? 28 : 32} icon={<ImageIcon />} />}
            label={isMacos ? 'Media' : 'My Gallery'}
            onClick={() => handleOpenWindow('media')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="black" size={isMobile ? 28 : 32} icon={<Terminal />} />}
            label={isMacos ? 'Terminal' : 'MS-DOS Prompt'}
            onClick={() => handleOpenWindow('terminal')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="blue" size={isMobile ? 28 : 32} icon={<Mail />} />}
            label={isMacos ? 'Mail' : 'Outlook Express'}
            onClick={() => handleOpenWindow('contact')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="none" icon={<Trash2 size={isMobile ? 28 : 36} className="text-gray-300" />} />}
            label={isMacos ? 'Trash' : 'Recycle Bin'}
            onClick={() => handleOpenWindow('recyclebin')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="none" icon={<Gamepad2 size={isMobile ? 28 : 36} className="text-gray-400" />} />}
            label={isMacos ? 'Games' : 'Minesweeper'}
            onClick={() => handleOpenWindow('minesweeper')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="green" size={isMobile ? 28 : 32} icon={<Music />} />}
            label={isMacos ? 'Music' : 'Winamp'}
            onClick={() => handleOpenWindow('winamp')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="yellow" size={isMobile ? 28 : 32} icon={<BookOpen />} />}
            label={isMacos ? 'Guestbook' : 'Guestbook.log'}
            onClick={() => handleOpenWindow('guestbook')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="blue" size={isMobile ? 28 : 32} icon={<FileDown />} />}
            label={isMacos ? 'Resume.pdf' : 'My Resume'}
            onClick={() => window.open('/images/Profile.pdf', '_blank')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="none" icon={<Usb size={isMobile ? 28 : 36} className={isMacos ? 'text-gray-400' : 'text-gray-600'} />} />}
            label={isMacos ? 'USB Drive' : '3.5 Floppy (A:)'}
            onClick={() => {}}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="yellow" size={isMobile ? 28 : 32} icon={<Lock className="fill-white" />} />}
            label={isMacos ? 'Secret.zip' : 'Hidden_File'}
            onClick={() => handleOpenWindow('secret')}
          />
          <DesktopIcon
            theme={theme}
            dragConstraints={desktopRef}
            icon={<AppIcon theme={theme} type="white" size={isMobile ? 28 : 32} icon={<Camera className="text-blue-500" />} />}
            label={isMacos ? 'Camera' : 'Screen Cap'}
            onClick={() => handleOpenWindow('screenshot')}
          />
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows
            .filter((w) => w.isOpen && !w.isMinimized)
            .map((w) => (
              <RetroWindow
                key={w.id}
                theme={theme}
                title={w.title}
                icon={w.icon}
                isActive={activeWindowId === w.id}
                zIndex={w.zIndex}
                onClose={() => handleCloseWindow(w.id)}
                onMinimize={() => handleMinimizeWindow(w.id)}
                onClick={() => focusWindow(w.id)}
                defaultPos={w.defaultPos}
                defaultSize={w.defaultSize}
                isMobile={isMobile}
              >
                <div className={`h-full pr-2 pb-4 ${!isMacos ? 'retro-scrollbar overflow-y-auto' : 'overflow-y-auto'}`}>
                  {typeof w.content === 'function' 
                    ? (w.content as any)({ theme })
                    : React.isValidElement(w.content)
                      ? React.cloneElement(w.content as React.ReactElement<any>, { theme })
                      : w.content}
                </div>
              </RetroWindow>
            ))}
        </AnimatePresence>

        {/* Context Menu */}
        {ContextMenu}

        {/* AI Assistant */}
        <AIAssistant theme={theme} isNightMode={isNightMode} />
      </div>

      {/* Taskbar or Dock */}
      {theme === 'retro' ? (
        <div className="bg-[#c0c0c0] border-t-2 border-white shadow-[0_-2px_0_0_#dfdfdf] h-10 md:h-11 flex items-center px-1 justify-between relative z-[100] font-retro">
          <div className="flex items-center gap-1 h-full py-1 overflow-hidden">
            <button
              className={`bg-[#c0c0c0] retro-border active:retro-border-inset active:bg-[#e0e0e0] font-bold h-full flex items-center gap-1.5 md:gap-2 px-2 md:px-3 text-xs md:text-sm focus:outline-none transition-all shrink-0 ${
                startMenuOpen ? 'retro-border-inset bg-[#e0e0e0]' : ''
              }`}
              onClick={() => {
                setStartMenuOpen(!startMenuOpen);
                play('menu');
              }}
            >
              <span className="text-base md:text-lg shrink-0">🖥️</span>
              <span className="leading-none pt-0.5" style={{ textShadow: '1px 1px 0 #fff' }}>Start</span>
            </button>

            <div className="w-[2px] h-full bg-gray-400 mx-1 border-l border-white border-r border-gray-600 shrink-0" />

            {/* Open Windows */}
            <div className="flex gap-1 overflow-x-auto h-full items-center no-scrollbar pr-2">
              {windows
                .filter((w) => w.isOpen)
                .map((w) => (
                  <button
                    key={w.id}
                    className={`bg-[#c0c0c0] retro-border active:retro-border-inset h-full min-w-[36px] md:min-w-[120px] max-w-[150px] truncate flex items-center gap-2 px-2 md:px-3 text-[11px] focus:outline-none transition-all ${
                      activeWindowId === w.id && !w.isMinimized
                        ? 'retro-border-inset bg-[#dfdfdf] font-bold shadow-inner'
                        : 'hover:bg-[#dfdfdf]'
                    }`}
                    onClick={() => {
                      focusWindow(w.id);
                      play('click');
                    }}
                  >
                    <div className="shrink-0 scale-90 md:scale-100">{w.icon}</div>
                    <span className="truncate hidden md:block">{w.title}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-1 h-full shrink-0">
            {/* Social Quick Links - Hide on extra small mobile */}
            {!isMobile && (
              <div className="flex items-center gap-0.5 h-full px-1">
                <a
                  href="https://www.linkedin.com/in/amnasahamed/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="h-6 w-6 flex items-center justify-center hover:bg-[#e0e0e0] retro-border-thin cursor-pointer"
                  onClick={() => play('click')}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0077B5" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            )}

            <div className="w-px h-4 bg-gray-400 mx-0.5 md:mx-1" />

            <SoundToggle
              soundEnabled={soundEnabled}
              onToggle={() => setSoundEnabled(!soundEnabled)}
            />
            <div className="retro-border-inset px-2 md:px-3 h-full flex items-center text-[10px] md:text-[11px] bg-[#c0c0c0] shrink-0 font-retro tracking-tighter tabular-nums">
              {time}
            </div>
          </div>

          {/* Start Menu */}
          {startMenuOpen && (
            <div className="absolute bottom-10 left-0 w-64 bg-[#c0c0c0] retro-border flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)] max-h-[70vh] md:max-h-[80vh]">
              <div className="flex h-full font-retro overflow-hidden">
                <div className="w-8 bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center py-4 shrink-0">
                  <span
                    className="text-white font-bold tracking-widest text-lg"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    AmnasOS 98
                  </span>
                </div>
                <div className="flex-1 p-1 flex flex-col overflow-y-auto bg-white/10 backdrop-blur-sm">
                  {[
                    { id: 'about', icon: <FileText size={18} className="text-blue-600" />, label: 'About Me' },
                    { id: 'timeline', icon: <History size={18} className="text-blue-800" />, label: 'Timeline' },
                    { id: 'projects', icon: <Code size={18} className="text-purple-600" />, label: 'Projects' },
                    { id: 'sheetschat', icon: <img src="/media/sheetschat.png" alt="" className="w-4.5 h-4.5" />, label: 'SheetsChat' },
                    { id: 'ventures', icon: <Folder size={18} className="text-yellow-500 fill-yellow-500" />, label: 'Ventures' },
                    { id: 'casestudies', icon: <Briefcase size={18} className="text-amber-700 fill-amber-700" />, label: 'Documents' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer transition-colors duration-75 active:bg-[#000080] active:text-white"
                      onClick={() => handleOpenWindow(item.id)}
                    >
                      <div className="shrink-0">{item.icon}</div>
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-400 my-1 retro-border-thin-inset" />
                  {[
                    { id: 'contact', icon: <Mail size={18} className="text-blue-500" />, label: 'Outlook' },
                    { id: 'guestbook', icon: <BookOpen size={18} className="text-amber-600" />, label: 'Guestbook' },
                    { id: 'winamp', icon: <Music size={18} className="text-green-600" />, label: 'Winamp' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer transition-colors duration-75 active:bg-[#000080] active:text-white"
                      onClick={() => handleOpenWindow(item.id)}
                    >
                      <div className="shrink-0">{item.icon}</div>
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <MacosDock
          windows={windows}
          activeWindowId={activeWindowId}
          focusWindow={focusWindow}
          openWindow={openWindow}
        />
      )}
    </div>
  );
}

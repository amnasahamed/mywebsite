import type { Theme } from '../types';

export const MediaContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  const media = [
    { src: '/media/workspace.jpg', webp: '/media/workspace.webp', label: 'Vibe Coding Setup' },
    { src: '/media/vibe_coding_me.jpg', webp: '/media/vibe_coding_me.webp', label: 'Pictured: Me, vibing' },
    { src: '/media/iit_madras.jpg', webp: '/media/iit_madras.webp', label: 'IIT Madras Session' },
    { src: '/media/huddle_global.jpg', webp: '/media/huddle_global.webp', label: 'Huddle Global Event' },
    { src: '/media/esp32_build.jpg', webp: '/media/esp32_build.webp', label: 'ESP32 Hardware Build' },
    { src: '/media/content_automation.jpg', webp: '/media/content_automation.webp', label: 'AI Content Workflow' }
  ];

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Gallery</h2>
        <p className="text-sm opacity-60 font-medium">Proof that I occasionally leave my desk</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {media.map((item, i) => (
          <div key={i} className={`p-1 transition-all group ${
            isMacos ? 'bg-white rounded-3xl shadow-sm border border-black/5 hover:shadow-lg overflow-hidden' : 'retro-border bg-[#c0c0c0]'
          }`}>
            <div className={`overflow-hidden ${isMacos ? 'rounded-2xl' : 'retro-border-inset'}`}>
              <picture>
                <source srcSet={item.webp} type="image/webp" />
                <img 
                  src={item.src} 
                  alt={item.label} 
                  loading="lazy" 
                  className="w-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105" 
                />
              </picture>
            </div>
            <div className={`p-2 text-center text-[10px] font-bold uppercase tracking-widest ${isMacos ? 'text-gray-500' : 'bg-white mt-1 retro-border-inset'}`}>
              {item.label}
            </div>
          </div>
        ))}
        
        {/* Video Special Case */}
        <div className={`p-1 transition-all group ${
          isMacos ? 'bg-white rounded-3xl shadow-sm border border-black/5 hover:shadow-lg overflow-hidden' : 'retro-border bg-[#c0c0c0]'
        }`}>
          <div className={`overflow-hidden ${isMacos ? 'rounded-2xl' : 'retro-border-inset'}`}>
            <video
              src="/media/esp32_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className={`p-2 text-center text-[10px] font-bold uppercase tracking-widest ${isMacos ? 'text-gray-500' : 'bg-white mt-1 retro-border-inset'}`}>
            AI Bot × ESP32 Demo
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Play, User, Building2, Quote, X, TrendingUp, Sparkles, Volume2, Maximize2 } from 'lucide-react';
import { TestimonialVideo } from '../types';
import { GOURMETIZE_LOGO } from './Navbar';
import { ScrollReveal } from './ScrollReveal';
import { LogoImg } from './LogoImg';

export const Testimonials: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [modalVideo, setModalVideo] = useState<TestimonialVideo | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const testimonials: TestimonialVideo[] = [
    {
      id: 'ads-74',
      title: 'ads 74',
      clientName: 'Marcos Oliveira',
      restaurantType: 'Pizzaria Bella Itália',
      location: 'São Paulo - SP',
      metric: '+R$ 180.000 / Mês',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pizzaiolo-putting-pizza-in-the-oven-43292-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      quote: 'Troquei de agência várias vezes. Quando a Gourmetize assumiu nosso tráfego, em menos de 45 dias o salão lotou e o faturamento do delivery dobrou!'
    },
    {
      id: 'ads-77',
      title: 'ads 77',
      clientName: 'Rodrigo & Ana',
      restaurantType: 'Smash Burger House',
      location: 'Curitiba - PR',
      metric: '3X Faturamento em 60 Dias',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-preparing-a-hamburger-with-french-fries-43301-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      quote: 'Achávamos que o delivery estava saturado, mas com a reestruturação de anúncios e WhatsApp da Gourmetize tivemos que contratar mais motoboys!'
    },
    {
      id: 'ads-78',
      title: 'ads 78',
      clientName: 'Fabiano Santos',
      restaurantType: 'Nossa Casa Sushi Bar',
      location: 'Belo Horizonte - MG',
      metric: 'ROI 18x em Tráfego Pago',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-a-delicious-meal-43285-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
      quote: 'A reativação de clientes inativos pelo WhatsApp trouxe centenas de pedidos parados de volta. O retorno é inacreditável.'
    }
  ];

  const handleCardClick = (item: TestimonialVideo) => {
    if (playingId === item.id) {
      // Pause if already playing
      const videoEl = videoRefs.current[item.id];
      if (videoEl) {
        if (videoEl.paused) {
          videoEl.play();
        } else {
          videoEl.pause();
        }
      }
    } else {
      // Start playing this video
      setPlayingId(item.id);
      setTimeout(() => {
        const videoEl = videoRefs.current[item.id];
        if (videoEl) {
          videoEl.play().catch(() => {});
        }
      }, 50);
    }
  };

  return (
    <section id="depoimentos" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFAA48]/10 border border-[#FFAA48]/30 text-[#FFAA48] text-xs font-black uppercase px-3.5 py-1.5 rounded-full mb-4">
            <User className="w-4 h-4 text-[#FFAA48]" />
            <span>DEPOIMENTOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
            MAIS DE <span className="text-[#FFAA48]">2.000 RESTAURANTES</span> COM RESULTADOS. ISSO É{' '}
            <span className="text-[#FFAA48]">GOURMETIZE</span>.
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Clique no vídeo para assistir aos depoimentos de donos de restaurantes reais.
          </p>
        </div>

        {/* Video Shorts Grid (Vertical 9:16 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => {
            const isPlaying = playingId === item.id;

            return (
              <ScrollReveal key={item.id} direction="up" delay={idx * 0.15} duration={0.6}>
                <div
                  onClick={() => handleCardClick(item)}
                  className="group relative bg-black rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-500/20 aspect-[9/16] flex flex-col justify-between border-2 border-zinc-900 hover:border-[#FFAA48]"
                >
                  {/* Video Element or Thumbnail Cover */}
                  {isPlaying ? (
                    <video
                      ref={(el) => (videoRefs.current[item.id] = el)}
                      src={item.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
                    </>
                  )}

                  {/* Top Video Overlay Header (Shorts UI Style) */}
                  <div className="relative z-20 p-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">
                      <LogoImg className="h-4 w-auto object-contain" />
                      <span>{item.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white/80">
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center Play Button (YouTube Shorts Red Badge Style) */}
                  {!isPlaying && (
                    <div className="relative z-20 my-auto mx-auto pointer-events-none">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-600 text-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                        {/* Shorts Play Icon */}
                        <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
                          <path d="M10 15l5.19-3L10 9v6z" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                      </div>
                      <span className="block text-center text-white text-xs font-black uppercase mt-3 tracking-widest bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        Clique para rodar
                      </span>
                    </div>
                  )}

                  {/* Bottom Video Overlay Subtitles / Info */}
                  {!isPlaying && (
                    <div className="relative z-20 p-4 space-y-2 pointer-events-none">
                      <div className="inline-block bg-[#FFAA48] text-black font-black text-[11px] uppercase px-2.5 py-1 rounded-md shadow-md">
                        {item.metric}
                      </div>
                      <div className="bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                        <p className="text-xs text-[#FFAA48] font-bold flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{item.restaurantType}</span>
                        </p>
                        <h3 className="text-sm font-extrabold text-white mt-0.5">{item.clientName}</h3>
                        <p className="text-[11px] text-zinc-200 line-clamp-2 mt-1 italic">
                          "{item.quote}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};


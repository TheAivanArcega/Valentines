import React, { useState, useEffect, useRef } from 'react';
import { Heart, Lock, Unlock, Music, Volume2, VolumeX } from 'lucide-react';

export default function ValentineInvitation() {
  const [stage, setStage] = useState('landing'); // landing, trivia, reveal, countdown, rsvp, celebration
  const [triviaAnswer, setTriviaAnswer] = useState('');
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [rsvpResponse, setRsvpResponse] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Countdown to Valentine's Day 2026
  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = valentinesDay - now;
      
      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play background music
  useEffect(() => {
    if (audioRef.current) {
      // Try to play - some browsers block autoplay
      audioRef.current.play().catch(err => {
        console.log('Autoplay blocked - user interaction needed');
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Rose petal confetti animation
  const createConfetti = () => {
    const petals = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360
    }));
    setConfetti(petals);
  };

  const handleTriviaSubmit = () => {
    // Simple check - customize this question and answer!
    const correctAnswer = "7/11 Doroteo Jose"; // Change this to your answer
    if (triviaAnswer.toLowerCase().trim() === correctAnswer) {
      setStage('reveal');
    } else {
      alert("Hmm, try again! 💕");
    }
  };

  const handleRSVP = (response) => {
    setRsvpResponse(response);
    if (response === 'yes') {
      createConfetti();
      setTimeout(() => setStage('celebration'), 100);
    } else {
      setStage('celebration');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Background Music */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/your-music-file.mp3" type="audio/mpeg" />
        {/* REPLACE "/your-music-file.mp3" with your actual music file path */}
      </audio>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-rose-200"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <VolumeX className="text-rose-500" size={24} />
        ) : (
          <Volume2 className="text-rose-500" size={24} />
        )}
      </button>

      {/* Stage Photo Display */}
      {photos[stage] && (
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-fade-in"
            style={{ 
              backgroundImage: `url(${photos[stage]})`,
              filter: 'brightness(0.3) blur(8px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-amber-900/40" />
        </div>
      )}

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.1
            }}
          >
            <Heart className="text-rose-400" size={20 + Math.random() * 30} fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Rose petal confetti */}
      {confetti.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {confetti.map((petal) => (
            <div
              key={petal.id}
              className="absolute animate-fall-petal"
              style={{
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                transform: `rotate(${petal.rotation}deg)`
              }}
            >
              <div className="w-3 h-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-80" 
                   style={{ clipPath: 'ellipse(50% 60% at 50% 50%)' }} />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          
          {/* Landing Stage */}
          {stage === 'landing' && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-7xl md:text-8xl font-serif text-rose-900 animate-slide-down">
                  Will You
                </h1>
                <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <Heart className="text-rose-500 animate-pulse-heart" size={48} fill="currentColor" />
                  <h1 className="text-7xl md:text-8xl font-serif text-rose-900">
                    Be My
                  </h1>
                </div>
                <h1 className="text-7xl md:text-8xl font-serif text-rose-900 animate-slide-down" style={{ animationDelay: '0.6s' }}>
                  Valentine?
                </h1>
              </div>
              
              <p className="text-xl text-rose-700 font-light animate-fade-in" style={{ animationDelay: '1s' }}>
                But first, let's see how well you know me...
              </p>
              
              <button
                onClick={() => setStage('trivia')}
                className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: '1.3s' }}
              >
                Let's Begin
              </button>
            </div>
          )}

          {/* Trivia Stage */}
          {stage === 'trivia' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 space-y-8 animate-fade-in border border-rose-200">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mb-4">
                  <Heart className="text-white" size={32} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-serif text-rose-900">A Little Quiz</h2>
                <p className="text-rose-600 text-lg font-light">Answer correctly to unlock my message</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-rose-50 rounded-2xl p-8 border border-rose-200">
                  <p className="text-2xl text-rose-900 font-medium text-center">
                    Where did we first meet each other?
                  </p>
                </div>
                
                <input
                  type="text"
                  value={triviaAnswer}
                  onChange={(e) => setTriviaAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTriviaSubmit()}
                  placeholder="Type your answer..."
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white/50 text-rose-900 placeholder-rose-300"
                />
                
                <button
                  onClick={handleTriviaSubmit}
                  className="w-full px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}

          {/* Reveal Stage */}
          {stage === 'reveal' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 animate-bounce-once">
                  <Heart className="text-white" size={40} fill="currentColor" />
                </div>
                <h2 className="text-5xl font-serif text-rose-900">You know me so well! ❤️</h2>
                <p className="text-xl text-rose-600 font-light">Now for something special...</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 space-y-8 border border-rose-200">
                <div className="text-center space-y-4">
                  {!showHiddenMessage ? (
                    <button
                      onClick={() => setShowHiddenMessage(true)}
                      className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-400 to-pink-400 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Lock size={24} />
                      Open My Heart
                    </button>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      <div className="inline-flex items-center gap-2 text-rose-500 mb-4">
                        <Unlock size={24} />
                        <span className="text-sm font-light">Unlocked with love</span>
                      </div>
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-10 border-2 border-rose-200">
                        <p className="text-2xl text-rose-900 font-serif italic leading-relaxed">
                          "From the moment we met, you've brought light into my life. 
                          Every day with you is a gift, and I can't imagine celebrating 
                          this Valentine's Day with anyone else. You make my heart sing."
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setStage('countdown')}
                        className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Countdown Stage */}
          {stage === 'countdown' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-serif text-rose-900">The Countdown Begins</h2>
                <p className="text-xl text-rose-600 font-light">Until our special day...</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-rose-200">
                <div className="grid grid-cols-4 gap-6 mb-10">
                  {[
                    { label: 'Days', value: timeRemaining.days },
                    { label: 'Hours', value: timeRemaining.hours },
                    { label: 'Minutes', value: timeRemaining.minutes },
                    { label: 'Seconds', value: timeRemaining.seconds }
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-2 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200">
                        <div className="text-5xl font-serif text-rose-900 font-bold">
                          {String(item.value || 0).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="text-sm text-rose-600 font-light uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setStage('rsvp')}
                  className="w-full px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  So, What Do You Say?
                </button>
              </div>
            </div>
          )}

          {/* RSVP Stage */}
          {stage === 'rsvp' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-6xl font-serif text-rose-900">Will You Be My Valentine?</h2>
                <p className="text-2xl text-rose-600 font-light">This is the moment...</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 space-y-6 border border-rose-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleRSVP('yes')}
                    className="px-10 py-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Yes, I'd Love To! 💕
                  </button>
                  
                  <button
                    onClick={() => handleRSVP('maybe')}
                    className="px-10 py-8 bg-white border-2 border-rose-300 text-rose-700 text-2xl font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-rose-50"
                  >
                    Let Me Think... 💭
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Celebration Stage */}
          {stage === 'celebration' && (
            <div className="text-center space-y-8 animate-fade-in">
              {rsvpResponse === 'yes' ? (
                <>
                  <div className="space-y-6">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mb-4 animate-bounce-once">
                      <Heart className="text-white" size={64} fill="currentColor" />
                    </div>
                    <h2 className="text-7xl font-serif text-rose-900">You Said Yes!</h2>
                    <p className="text-3xl text-rose-600 font-light">
                      You've just made me the happiest person alive! ❤️
                    </p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 space-y-6 border border-rose-200 max-w-xl mx-auto">
                    <h3 className="text-3xl font-serif text-rose-900">What's Next?</h3>
                    <p className="text-xl text-rose-700 font-light leading-relaxed">
                      Get ready for an unforgettable Valentine's Day! 
                      I'll pick you up at 7 PM. Dress elegantly—we're going somewhere special.
                    </p>
                    <p className="text-lg text-rose-500 italic">
                      More details coming soon... 💌
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mb-4">
                      <Heart className="text-white" size={48} fill="currentColor" />
                    </div>
                    <h2 className="text-6xl font-serif text-rose-900">Take Your Time</h2>
                    <p className="text-2xl text-rose-600 font-light">
                      No pressure—I'll be here when you're ready! 💕
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setStage('rsvp')}
                    className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Changed Your Mind?
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes floatHeart {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fallPetal {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes bounceOnce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-pulse-heart {
          animation: pulseHeart 2s ease-in-out infinite;
        }
        
        .animate-float-heart {
          animation: floatHeart linear infinite;
        }
        
        .animate-fall-petal {
          animation: fallPetal linear forwards;
        }
        
        .animate-bounce-once {
          animation: bounceOnce 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
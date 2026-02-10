import { useEffect, useState } from "react";
import type { ReactElement } from "react";

type ParticleEffectProps = {
  type: "rain" | "snow" | "clouds" | "none";
};

export function WeatherParticles({ type }: ParticleEffectProps) {
  const [particles, setParticles] = useState<ReactElement[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      if (type === "none") {
        return [];
      }

      const particleCount = type === "rain" ? 100 : type === "snow" ? 50 : 5;
      const newParticles: ReactElement[] = [];

      for (let i = 0; i < particleCount; i++) {
        const left = Math.random() * 100;
        const animationDuration = type === "rain" 
          ? Math.random() * 1 + 0.5 
          : type === "snow" 
          ? Math.random() * 3 + 2 
          : Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        const particleStyle = {
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${delay}s`,
        };

        if (type === "rain") {
          newParticles.push(
            <div
              key={i}
              className="rain-particle"
              style={particleStyle}
            />
          );
        } else if (type === "snow") {
          newParticles.push(
            <div
              key={i}
              className="snow-particle"
              style={{
                ...particleStyle,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
              }}
            />
          );
        } else if (type === "clouds") {
          newParticles.push(
            <div
              key={i}
              className="cloud-particle"
              style={{
                ...particleStyle,
                top: `${Math.random() * 30}%`,
              }}
            />
          );
        }
      }

      return newParticles;
    };

    setParticles(generateParticles());
  }, [type]);

  if (type === "none") return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes rainfall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0.3;
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes cloudFloat {
          0% {
            transform: translateX(-200px);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(calc(100vw + 200px));
            opacity: 0.3;
          }
        }

        .rain-particle {
          position: fixed;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.8));
          animation: rainfall linear infinite;
          pointer-events: none;
        }

        .snow-particle {
          position: fixed;
          background: white;
          border-radius: 50%;
          animation: snowfall linear infinite;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .cloud-particle {
          position: fixed;
          width: 100px;
          height: 50px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50px;
          animation: cloudFloat linear infinite;
          pointer-events: none;
          filter: blur(15px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
        }
      `}</style>
      {particles}
    </div>
  );
}
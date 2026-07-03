import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground({ variant = 'default' }) {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const getOptions = () => {
    if (variant === 'sparse') {
      return {
        fullScreen: { enable: false, zIndex: -1 },
        particles: {
          number: { value: 20, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          links: { enable: false },
          move: { enable: true, speed: 0.5, direction: "none", random: true },
          size: { value: { min: 1, max: 3 } },
          opacity: { value: 0.3 }
        }
      };
    } else if (variant === 'connected') {
      return {
        fullScreen: { enable: false, zIndex: -1 },
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#00e5ff" },
          links: { enable: true, color: "#00e5ff", distance: 150, opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1, direction: "none", outModes: "bounce" },
          size: { value: 2 },
          opacity: { value: 0.5 }
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 140, links: { opacity: 0.5 } } }
        }
      };
    }
    
    // default interactive
    return {
      fullScreen: { enable: false, zIndex: -1 },
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#00e5ff", "#7c3aed"] },
        links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.1, width: 1 },
        move: { enable: true, speed: 1.5, outModes: "bounce" },
        size: { value: { min: 1, max: 4 } },
        opacity: { value: 0.6 }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { quantity: 4 } }
      }
    };
  };

  return (
    <Particles
      id={`tsparticles-${variant}`}
      init={particlesInit}
      options={getOptions()}
      className="absolute inset-0 z-[-1]"
    />
  );
}

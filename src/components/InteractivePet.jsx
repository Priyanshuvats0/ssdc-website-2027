import React, { useEffect, useRef } from 'react';

// Centralized mouse tracking to feed all instances
const useMousePosition = () => {
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePos;
};

// -- Neko Cat (Cursor Chasing) --
const spriteSets = {
  idle: [[-3, -3]], alert: [[-7, -3]], scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]], scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]], scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]], sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]], NE: [[0, -2], [0, -3]], E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]], S: [[-6, -3], [-7, -2]], SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]], NW: [[-1, 0], [-1, -1]],
};

const NekoPet = ({ mousePos, initialX, initialY, speed = 10, scale = 1, zIndex = 50 }) => {
  const nekoRef = useRef(null);
  
  const state = useRef({
    x: initialX, y: initialY, frameCount: 0, idleTime: 0,
    idleAnimation: null, idleAnimationFrame: 0, speed: speed
  });

  useEffect(() => {
    let animationFrameId;
    let lastSpriteTime = performance.now();
    let lastPosTime = performance.now();

    const setSprite = (name, frame) => {
      if (!nekoRef.current) return;
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };

    const resetIdleAnimation = () => {
      state.current.idleAnimation = null;
      state.current.idleAnimationFrame = 0;
    };

    const idle = () => {
      state.current.idleTime += 1;
      if (state.current.idleTime > 10 && Math.random() < 0.005 && state.current.idleAnimation === null) {
        let availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (state.current.x < 32) availableIdleAnimations.push("scratchWallW");
        if (state.current.y < 32) availableIdleAnimations.push("scratchWallN");
        if (state.current.x > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (state.current.y > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        state.current.idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      switch (state.current.idleAnimation) {
        case "sleeping":
          if (state.current.idleAnimationFrame < 8) { setSprite("tired", 0); break; }
          setSprite("sleeping", Math.floor(state.current.idleAnimationFrame / 4));
          if (state.current.idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN": case "scratchWallS": case "scratchWallE": case "scratchWallW": case "scratchSelf":
          setSprite(state.current.idleAnimation, state.current.idleAnimationFrame);
          if (state.current.idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      state.current.idleAnimationFrame += 1;
    };

    const updatePositionAndSprite = (time) => {
      // Delta time for smooth movement independent of framerate
      const deltaPosTime = time - lastPosTime;
      lastPosTime = time;
      
      // Fix Y position to sit inside the Navigation bar (around y=32)
      state.current.y = 32;

      // Dynamically calculate boundaries based on navbar elements
      let minX = 60;
      let maxX = window.innerWidth - 60;
      
      const logo = document.querySelector('nav a[href="/"]');
      const desktopLinks = document.querySelector('nav .nd');
      const mobileHamburger = document.querySelector('nav .nh');
      
      if (logo) {
        minX = logo.getBoundingClientRect().right + 30; // 30px padding from logo
      }
      if (desktopLinks && window.getComputedStyle(desktopLinks).display !== 'none') {
        maxX = desktopLinks.getBoundingClientRect().left - 30; // 30px padding from links
      } else if (mobileHamburger && window.getComputedStyle(mobileHamburger).display !== 'none') {
        maxX = mobileHamburger.getBoundingClientRect().left - 30; // 30px padding from hamburger
      }

      // Clamp the target mouse X so the cat never chases past the boundaries
      const clampedMouseX = Math.min(Math.max(minX, mousePos.current.x), maxX);

      // Use clamped target so cat goes IDLE when reaching the boundary, even if cursor is outside
      const diffX = state.current.x - clampedMouseX;
      // We still calculate diffY based on real mouse so the cat can "look" up or down at the cursor
      const diffY = state.current.y - (mousePos.current.y - 16);
      
      // For movement, we only care about horizontal distance to determine if it should run
      const horizontalDistance = Math.abs(diffX);
      
      // Update Sprite at 10fps
      if (time - lastSpriteTime > 100) {
        lastSpriteTime = time;
        state.current.frameCount += 1;
        
        // Go idle if horizontal distance is small
        if (horizontalDistance < state.current.speed || horizontalDistance < 24) {
          idle();
        } else {
          state.current.idleAnimation = null;
          state.current.idleAnimationFrame = 0;
          
          if (state.current.idleTime > 1) {
            setSprite("alert", 0);
            state.current.idleTime = Math.min(state.current.idleTime, 7);
            state.current.idleTime -= 1;
          } else {
            // Only look Left (W) or Right (E) since it's locked to the navbar
            let direction = diffX > 0 ? "W" : "E";
            setSprite(direction, state.current.frameCount);
          }
        }
      }

      // Smooth Position Update at 60fps (Only horizontally)
      if (state.current.idleTime <= 1 && horizontalDistance >= state.current.speed && horizontalDistance >= 24) {
        const speedPerMs = state.current.speed / 100;
        const moveAmount = speedPerMs * deltaPosTime;
        
        // Only move horizontally
        state.current.x -= Math.sign(diffX) * moveAmount;
        
        // strict boundary enforcement
        state.current.x = Math.min(Math.max(minX, state.current.x), maxX);
      }
      
      if (nekoRef.current) {
        nekoRef.current.style.left = `${state.current.x - 16}px`;
        nekoRef.current.style.top = `${state.current.y - 16}px`;
      }

      animationFrameId = requestAnimationFrame(updatePositionAndSprite);
    };

    animationFrameId = requestAnimationFrame(updatePositionAndSprite);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleMeow = () => {
    // Play a highly reliable meow sound from Google's official public sound library
    const audio = new Audio("https://actions.google.com/sounds/v1/animals/cat_meow.ogg");
    audio.volume = 0.6;
    audio.playbackRate = 1.0;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    // Optional: Make the cat react visually (jump slightly)
    if (nekoRef.current) {
      nekoRef.current.style.transform = `scale(${scale}) translateY(-10px)`;
      setTimeout(() => {
        if (nekoRef.current) nekoRef.current.style.transform = `scale(${scale}) translateY(0px)`;
      }, 200);
    }
  };

  return (
    <div 
      ref={nekoRef} 
      onClick={handleMeow}
      style={{ 
        width: "32px", 
        height: "32px", 
        position: "fixed", 
        pointerEvents: "auto", 
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        outline: "none",
        backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')", 
        backgroundPosition: "-96px -96px", 
        imageRendering: "pixelated", 
        zIndex: zIndex, 
        // Sepia shifts it to brown/red, hue-rotate shifts to cyan, saturate makes it vivid
        filter: `sepia(1) hue-rotate(150deg) saturate(3) drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.5))`,
        transform: `scale(${scale})`,
        transition: "transform 0.1s ease-out"
      }} 
    />
  );
};


const InteractivePet = () => {
  const mousePos = useMousePosition();
  
  return (
    <>
      <NekoPet mousePos={mousePos} initialX={64} initialY={64} speed={18} scale={1.2} zIndex={501} />
    </>
  );
};

export default InteractivePet;

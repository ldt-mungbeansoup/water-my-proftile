import React, { useRef, useEffect } from 'react';

const PixelWater: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevMouseRef = useRef<{x: number, y: number} | null>(null);
  const frameRef = useRef(0);
  
  // Simulation constants
  const DAMPING = 0.985; // Extremely high damping for glass-like, slow-decaying water
  const PIXEL_SIZE = 4; 
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = Math.ceil(window.innerWidth / PIXEL_SIZE);
    let height = Math.ceil(window.innerHeight / PIXEL_SIZE);
    
    // Double buffering for wave propagation
    let buffer1 = new Float32Array(width * height);
    let buffer2 = new Float32Array(width * height);
    
    // Background texture (Sand + Baked Lighting)
    let backgroundTexture = new Uint8ClampedArray(width * height * 3);

    const initBuffers = () => {
        buffer1 = new Float32Array(width * height);
        buffer2 = new Float32Array(width * height);
        backgroundTexture = new Uint8ClampedArray(width * height * 3);
        
        // Generate Maldives Sand Texture with Baked Sunlight Gradient
        for (let y = 0; y < height; y++) {
            const yFactor = 1 - (y / height); // 1.0 at top, 0.0 at bottom
            
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 3;
                const xFactor = x / width;    // 0.0 at left, 1.0 at right

                // Sunlight Intensity: Strongest at Top-Right
                // Diagonal gradient from Top-Right (1,1) to Bottom-Left (0,0)
                const sunGradient = (xFactor + yFactor) * 0.55; 

                // Base Sand Noise (Fine grain)
                const noise = (Math.random() - 0.5) * 8;
                
                // Base Color: White/Pale Gold Sand
                // We bake the sun gradient directly into the sand color
                // Brighter and warmer in the top-right
                let r = 210 + (sunGradient * 45) + noise; 
                let g = 210 + (sunGradient * 40) + noise;
                let b = 190 + (sunGradient * 30) + noise; 

                backgroundTexture[i] = r;
                backgroundTexture[i + 1] = g;
                backgroundTexture[i + 2] = b;
            }
        }
    };

    const resize = () => {
      width = Math.ceil(window.innerWidth / PIXEL_SIZE);
      height = Math.ceil(window.innerHeight / PIXEL_SIZE);
      canvas.width = width;
      canvas.height = height;
      initBuffers();
    };

    window.addEventListener('resize', resize);
    resize();

    // Helper to add a splash
    const addSplash = (x: number, y: number, strength: number = 25) => {
        if (x > 2 && x < width - 3 && y > 2 && y < height - 3) {
            const pos = y * width + x;
            
            // Wider, softer kernel for gentle ripples
            buffer1[pos] = strength;
            
            // Radius 1
            buffer1[pos + 1] = strength * 0.8;
            buffer1[pos - 1] = strength * 0.8;
            buffer1[pos + width] = strength * 0.8;
            buffer1[pos - width] = strength * 0.8;
            
            // Radius 1 Diagonals
            buffer1[pos + width + 1] = strength * 0.7;
            buffer1[pos + width - 1] = strength * 0.7;
            buffer1[pos - width + 1] = strength * 0.7;
            buffer1[pos - width - 1] = strength * 0.7;

             // Radius 2 (Soft falloff)
            buffer1[pos + 2] = strength * 0.4;
            buffer1[pos - 2] = strength * 0.4;
            buffer1[pos + width * 2] = strength * 0.4;
            buffer1[pos - width * 2] = strength * 0.4;
        }
    };

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / PIXEL_SIZE);
      const y = Math.floor(e.clientY / PIXEL_SIZE);
      
      if (prevMouseRef.current) {
          const dx = x - prevMouseRef.current.x;
          const dy = y - prevMouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.ceil(dist);
          
          for (let i = 0; i < steps; i++) {
              const t = i / steps;
              const ix = Math.floor(prevMouseRef.current.x + dx * t);
              const iy = Math.floor(prevMouseRef.current.y + dy * t);
              addSplash(ix, iy, 20); // Gentle consistent drag
          }
      } else {
          addSplash(x, y, 30); // Initial entry splash slightly stronger
      }
      
      prevMouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
        prevMouseRef.current = null;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const loop = () => {
      frameRef.current++;

      // Physics at 30fps for viscous feel
      if (frameRef.current % 2 === 0) {
          // 1. Calculate Wave Physics
          for (let y = 1; y < height - 1; y++) {
            let index = y * width + 1;
            for (let x = 1; x < width - 1; x++) {
              const val = (
                buffer1[index - 1] + 
                buffer1[index + 1] + 
                buffer1[index - width] + 
                buffer1[index + width]
              ) / 2 - buffer2[index];
              
              buffer2[index] = val * DAMPING;
              index++;
            }
          }

          // 2. Render to Canvas
          const imageData = ctx.createImageData(width, height);
          const data = imageData.data;

          for (let y = 1; y < height - 1; y++) {
             // Pre-calculate Y row index to save mults
             const rowStart = y * width;
             
             for (let x = 1; x < width - 1; x++) {
                const i = rowStart + x;
                
                // --- Physics Sampling ---
                const waveHeight = buffer2[i];
                
                // Calculate Slopes for Normal Vector
                const xSlope = buffer1[i - 1] - buffer1[i + 1];
                const ySlope = buffer1[i - width] - buffer1[i + width];

                // --- Refraction ---
                // Distort the texture lookup based on the wave slope
                let textureX = x + Math.floor(xSlope * 2); 
                let textureY = y + Math.floor(ySlope * 2);
                
                // Clamp
                if (textureX < 0) textureX = 0; else if (textureX >= width) textureX = width - 1;
                if (textureY < 0) textureY = 0; else if (textureY >= height) textureY = height - 1;

                const textureIdx = (textureY * width + textureX) * 3;
                
                // Fetch Base Color (Sand with baked lighting)
                let r = backgroundTexture[textureIdx];
                let g = backgroundTexture[textureIdx + 1];
                let b = backgroundTexture[textureIdx + 2];

                // --- Water Color Tinting (Volumetric) ---
                // Maldives Turquoise: R:0 G:255 B:240
                // We blend the sand color towards the water color.
                // Deeper water (low wave) = more blue. Shallow (high wave) = more clear.
                
                // Base opacity of the water body
                const waterOpacity = 0.55; 
                r = r * (1 - waterOpacity) + 10 * waterOpacity;
                g = g * (1 - waterOpacity) + 240 * waterOpacity;
                b = b * (1 - waterOpacity) + 235 * waterOpacity;

                // --- Directional Sunlight (Specular) ---
                // Light coming from Top-Right (Vector: 1, -1)
                // Surface Normal approx: (-xSlope, -ySlope, 1)
                // Dot Product ~ xSlope * 1 + ySlope * -1
                
                // Calculate alignment with light source
                // Positive value = facing light
                const lightAlignment = xSlope - ySlope; 
                
                // Specular Highlights (Sparkles)
                if (lightAlignment > 2) {
                    const sparkle = (lightAlignment - 2) * 5;
                    r += sparkle;
                    g += sparkle;
                    b += sparkle;
                }

                // Shadows (Back of waves)
                if (lightAlignment < -2) {
                    const shadow = -(lightAlignment + 2) * 2;
                    // Shadows in turquoise water are often teal/deep blue, not black
                    r -= shadow * 1.5; // Remove red to make it cooler
                    g -= shadow * 0.5;
                    b -= shadow * 0.2;
                }

                // --- Caustics (Lens Effect) ---
                // Focusing light on the bottom. 
                // Wave crests (convex) act as lenses.
                // Simple approximation: purely based on wave height relative to surroundings
                if (waveHeight > 0.5) {
                    // Intense bright web patterns
                    const causticIntensity = waveHeight * 5;
                    r += causticIntensity;
                    g += causticIntensity;
                    b += causticIntensity * 0.8; // slightly yellow/white sunlight
                }

                const pixelIndex = i * 4;
                data[pixelIndex] = Math.max(0, Math.min(255, r));
                data[pixelIndex + 1] = Math.max(0, Math.min(255, g));
                data[pixelIndex + 2] = Math.max(0, Math.min(255, b));
                data[pixelIndex + 3] = 255;
             }
          }

          ctx.putImageData(imageData, 0, 0);

          // 3. Swap buffers
          const temp = buffer1;
          buffer1 = buffer2;
          buffer2 = temp;
      }

      requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        imageRendering: 'pixelated', 
        zIndex: 0 
      }} 
    />
  );
};

export default PixelWater;
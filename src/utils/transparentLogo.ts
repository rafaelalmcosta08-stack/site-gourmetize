let cachedTransparentLogo: string | null = null;
let logoProcessingPromise: Promise<string> | null = null;

export const GOURMETIZE_LOGO_URL = "https://res.cloudinary.com/epo1w9hl/image/upload/v1784657082/3.0_Gourmetize_udgsmm.png";

/**
 * Loads the image, removes the white background on HTML5 Canvas with smooth anti-aliasing,
 * and returns a transparent PNG Data URL.
 */
export function getTransparentLogo(src: string = GOURMETIZE_LOGO_URL): Promise<string> {
  if (cachedTransparentLogo) {
    return Promise.resolve(cachedTransparentLogo);
  }

  if (logoProcessingPromise) {
    return logoProcessingPromise;
  }

  logoProcessingPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check for white / near-white background pixels
          if (r > 210 && g > 210 && b > 210) {
            const minColor = Math.min(r, g, b);
            if (minColor > 240) {
              data[i + 3] = 0; // Fully transparent
            } else {
              // Smooth anti-aliased edge falloff
              const alpha = Math.max(0, 255 - (minColor - 210) * 8.5);
              data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const resultDataUrl = canvas.toDataURL('image/png');
        cachedTransparentLogo = resultDataUrl;
        resolve(resultDataUrl);
      } catch (e) {
        console.warn('Canvas background removal failed, using fallback:', e);
        resolve(src);
      }
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });

  return logoProcessingPromise;
}

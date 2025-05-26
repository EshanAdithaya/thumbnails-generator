/**
 * Calculate aspect ratio percentage (height/width * 100)
 */
export function calculateAspectRatio(width: number, height: number): number {
  if (width === 0 || height === 0) return 0;
  return (height / width) * 100;
}

/**
 * Validate if a file is an image type
 */
export function validateImageFile(file: File): boolean {
  const validImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
  ];
  return validImageTypes.includes(file.type);
}

/**
 * Generate base64 preview from canvas
 */
export function generateBase64Preview(
  canvas: HTMLCanvasElement,
  quality: number = 80,
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const dataUrl = canvas.toDataURL("image/jpeg", quality / 100);
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Resize image while maintaining aspect ratio
 */
export function calculateResizeDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }

  return {
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  };
}

/**
 * Create a tiny preview image (for base64 placeholder generation)
 */
export function createTinyPreview(
  sourceCanvas: HTMLCanvasElement,
  previewSize: number = 6,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = previewSize;
  canvas.height = previewSize;

  // Enable image smoothing for better quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw the resized image
  ctx.drawImage(sourceCanvas, 0, 0, previewSize, previewSize);

  return canvas;
}

/**
 * Convert file to canvas
 */
export function fileToCanvas(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    if (!validateImageFile(file)) {
      reject(new Error("Invalid image file"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };

      img.onerror = () => reject(new Error("Failed to load image"));

      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

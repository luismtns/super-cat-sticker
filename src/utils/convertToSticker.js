/**
 * Converts an image from an HTML <img> element to a WebP sticker.
 *
 * @param {HTMLImageElement} imgElement - The HTML <img> element.
 * @param {number} [maxDimension=512] - The maximum width/height of the sticker.
 * @returns {Promise<Blob>} - A promise that resolves to a Blob of the WebP sticker.
 */
export const convertToSticker = (imgElement, maxDimension = 512) => {
  return new Promise((resolve, reject) => {
    if (!imgElement || !(imgElement instanceof HTMLImageElement)) {
      return reject(new Error('Invalid image element provided.'));
    }

    // Wait for the image to load
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
      imgElement.onload = () => processImage(imgElement);
      imgElement.onerror = () => reject(new Error('Failed to load image from the <img> element.'));
    } else {
      processImage(imgElement);
    }

    function processImage(image) {
      // Create an off-screen canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate new dimensions maintaining aspect ratio
      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (width > height) {
        if (width > maxDimension) {
          height *= maxDimension / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width *= maxDimension / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0, width, height);

      // Export the canvas content as WebP
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image to WebP format.'));
          }
        },
        'image/webp',
        0.8 // Quality parameter
      );
    }
  });
};

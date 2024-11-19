import React, { useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import { convertToSticker } from '../utils/convertToSticker';

/**
 * StickerButton component that converts an image referenced by `imageRef` to a WhatsApp sticker.
 *
 * @param {Object} props
 * @param {React.RefObject<HTMLImageElement>} props.imageRef - A reference to the <img> element.
 * @returns {JSX.Element}
 */
const StickerButton = ({ imageRef }) => {
  const [stickerURL, setStickerURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvertSticker = async () => {
    if (imageRef?.current) {
      setIsLoading(true);
      try {
        const stickerBlob = await convertToSticker(imageRef.current);
        const stickerURL = URL.createObjectURL(stickerBlob);
        setStickerURL(stickerURL);
      } catch (error) {
        console.error('Error creating sticker:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Image reference is not valid.');
    }
  };

  return (
    <div>
      {!stickerURL ? (
        <Button onClick={handleConvertSticker} size='lg' isLoading={isLoading} color={'default'}>
          Convert to Sticker
        </Button>
      ) : (
        <Link href={stickerURL} download='sticker.webp' color='primary'>
          Download Sticker
        </Link>
      )}
    </div>
  );
};

export default StickerButton;

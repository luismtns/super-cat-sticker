import { useEffect, useRef, useState } from 'react';
import { Input, Button, Image } from '@nextui-org/react';

import StickerButton from './StickerButton';
import TagInput from './TagInput';
import { getImageURL } from '../services/cataasService';

function CatImage() {
  const imageRef = useRef(null);

  const baseUrl = 'https://cataas.com/cat';
  const [tag, setTag] = useState('');
  const [say, setSay] = useState('');
  const [fontSize, setFontSize] = useState();
  const [fontColor, setFontColor] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());

  const placeholderImg = 'https://placehold.co/800x800?text=Generate+a+super+cat';
  const [imageUrl, setImageUrl] = useState(placeholderImg);
  const [hasError, setHasError] = useState(false);
  const refreshImage = () => {
    setImageUrl(placeholderImg);
    setTimestamp(Date.now());
    setTimeout(() => {
      setImageUrl(getImageURL({ tag, say, fontSize, fontColor, timestamp }));
    }, 200);
  };
  const handleError = () => {
    setHasError(true);
    setImageUrl('https://placehold.co/300x300/FF0000/FFFFFF?text=Error+Loading+Image');
  };

  useEffect;

  return (
    <article>
      <div className='p-4 flex flex-col gap-3'>
        <h3 className='text-xl'>1. Choose Your Tags</h3>
        <p>Use the Tags field to pick categories and themes for your cat image.</p>

        <TagInput label='Insert Cat Tags' onChange={(e) => setTag(e.join(', '))} />
      </div>

      <div className='p-4 flex flex-col gap-3'>
        <h3 className='text-xl'>2. Add Your Message</h3>
        <p>
          In the <strong>Say</strong> field, type the text you want to appear on the image, like “Good Morning!” or
          “You’ve Got This!” This text will be displayed directly on the image, giving your cat character a voice.
        </p>
        <Input
          id='say'
          type='text'
          placeholder='Message'
          value={say}
          onChange={(e) => setSay(e.currentTarget.value)}
          size='lg'
        />
      </div>

      <div className='p-4 flex flex-col gap-3'>
        <h3 className='text-xl'>3. Customize Text Settings</h3>
        <p>Enhance your message by adjusting its appearance:</p>
        <div className='flex flex-row gap-3'>
          <div className='w-3/6 max-w-48'>
            <Input
              id='fontColor'
              type='color'
              label='Text Color'
              placeholder='Text Color'
              value={fontColor}
              onChange={(e) => setFontColor(e.currentTarget.value)}
              size='lg'
            />
          </div>
          <div className='w-3/6 max-w-48'>
            <Input
              id='fontSize'
              type='number'
              label='Text Size'
              value={fontSize}
              onChange={(e) => setFontSize(isNaN(Number(e.currentTarget.value)) ? 52 : Number(e.currentTarget.value))}
              size='lg'
            />
          </div>
        </div>
      </div>

      <div className='p-4 flex justify-between gap-3 w-full flex-row-reverse'>
        <Button color='primary' onClick={() => refreshImage()} size='lg'>
          {'Generate a cat'} ✨
        </Button>
      </div>

      <div className='w-full max-w-screen-xs py-4 flex justify-center'>
        <Image
          loading='lazy'
          src={imageUrl}
          ref={imageRef}
          crossOrigin='anonymous'
          className='w-full max-w-md mx-auto'
          onError={handleError}
          style={{
            border: hasError ? '1px solid #ccc' : '1px solid transparent',
          }}
        />
      </div>
      <div className='flex flex-row justify-center mt-4 pb-8'>
        {!!imageUrl && imageRef.current && <StickerButton imageRef={imageRef} timestamp={timestamp} />}
      </div>
    </article>
  );
}

export default CatImage;

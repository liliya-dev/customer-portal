import React, { useCallback, useEffect, useRef, useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { useDebounce } from '../../hooks/useDebounce';

import { ImageType, RatioType } from '../../types';

type ImageProps = {
  crop?: ImageType['crop'];
  hotspot?: ImageType['hotspot'];
  preventResize?: boolean;
  ratio?: '16:9' | '1:1' | '2:1' | '13:8';
} & NextImageProps;

const ratioClasses: Record<RatioType, string> = {
  '1:1': 'aspect-w-1 aspect-h-1',
  '16:9': 'aspect-w-16 aspect-h-9',
  '2:1': 'aspect-w-2 aspect-h-1',
  '13:8': 'aspect-w-13 aspect-h-8',
};

export const Image = ({
  src,
  width,
  height,
  crop,
  hotspot,
  alt = '',
  layout = 'intrinsic',
  objectFit,
  className,
  preventResize = false,
  priority,
  ratio,
}: ImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const debouncedWindowWidth = useDebounce(windowWidth, 500);
  const [responsiveSrc, setResponsiveSrc] = useState<string | null>(null);
  const [state, setState] = useState<'loading' | 'loaded'>('loading');

  let placeHolderSrc;

  // if (src && typeof src === 'string' && src.indexOf('sanity.io') > -1) {
  //   placeHolderSrc = getResponsiveImageUrl({
  //     src,
  //     width: 16,
  //     height: 16 / (+width / +height),
  //     hotspot,
  //     crop,
  //     blur: 10,
  //   });
  // }

  /**
   * Listen to window resizes
   */

  useEffect(() => {
    if (!src) return;
    if (!wrapperRef?.current) return;
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', onResize, { passive: true });
    () => window.removeEventListener('resize', onResize);
  }, [wrapperRef, src]);

  /**
   * when the debounced window width changes
   * generate new source for sanity images
   */

  useEffect(() => {
    if (!src) return;
    if (!placeHolderSrc) return;
    if (typeof src !== 'string') return;

    const rect = wrapperRef.current.getBoundingClientRect();

    const newWidth = rect.width;
    let newHeight = rect.height;
    let quality = 85;

    if (preventResize === true) {
      // Do we need to factor in crops as well? https://github.com/sanity-io/hydrogen-sanity-demo/blob/main/src/components/SanityImage.client.jsx#L100
      newHeight = rect.width / (+width / +height);
      quality = null;
    }

    // for layouts where height depends on the image, use image ratio
    if (newHeight === 0) newHeight = newWidth / (+width / +height);

    // setResponsiveSrc(
    //   getResponsiveImageUrl({
    //     src,
    //     width: newWidth,
    //     height: newHeight,
    //     hotspot,
    //     crop,
    //     quality,
    //   }),
    // );
  }, [
    debouncedWindowWidth,
    width,
    height,
    src,
    crop,
    hotspot,
    preventResize,
    placeHolderSrc,
  ]);

  const onImageLoad = useCallback(() => {
    setState('loaded');
  }, []);

  if (!src) return null;

  return (
    // disable margin underneath next image until classes can be applied to next image directly
    // https://github.com/vercel/next.js/discussions/22861
    <div
      className={cx('text-0 h-full w-full', {
        ['relative']: !objectFit,
        [ratioClasses[ratio]]: ratio,
      })}
      ref={wrapperRef}
    >
      <AnimatePresence>
        {state === 'loading' && placeHolderSrc && (
          <div className="hidden md:block">
            <motion.div
              ref={placeholderRef}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                boxSizing: 'border-box',
                padding: 0,
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: 0,
                height: 0,
                minWidth: '100%',
                maxWidth: '100%',
                minHeight: '100%',
                maxHeight: '100%',
                zIndex: 1,
              }}
            >
              <NextImage
                src={placeHolderSrc}
                className={className}
                alt={alt}
                layout={layout}
                width={layout === 'fill' ? null : width}
                height={layout === 'fill' ? null : height}
                priority={priority}
                objectFit={objectFit}
                loader={({ src, width, quality = 85 }) => {
                  return `${src}&maxWidth=${width}&q=${quality}`;
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NextImage
        src={responsiveSrc || placeHolderSrc || src}
        className={className}
        alt={alt}
        layout={layout}
        width={layout === 'fill' ? null : width}
        height={layout === 'fill' ? null : height}
        objectFit={objectFit}
        priority={priority}
        loader={({ src, width, quality = 100 }) => {
          return `${src}&maxWidth=${width}&q=${quality}`;
        }}
        quality={85}
        onLoad={onImageLoad}
      />
    </div>
  );
};

export const ImageMemo = React.memo(Image);

// type GetResponsiveImageUrlProps = {
//   src: string;
//   width: number;
//   height: number;
//   crop: ImageProps['crop'];
//   hotspot: ImageProps['hotspot'];
//   blur?: number;
//   quality?: number;
// };

// export function getResponsiveImageUrl({
//   src,
//   width,
//   height,
//   crop,
//   hotspot,
//   blur = 0,
//   quality = 85,
// }: GetResponsiveImageUrlProps) {
//   const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
//   // let newSrc = imageBuilder.image(src).auto('format');
//   if (quality) newSrc = newSrc.quality(85);
//   if (blur) newSrc = newSrc.blur(blur);
//   if (width) newSrc = newSrc.width(Math.ceil(width * dpr));
//   if (height) newSrc = newSrc.height(Math.ceil(height * dpr));
//   if (hotspot?.x && hotspot?.y)
//     newSrc = newSrc.crop('focalpoint').focalPoint(hotspot.x, hotspot.y).fit('crop');
//   if (crop?.left && crop?.top && crop?.right && crop?.top)
//     newSrc = newSrc.rect(crop.left, crop.top, crop.right, crop.top);

//   return newSrc.url();
// }

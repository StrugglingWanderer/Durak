import { useState, useEffect } from 'react';
import log from 'helpers/log';

export default function useImagePreload(src: string | string[]) {
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);

  useEffect(() => {
    if (isPreloaded) return;

    let promise: Promise<unknown>;

    if (typeof src === 'string') promise = imagePreload(src);
    else promise = Promise.all(src.map((src: string) => imagePreload(src)));

    promise.then(() => setIsPreloaded(true));
  }, [src, isPreloaded]);

  return isPreloaded;
}

function imagePreload(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = image.onabort = () => reject(src);

    image.src = src;
  }).catch((src) => log.imageFailed(src));
}

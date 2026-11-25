import React, { useState } from 'react';

/**
 * ImageWithLoader component
 * Displays a placeholder background color and/or blur data URL while loading,
 * and smoothly fades in the image once decoded/loaded.
 */
export default function ImageWithLoader({
  src,
  alt = '',
  className = '',
  style = {},
  imgStyle = {},
  bgColor = '#f8e8e8',
  blurDataURL,
  objectPosition = '50% 50%',
  loading = 'lazy',
  decoding = 'async',
  fallbackSrc = '/puppies/copper-1.webp',
  onLoad
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: blurDataURL ? `url("${blurDataURL}")` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: objectPosition,
        backgroundRepeat: 'no-repeat',
        ...style
      }}
    >
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => {
          if (!error) {
            setError(true);
          }
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
          objectPosition,
          transition: 'opacity 0.45s ease',
          opacity: loaded ? 1 : 0,
          ...imgStyle
        }}
      />
    </div>
  );
}

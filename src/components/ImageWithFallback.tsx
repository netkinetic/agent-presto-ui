import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...rest} />;
};

export default ImageWithFallback;

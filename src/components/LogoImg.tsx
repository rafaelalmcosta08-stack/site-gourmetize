import React, { useState, useEffect } from 'react';
import { GOURMETIZE_LOGO_URL, getTransparentLogo } from '../utils/transparentLogo';

interface LogoImgProps {
  className?: string;
  alt?: string;
  src?: string;
}

export const LogoImg: React.FC<LogoImgProps> = ({
  className = "h-12 w-auto object-contain",
  alt = "Assessoria Gourmetize",
  src = GOURMETIZE_LOGO_URL
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    let isMounted = true;
    getTransparentLogo(src).then((transparentUrl) => {
      if (isMounted) {
        setImgSrc(transparentUrl);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} bg-transparent`}
      style={{
        backgroundColor: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
};

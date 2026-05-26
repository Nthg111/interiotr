"use client";

import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** CSS object-position value to control focal point when a manual override is needed. */
  objectPosition?: string;
  /** When true, render the image as a CSS background to guarantee cropping behavior */
  coverAsBackground?: boolean;
};

export default function Image({ src, alt, className = "", objectPosition, style, coverAsBackground = false, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  // Infer object-fit from provided className if present so we can set it inline
  const inferredObjectFit = className.includes("object-contain")
    ? "contain"
    : className.includes("object-cover")
    ? "cover"
    : undefined;

  const combinedStyle = {
    ...(style || {}),
    ...(objectPosition ? { objectPosition } : {}),
    ...(inferredObjectFit ? { objectFit: inferredObjectFit } : {}),
  } as React.CSSProperties;

  // When asked to render as a background, use a div with background-image
  if (coverAsBackground) {
    return (
      <div
        className={`${className} relative overflow-hidden`}
        style={{ backgroundImage: `url(${src})`, backgroundPosition: objectPosition ?? 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        role="img"
        aria-label={alt}
      >
        {/* invisible img to detect load and provide semantic fallback for some bots/assistive tech */}
        <img src={src} alt="" onLoad={() => setLoaded(true)} className="sr-only" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={combinedStyle}
      className={`${className} ${loaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}
      {...rest}
    />
  );
}

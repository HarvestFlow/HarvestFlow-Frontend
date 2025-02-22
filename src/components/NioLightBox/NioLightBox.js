import React from 'react';
import FsLightbox from 'fslightbox-react';
import { createPortal } from 'react-dom';

export default function NioLightBox({ className, show, src, frameSize, children }) {

  return createPortal(
    <>
      <FsLightbox toggler={show} sources={src} maxYoutubeVideoDimensions={frameSize}>
        {children}
      </FsLightbox>
    </>,
    document.body
  )
};

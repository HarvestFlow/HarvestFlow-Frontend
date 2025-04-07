import React from 'react';
import '@dotlottie/player-component'; // Importez le composant Lottie

const LottieAnimation = () => {
  return (
    <div className="lottie-container">
      <dotlottie-player
        src="https://cdn.blueyonder.com/global/animation/home/home.json"
        background="transparent"
        speed="1"
        direction="1"
        playMode="normal"
        loop
        autoplay
      />
      <style jsx>{`
        .lottie-container {
          max-width: 1920px;
          max-height: 720px;
          width: 100%;
          height: 0;
          padding-bottom: 37.5%; /* Aspect ratio de 1920x720 (720/1920 * 100) */
          position: relative;
          margin: 0 auto;
        }

        .lottie-container > dotlottie-player {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default LottieAnimation;
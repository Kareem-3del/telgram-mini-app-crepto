import { useEffect, useCallback } from 'react';

const SnowParticles = () => {
  const getSnowflakeCount = useCallback(() => {
    const width = window.screen.width;
    return width < 768 ? 100 : width < 1024 ? 150 : 200;
  }, []);

  const letItSnow = useCallback(() => {
    const snowflakeArea = document.querySelector('.snowfall-animation') as HTMLElement;
    if (!snowflakeArea) return;

    snowflakeArea.innerHTML = ''; // Clear any existing snowflakes
    for (let i = 0; i < getSnowflakeCount(); i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');

      const randomSize = Math.random() * 4 + 1;
      const randomDuration = Math.random() * 11 + 4;
      const randomXPosition = Math.random() * 100;
      const randomDelay = Math.random() * 6;
      const randomOpacity = Math.random() * 0.2 + 0.4;
      const randomSway = Math.random() * 20 - 10;

      snowflake.style.left = `${randomXPosition}%`;
      snowflake.style.animationDuration = `${randomDuration}s`;
      snowflake.style.width = `${randomSize}px`;
      snowflake.style.height = `${randomSize}px`;
      snowflake.style.animationDelay = `${randomDelay}s`;
      snowflake.style.opacity = `${randomOpacity}`;
      snowflake.style.setProperty('--sway-amplitude', `${randomSway}px`);

      snowflakeArea.appendChild(snowflake);
    }
  }, [getSnowflakeCount]);

  useEffect(() => {
    letItSnow();
    window.addEventListener('resize', letItSnow);

    return () => {
      window.removeEventListener('resize', letItSnow);
    };
  }, [letItSnow]);

  return <div className="snowfall-animation"></div>;
};

export default SnowParticles;

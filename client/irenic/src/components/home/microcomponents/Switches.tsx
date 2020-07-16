import React, { useRef } from 'react';

// styles
import './scss/switches.css';

interface Switch1Props {
  state: 0 | 1 | 2;
  onswitch: () => void;
  //   setSate: () => ;
}



export const Switch: React.FC<Switch1Props> = ({ state,  onswitch }) => {
  const switchDom = useRef(null);

  let track_class = 'switch-track' + (state === 1 ? ' track-on' : '');
  let head_class = 'switch-head' + (state === 1 ? ' head-on' : '');
  if (state === 2) {
    track_class = 'switch-track loading-track';
    head_class = 'switch-head loading-head';
  }

  return (
    <div ref={switchDom} className="switch1" onClick={onswitch}>
      <div className={track_class}>
        <div className={head_class}></div>
      </div>
    </div>
  );
};

import React from 'react';

// Activity boxes
import { Topics } from './ActivityBoxes';

interface ActivityProps {}

const Activity: React.FC<ActivityProps> = () => {
  return (
    <div className="activity">
      <div className="search">
        <input type="text" placeholder="search irenic.."/>
      </div>
      <div className="activities">
        <Topics />
      </div>
    </div>
  );
};

export default Activity;

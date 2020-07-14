import React from 'react';

import '../scss/ActivityBoxes.css';

interface TopicsProps {}
export const Topics: React.FC<TopicsProps> = () => {
  return (
    <div className="activity-box topics">
      <header>
        <h4>Topics</h4>
      </header>

      <div className="activity-content">
          <div className="topic">
              <p>#SomeTopic</p>
          </div>
          <div className="topic">
              <p>#SomeTopic</p>
          </div>
          <div className="topic">
              <p>#SomeTopic</p>
          </div>
          <div className="topic">
              <p>#SomeTopic</p>
          </div>
      </div>
    </div>
  );
};

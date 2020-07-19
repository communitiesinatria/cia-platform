import React, { useContext, useEffect, useState } from 'react';

// context
import { GlobalContext } from '../GlobalContext';
import { Switch } from './microcomponents/Switches';

interface ProfileProps {}
const Settings: React.FC<ProfileProps> = () => {
  const { user } = useContext(GlobalContext);

  const [switch1, setSwitch1] = useState<0 | 1 | 2>(0);
  function dispatchswitch1() {
    // setSwitch1(Number(!switch1));
    setSwitch1(2); // loading state
    setTimeout(() => {
      setSwitch1(1);
    }, 500);
  }

  useEffect(() => {
    document.title = 'irenic | Settings';
  }, []);

  return (
    <div className="settings">
      {/* <Switch state={switch1} onswitch={dispatchswitch1} /> */}
      <Setting type="expand" title={'change username'}></Setting>
      <Setting type="expand" title={'change password'}></Setting>
    </div>
  );
};

interface SettingProps {
  type: 'expand' | null;
  title: string;
}
const Setting: React.FC<SettingProps> = ({ title, type, children }) => {
  return <div className="setting"></div>;
};

export default Settings;

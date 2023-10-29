import { useEffect, useState } from 'react';
import { TimeoutWarningModal } from './TimeoutWarningModal';
import { addEventListeners, removeEventListeners } from '../utils/eventListenerUtil';
import { IdealTiming } from '../Constants';

export const TimeoutLogic = () => {
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () =>
      setTimeout(() => {
        setWarningModalOpen(true);
      }, IdealTiming.IDEALTIME);

    const createTimeout2 = () =>
      setTimeout(() => {
        // Implement a sign out function here
        window.location.href = '/';
        localStorage.clear();
      }, IdealTiming.AUTOSIGNOFF);

    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeout1();
      }
    };

    // Initialization
    let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1();
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    };
  }, [isWarningModalOpen]);
  return <div>{isWarningModalOpen && <TimeoutWarningModal onRequestClose={() => setWarningModalOpen(false)} />}</div>;
};

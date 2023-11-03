import { clearAllCookies } from '../utils/common';
import CustomModal from './CustomModal';
interface TimeoutWarningModalProps {
  onRequestClose: () => void;
}
export const TimeoutWarningModal: React.FC<TimeoutWarningModalProps> = ({ onRequestClose }) => {
  const onLogOffCall = () => {
    clearAllCookies();
    window.location.href = '/';
  };

  return (
    <CustomModal
      handleForm={onRequestClose}
      handleCancel={onLogOffCall}
      heading="Confirm Popup"
      subText="Are you sure you want Log Off."
      button1Text="Log Off"
      button2Text="Stay Logged In"
    />
  );
};

import { CustomParagraph, StyledModalBackdrop, StyledModalContent } from './styledComponents/Common.styles';
import { ActionButtonGroup, CustomButton } from './styledComponents/InputBox.styles';
interface TimeoutWarningModalProps {
  onRequestClose: () => void;
}
export const TimeoutWarningModal: React.FC<TimeoutWarningModalProps> = ({ onRequestClose }) => {
  const onLogOffCall = () => {
    window.location.href = '/';
    localStorage.clear();
  };

  return (
    <StyledModalBackdrop>
      <StyledModalContent>
        <h5>Confirm Popup</h5>
        <CustomParagraph>Are you sure you want to continue to update the existing Product</CustomParagraph>
        <ActionButtonGroup>
          <CustomButton variant="outlined" onClick={onLogOffCall}>
            Log off
          </CustomButton>
          <CustomButton variant="contained" onClick={onRequestClose}>
            Stay Logged In
          </CustomButton>
        </ActionButtonGroup>
      </StyledModalContent>
    </StyledModalBackdrop>
  );
};

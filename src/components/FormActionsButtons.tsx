import { ActionButtonGroup, CustomButton } from './styledComponents/InputBox.styles';
import { useNavigate } from 'react-router-dom';

interface props {
  handleForm: any;
  handleCancel?: any;
  button1Text?: string;
  button2Text?: string;
}
const FormActionsButtons = ({ handleForm, handleCancel, button1Text = 'Cancel', button2Text = 'Submit' }: props) => {
  const navigate = useNavigate();

  const handleCancelButton = () => {
    if (handleCancel) {
      handleCancel();
      return;
    }
    navigate(-1);
  };

  return (
    <ActionButtonGroup>
      <CustomButton variant="outlined" onClick={handleCancelButton}>
        {button1Text}
      </CustomButton>
      <CustomButton variant="contained" onClick={() => handleForm()}>
        {button2Text}
      </CustomButton>
    </ActionButtonGroup>
  );
};

export default FormActionsButtons;

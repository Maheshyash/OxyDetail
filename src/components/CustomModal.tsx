import {
  CustomParagraph,
  StyledModalBackdrop,
  StyledModalBody,
  StyledModalContent
} from './styledComponents/Common.styles';
import FormActionsButtons from './FormActionsButtons';

interface props {
  handleForm: any;
  handleCancel?: any;
  heading: string;
  subText: string;
  button1Text?: string;
  button2Text?: string;
}
const CustomModal = ({
  handleForm,
  handleCancel,
  heading,
  subText,
  button1Text = 'Cancel',
  button2Text = 'Submit'
}: props) => {
  return (
    <StyledModalBackdrop>
      <StyledModalBody>
        <StyledModalContent>
          <h5>{heading}</h5>
          <CustomParagraph>{subText}</CustomParagraph>
          <FormActionsButtons
            handleForm={handleForm}
            handleCancel={handleCancel}
            button1Text={button1Text}
            button2Text={button2Text}
          />
        </StyledModalContent>
      </StyledModalBody>
    </StyledModalBackdrop>
  );
};

export default CustomModal;

import { BodyContainer } from '../components/styledComponents/Body.styles';
import { ActionButtonGroup, CustomButton } from '../components/styledComponents/InputBox.styles';
import { useNavigate } from 'react-router-dom';
const AddOrEditAttributes = () => {
  const navigate = useNavigate();
  return <BodyContainer>
    <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained">Submit</CustomButton>
      </ActionButtonGroup>
  </BodyContainer>
};

export default AddOrEditAttributes;
import { ChangeEvent, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import LabelValue from '../components/LabelValue';
import { CustomSwitch, ErrorMessage } from '../components/styledComponents/Common.styles';
import { useLocation } from 'react-router-dom';
import { Label } from '../components/styledComponents/InputBox.styles';
import FormActionsButtons from '../components/FormActionsButtons';

interface formDetailsType {
  roleId: number;
  roleName: string;
  isActive: boolean;
}
const AddOrEditRole = () => {
  const location = useLocation();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [formDetails, setFormeDtails] = useState<formDetailsType>({
    roleId: 0,
    roleName: '',
    isActive: false
  });
  const handleRoleName = (event: ChangeEvent<HTMLInputElement>) => {
    setFormeDtails({ ...formDetails, roleName: event.target.value });
  };
  const handleRoleSubmittion = () => {
    
  }
  useEffect(()=>{
    
  },[])
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue label="Name" value={formDetails.roleName} onChange={handleRoleName} placeholder="Enter Name" />
          {formDetails.roleName.trim() === '' && isSubmit && <ErrorMessage>Please enter Role Name</ErrorMessage>}
        </Grid>
        {location.state && (
          <Grid item xs={12} md={3}>
            <Label>Is Active</Label>
            <CustomSwitch
              checked={formDetails.isActive}
              onChange={() =>
                setFormeDtails(props => {
                  return { ...formDetails, isActive: !props.isActive };
                })
              }
            />
          </Grid>
        )}
      </Grid>
      <FormActionsButtons handleForm={handleRoleSubmittion} />
    </BodyContainer>
  );
};

export default AddOrEditRole;

import { ChangeEvent, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import LabelValue from '../components/LabelValue';
import { CustomSwitch, ErrorMessage } from '../components/styledComponents/Common.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Label } from '../components/styledComponents/InputBox.styles';
import FormActionsButtons from '../components/FormActionsButtons';
import { insertOrUpdateRole } from '../utils/APIActions';
import { toaster } from '../components/Toaster/Toaster';

interface formDetailsType {
  roleId: number;
  roleName: string;
  isActive: boolean;
}
const AddOrEditRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [formDetails, setFormeDtails] = useState<formDetailsType>({
    roleId: 0,
    roleName: '',
    isActive: true
  });
  const handleRoleName = (event: ChangeEvent<HTMLInputElement>) => {
    setFormeDtails({ ...formDetails, roleName: event.target.value });
  };
  const handleRoleSubmittion = async () => {
    if (formDetails.roleName.trim() === '') {
      setIsSubmit(true);
      return;
    }
    setIsLoader(true);
    await insertOrUpdateRole(formDetails)
      .then(res => {
        if (res.statusCode == 0 || res.statusCode === 1) {
          toaster('success', res.statusMessage);
          setIsLoader(false);
          navigate(-1);
        } else {
          setIsLoader(false);
          toaster('error', res.statusMessage);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  };
  useEffect(() => {
    if (location.state) {
      const { roleId, roleName, isActive } = location.state.roleDetails;
      setFormeDtails({
        roleId: roleId,
        roleName: roleName,
        isActive: isActive
      });
    }
  }, []);
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
                  // eslint-disable-next-line react/prop-types
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

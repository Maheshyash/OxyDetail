import { useState, ChangeEvent, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { CustomeAutoSelect, Label, PhoneNumber } from '../components/styledComponents/InputBox.styles';
import LabelValue from '../components/LabelValue';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { CustomSwitch, ErrorMessage } from '../components/styledComponents/Common.styles';
import { toaster } from '../components/Toaster/Toaster';
import { isValidMail } from '../utils/common';
import { fetchRoleList, insertOrUpdateUser } from '../utils/APIActions';
import { categoryListType } from '../types/productTypes';
import timezones from '../Data/timezones.json';
import { Timezone } from '../types/timezoneTypes';
import Loader from '../components/Loader/Loader';
import FormActionsButtons from '../components/FormActionsButtons';
import { roleListArray, roleListItem } from '../types/roleTypes';
interface formDetailsType {
  name: string;
  emailId: string;
  mobileNo: string;
  roleId: roleListItem | null;
  category: categoryListType | null;
  photoName: string;
  isActive: boolean;
  timezone: Timezone | null;
  userId: number;
}
const AddOrEditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [roleList, setRoleList] = useState<roleListArray>([]);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    name: '',
    emailId: '',
    mobileNo: '',
    roleId: null,
    category: null,
    photoName: '',
    isActive: true,
    timezone: null,
    userId: 0
  });

  const handleFormDetails = (event: ChangeEvent<HTMLInputElement>, variable: string) => {
    setFormDetails({ ...formDetails, [variable]: event.target.value });
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, mobileNo: trimmedPhoneNumber });
  };

  const fetchRoleDetails = async () => {
    setIsLoader(true);
    await fetchRoleList()
      .then(res => {
        setRoleList(res);
        setIsLoader(false);
      })
      .catch(() => {
        alert('err');
        setIsLoader(false);
      });
  };

  const handleUserCreation = async () => {
    setIsSubmit(true);
    const isValidEmail = isValidMail(formDetails.emailId);

    if (
      !isValidEmail ||
      formDetails.name.trim() === '' ||
      formDetails.emailId.trim() === '' ||
      formDetails.mobileNo.trim() === '' ||
      formDetails.mobileNo.length < 10 ||
      !formDetails.roleId
    ) {
      return;
    }
    // let userDetails: any = getCookie('userDetails');
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      const { name, mobileNo, emailId, isActive, timezone, userId, roleId } = formDetails;
      const payload: any = {
        userId: location.state ? userId : 0,
        loginId: emailId,
        name: name,
        mobileNo: mobileNo,
        type: userDetails.type,
        emailId: emailId,
        password: '',
        passwordSalt: '',
        // orgId: userDetails.orgId,
        isActive: isActive,
        timeZoneId: timezone?.text,
        roleId: roleId.roleId,
        orgCode: userDetails.orgCode,
        categoryId: 0
      };

      setIsLoader(true);
      await insertOrUpdateUser(payload)
        .then(res => {
          if (res.statusCode == 0 || res.statusCode == 1) {
            toaster('success', res.statusMessage);
            setIsLoader(false);
            navigate(-1);
          } else {
            toaster('error', res.statusMessage);
            setIsLoader(false);
          }
        })
        .catch(err => {
          console.log(err, 'err');
          setIsLoader(false);
          toaster('error', 'something went wrong');
        });
    }
  };

  useEffect(() => {
    fetchRoleDetails();
  }, []);

  useEffect(() => {
    if (location.state) {
      const { name, emailId, mobileNo, timeZoneId, isActive, userId, roleId } = location.state.userDetails;
      setFormDetails({
        ...formDetails,
        name: name,
        emailId: emailId,
        roleId: getListDetails(roleId),
        mobileNo: mobileNo,
        timezone: getTimezoneDetails(timeZoneId),
        isActive: isActive,
        userId: userId
      });
    }
  }, [roleList]);

  const getListDetails = (roleId: number) => {
    const result = roleList.find(ele => ele.roleId === roleId);
    if (result) {
      return result;
    }
    return null;
  };

  const getTimezoneDetails = (timezoneId: string | number) => {
    const result: undefined | Timezone = timezones.find((ele: Timezone) => ele.text === timezoneId);
    if (result) {
      return result;
    }
    return null;
  };

  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Name"
            value={formDetails.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'name')}
            placeholder="Enter Name"
          />
          {formDetails.name.trim() === '' && isSubmit && <ErrorMessage>Please User Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Email Id"
            value={formDetails.emailId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'emailId')}
            placeholder="Enter Email Id"
          />
          {(formDetails.emailId.trim() === '' || !isValidMail(formDetails.emailId)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Phone Number</Label>
          <PhoneNumber
            value={formDetails.mobileNo}
            onChange={handlePhone}
            type="tel"
            placeholder="Enter Phone Number"
          ></PhoneNumber>
          {(formDetails.mobileNo.trim() === '' || formDetails.mobileNo.length < 10) && isSubmit && (
            <ErrorMessage>Please enter Phone Number</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Timezone</Label>
          <CustomeAutoSelect
            options={timezones}
            onChange={(event, data: Timezone | any) => {
              setFormDetails({ ...formDetails, timezone: data });
            }}
            getOptionLabel={(option: Timezone | any) => option.value}
            size="small"
            value={formDetails.timezone}
            renderInput={params => <TextField {...params} placeholder={'Select Timezone'} />}
          />
          {!formDetails.timezone && isSubmit && <ErrorMessage>Please select Timezone</ErrorMessage>}
        </Grid>
        <Grid item xs={3} md={3}>
          <Label>Role</Label>
          <CustomeAutoSelect
            options={roleList}
            value={formDetails.roleId}
            getOptionLabel={(option: roleListItem | any) => option.roleName}
            onChange={(event: any, data: roleListItem | any) => {
              setFormDetails({ ...formDetails, roleId: data });
            }}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Select Role'} />}
          />
          {!formDetails.roleId && isSubmit && <ErrorMessage>Please select role</ErrorMessage>}
        </Grid>
        {location.state && (
          <Grid item xs={12} md={3}>
            <Label>Is Active</Label>
            <CustomSwitch
              checked={formDetails.isActive}
              onChange={() =>
                setFormDetails(props => {
                  // eslint-disable-next-line react/prop-types
                  return { ...formDetails, isActive: !props.isActive };
                })
              }
            />
          </Grid>
        )}
      </Grid>
      <FormActionsButtons handleForm={handleUserCreation} />
    </BodyContainer>
  );
};

export default AddOrEditUser;

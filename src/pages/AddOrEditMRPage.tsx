import { useState, ChangeEvent, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  ActionButtonGroup,
  CustomButton,
  CustomeAutoSelect,
  Label,
  PhoneNumber
} from '../components/styledComponents/InputBox.styles';
import LabelValue from '../components/LabelValue';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { CustomSwitch, CustomeFileUpload, ErrorMessage, StyledInput } from '../components/styledComponents/Common.styles';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { FileSize } from '../Constants';
import { toaster } from '../components/Toaster/Toaster';
import { getCookie, updateFileName } from '../utils/common';
import { fetchCategoryList } from '../utils/APIs';
import { categoryListArray } from '../types/productTypes';
interface formDetailsType {
  mrName: string;
  email: string;
  phone: string;
  photo: File | null;
  role: any;
  category: any;
  photoName: string;
  isActive:boolean;
}
const AddOrEditMRPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    mrName: '',
    email: '',
    phone: '',
    photo: null,
    role: null,
    category: null,
    photoName: '',
    isActive:true
  });
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, mrName: e.target.value });
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, email: e.target.value });
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, phone: trimmedPhoneNumber });
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const filename = file.name;
    if (file.size > FileSize.IMAGEFILESIZE) {
      toaster('warning', 'Please Select Image file upto 1mb');
      return;
    }

    // updating fileName by appending a timestamp
    const newFileName = updateFileName(filename);
    const newFile = new File([file], newFileName, { type: file.type });
    setFormDetails({ ...formDetails, photo: newFile, photoName: newFileName });
  };
  const fetchCategoryDetails = async () => {
    setIsLoader(true);
    await fetchCategoryList()
      .then(res => {
        setCategoryList(res);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        setIsLoader(false);
      });
  };
  
  const handleButtonClick = () => {
    const photoElement = document.getElementById('Photo');
    photoElement?.click();
  };
  const handleUserCreation = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);
    const isValidEmail = isValidMail(formDetails.email);

    if (
      !isValidEmail ||
      formDetails.mrName.trim() === '' ||
      formDetails.email.trim() === '' ||
      formDetails.phone.trim() === '' ||
      formDetails.phone.length < 10 ||
      !formDetails.category ||
      !formDetails.role
    ) {
      return;
    }
    let userDetails: any = getCookie('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      const payload = {
        userId: userDetails.userId,
        loginId: formDetails.email,
        name: formDetails.mrName,
        mobileNo: formDetails.phone,
        type: userDetails.type,
        emailId: formDetails.email,
        password: 'string',
        passwordSalt: 'string',
        photo: formDetails.photo,
        orgId: 'string',
        isActive: formDetails.isActive,
        timeZoneId: 'string',
        roleId: formDetails.role.value
      };
    }
  };
  const isValidMail = (email: string) => {
    if (!email.trim()) return '';
    // const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return isValidEmail;
  };
  useEffect(()=>{
    fetchCategoryDetails();
  },[])
  return (
    <BodyContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue label="Name" value={formDetails.mrName} onChange={handleName} placeholder="Enter Name" />
          {formDetails.mrName.trim() === '' && isSubmit && <ErrorMessage>Please User Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue label="Email Id" value={formDetails.email} onChange={handleEmail} placeholder="Enter Email Id" />
          {(formDetails.email.trim() === '' || !isValidMail(formDetails.email)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Phone Number</Label>
          <PhoneNumber
            value={formDetails.phone}
            onChange={handlePhone}
            type="tel"
            placeholder="Enter Phone Number"
          ></PhoneNumber>
          {(formDetails.phone.trim() === '' || formDetails.phone.length < 10) && isSubmit && (
            <ErrorMessage>Please enter Phone Number</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Photo</Label>
          <CustomeFileUpload
            id="image-upload"
            type="text"
            readOnly
            value={formDetails.photoName}
            endAdornment={
              <IconButton color="primary" component="span" onClick={handleButtonClick}>
                <PhotoCamera />
              </IconButton>
            }
          />
          <StyledInput id="Photo" type="file" accept="image/*" onChange={handleFile} />
          {formDetails.photoName.trim() === '' && isSubmit && <ErrorMessage>Please select File</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Role</Label>
          <CustomeAutoSelect
            options={categoryList}
            onChange={(event, data) => {
              setFormDetails({ ...formDetails, role: data });
            }}
            getOptionLabel={option => option.categoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Select Role'} />}
          />
          {!formDetails.role && isSubmit && <ErrorMessage>Please select Role</ErrorMessage>}
        </Grid>
        <Grid item xs={3} md={3}>
          <Label>Product Category</Label>
          <CustomeAutoSelect
            options={categoryList}
            getOptionLabel={option => option.categoryName}
            onChange={(event, data) => {
              setFormDetails({ ...formDetails, category: data });
            }}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Select Product Category'} />}
          />
          {!formDetails.category && isSubmit && <ErrorMessage>Please select Product Category</ErrorMessage>}
        </Grid>
        {location.state && (
          <Grid item xs={12} md={3}>
            <Label>Is Active</Label>
            <CustomSwitch
              checked={formDetails.isActive}
              onChange={() =>
                setFormDetails(props => {
                  return { ...formDetails, isActive: !props.isActive };
                })
              }
            />
          </Grid>
        )}
      </Grid>
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleUserCreation}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
    </BodyContainer>
  );
};

export default AddOrEditMRPage;

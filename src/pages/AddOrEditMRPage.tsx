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
import {
  CustomSwitch,
  CustomeFileUpload,
  ErrorMessage,
  StyledInput
} from '../components/styledComponents/Common.styles';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { FileSize } from '../Constants';
import { toaster } from '../components/Toaster/Toaster';
import { isValidMail, updateFileName } from '../utils/common';
import { fetchCategoryList, insertOrUpdateUser } from '../utils/APIActions';
import { categoryListArray, categoryListType } from '../types/productTypes';
import timezones from '../Data/timezones.json';
import { Timezone } from '../types/timezoneTypes';
import Loader from '../components/Loader/Loader';
interface formDetailsType {
  mrName: string;
  email: string;
  phone: string;
  photo: File | null;
  role: number;
  category: categoryListType | null;
  photoName: string;
  isActive: boolean;
  timezone: Timezone | null;
  userId: number;
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
    role: 4,
    category: null,
    photoName: '',
    isActive: true,
    timezone: null,
    userId: 0
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

  const handleUserCreation = async (event: any) => {
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
    // let userDetails: any = getCookie('userDetails');
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      const { mrName, phone, email, isActive, timezone, category, userId } = formDetails;
      const payload: any = {
        userId: location.state ? userId : 0,
        loginId: email,
        name: mrName,
        mobileNo: phone,
        type: userDetails.type,
        emailId: email,
        password: '',
        passwordSalt: '',
        // photo: photo,
        orgId: userDetails.orgId,
        isActive: isActive,
        timeZoneId: timezone?.text,
        roleId: 4,
        orgCode: userDetails.orgId,
        categoryId: category.categoryId
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
    fetchCategoryDetails();
  }, []);
  useEffect(() => {
    if (location.state) {
      const { name, emailId, mobileNo, timeZoneId, isActive, userId, categoryId } = location.state.userDetails;
      setFormDetails({
        ...formDetails,
        mrName: name,
        email: emailId,
        category: getCategoryDetails(categoryId),
        phone: mobileNo,
        timezone: getTimezoneDetails(timeZoneId),
        isActive: isActive,
        userId: userId
      });
    }
  }, [categoryList]);
  const getCategoryDetails = (categoryId: number) => {
    let result = categoryList.find(ele => ele.categoryId === categoryId);
    if (result) {
      return result;
    }
    return null;
  };

  const getTimezoneDetails = (timezoneId: string | number) => {
    let result: undefined | Timezone = timezones.find((ele: Timezone) => ele.text === timezoneId);
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
        {/* <Grid item xs={12} md={3}>
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
        </Grid> */}
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
          <Label>Product Category</Label>
          <CustomeAutoSelect
            options={categoryList}
            value={formDetails.category}
            getOptionLabel={(option: categoryListType | any) => option.categoryName}
            onChange={(event: any, data: categoryListType | any) => {
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

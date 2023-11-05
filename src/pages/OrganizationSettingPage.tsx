import { ChangeEvent, useEffect, useState } from 'react';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { fetchOrganizationSettings, updateSettings } from '../utils/APIActions';
import { organizationSettings } from '../types/organizationTypes';
import { Grid, IconButton, TextField } from '@mui/material';
import LabelValue from '../components/LabelValue';
import { CustomButton, CustomeAutoSelect, Label, PhoneNumber } from '../components/styledComponents/InputBox.styles';
import { Timezone } from '../types/timezoneTypes';
import timezones from '../Data/timezones.json';
import dateformats from '../Data/dateformats.json';
import { CustomeFileUpload, ErrorMessage, FlexItemBetweenContent, StyledInput } from '../components/styledComponents/Common.styles';
import { isValidMail, updateFileName } from '../utils/common';
import { toaster } from '../components/Toaster/Toaster';
import { PhotoCamera } from '@mui/icons-material';
import { FileSize } from '../Constants';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import Loader from '../components/Loader/Loader';

export interface formDetailsType {
  orgSettingId: number;
  orgCode: string;
  language: string; //backend dropdown
  timeZone: Timezone | string;
  currency: string; // backend dropdown
  dateFormat: { label: string; value: string } | null;
  logo: string |any | null;
  logoName: string;
  pocName: string;
  pocContactNo: string;
  pocEmailId: string;
  designation: string;
  isActive: boolean;
}
const OrganizationSettingPage = () => {
  const [organizationDetails, setOrganizationDetials] = useState<organizationSettings | {}>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    orgSettingId: 0,
    orgCode: '',
    language: '',
    timeZone: '',
    currency: '',
    dateFormat: null,
    logo: null,
    logoName: '',
    pocName: '',
    pocContactNo: '',
    pocEmailId: '',
    designation: '',
    isActive: false
  });
  useEffect(() => {
    fetchSettingDetials();
  }, []);
  const fetchSettingDetials = async () => {
    setIsLoader(true);
    await fetchOrganizationSettings()
      .then(res => {
        setFormDetails({...res,dateFormat:{label:'DD/MM/YYYY', value:'DD/MM/YYYY'}});
        setIsLoader(false);
      })
      .catch(err => {console.log(err)
      setIsLoader(false);});
  };

  const handleFormDetails = (event: ChangeEvent<HTMLInputElement>, variableName: string) => {
    setFormDetails({ ...formDetails, [variableName]: event.target.value });
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>, variable: string) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, [variable]: trimmedPhoneNumber });
  };

  const handleFormSubmittion = async () => {
    if (formDetails.orgCode.trim() === "" || formDetails.language.trim() === "" || !formDetails.dateFormat || !formDetails.currency || formDetails.designation.trim()===""
      || formDetails.pocName.trim() === "" || formDetails.pocContactNo.length < 10 || !isValidMail(formDetails.pocEmailId)) {
      setIsSubmit(true);
      return;
    }
    
    setIsLoader(true);
    var formData = new FormData();
    formData.append('orgSettingId',String(formDetails.orgSettingId));
    formData.append("orgCode",formDetails.orgCode);
    formData.append("language",formDetails.language);
    formData.append("timeZone",formDetails.timeZone.text);
    formData.append('currency',formDetails.currency);
    formData.append('dateFormat',formDetails.dateFormat.value);
    formData.append('logo',formDetails.logo);
    formData.append('pocName',formDetails.pocName);
    formData.append('pocContactNo',formDetails.pocContactNo);
    formData.append('pocEmailId',formDetails.pocEmailId);
    formData.append('designation',formDetails.designation);
    formData.append('isActive','false');
    
    await updateSettings(formData).then(res => {
      if (res.statusCode == 0 || res.statusCode === 1) {
        toaster('success', res.statusMessage);
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    }).catch(res => {
      setIsLoader(false);
    })
  };

  const findoutIsStringOrFile = (file:any) => {
    return typeof(file) === 'string'|| file instanceof File;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const filename = file.name;
    if (file.size > FileSize.IMAGEFILESIZE) {
      toaster('warning', 'Please Select Image file upto 1mb');
      return;
    }

    // updating fileName by appending a timestamp
    const newFileName = updateFileName(filename);
    const newFile = new File([file], newFileName, { type: file.type });
    setFormDetails({ ...formDetails, logo: newFile, logoName: newFileName });
  };

  const handleButtonClick = () => {
    let imageInput = document.getElementById('image-upload-input');
    imageInput?.click();
  };

  console.log(formDetails,'formDetails')
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Organization Code"
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'orgCode')}
            value={formDetails.orgCode}
          />
          {formDetails.orgCode.trim() === "" && isSubmit && <ErrorMessage>Please enter Organization Code</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue label="Language" onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'language')} value={formDetails.language} />
          {formDetails.language.trim() === "" && isSubmit && <ErrorMessage>Please enter Organization Code</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Timezone</Label>
          <CustomeAutoSelect
            options={timezones}
            onChange={(event, data: Timezone | any) => {
              setFormDetails({ ...formDetails, timeZone: data });
            }}
            getOptionLabel={(option: Timezone | any) => option.value}
            size="small"
            value={formDetails.timeZone}
            renderInput={params => <TextField {...params} placeholder={'Select Timezone'} />}
          />
          {(!formDetails.timeZone || formDetails.timeZone == undefined) && isSubmit && <ErrorMessage>Please select Timezone</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Currency"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleFormDetails(event, 'currency');
            }}
            value={formDetails.currency}
          />
          {!formDetails.currency && isSubmit && <ErrorMessage>Please select Currency</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Date Formats</Label>
          <CustomeAutoSelect
            options={dateformats}
            // onChange={(event, data) => {
            //   setFormDetails({ ...formDetails, dateFormat: data });
            // }}
            getOptionLabel={option => option.value}
            size="small"
            // value={formDetails.dateFormat}
            value={dateformats[0]}
            disabled
            renderInput={params => <TextField {...params} placeholder={'Select Date Format'} />}
          />
          {!formDetails.dateFormat && isSubmit && <ErrorMessage>Please select Date Format</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Designation"
            value={formDetails.designation}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'designation')}
            placeholder="Enter Designation"
          />
          {formDetails.designation.trim() === '' && isSubmit && <ErrorMessage>Please enter Designation</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Logo</Label>
          {!findoutIsStringOrFile(formDetails.logo) ?<>
          
            <CustomeFileUpload
            id="image-upload"
            type="text"
            readOnly
            value={formDetails.logoName}
            endAdornment={
              <IconButton color="primary" component="span" onClick={handleButtonClick}>
                <PhotoCamera />
              </IconButton>
            }
          />
          <StyledInput
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          </>:<Stack spacing={2} direction={"row"}>
              <Avatar alt="Remy Sharp" src= {(formDetails.logo) instanceof File ? URL.createObjectURL(formDetails.logo):formDetails.logo}/>
              <ClearIcon onClick ={()=> setFormDetails({...formDetails, logo:null, logoName:''})}></ClearIcon>
            </Stack>}
          {formDetails.logoName === '' && isSubmit && (
            <ErrorMessage>Please enter Attribute Name</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12}>
          <FlexItemBetweenContent>
            <h5>Point Of Contact</h5>
          </FlexItemBetweenContent>
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Name"
            value={formDetails.pocName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'pocName')}
            placeholder="Enter Point Of Contact Name"
          />
          {formDetails.pocName.trim() === '' && isSubmit && (
            <ErrorMessage>Please enter Point Of Contact Name</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Email Id"
            value={formDetails.pocEmailId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'pocEmailId')}
            placeholder="Enter Email Id"
          />
          {(formDetails.pocEmailId.trim() === '' || !isValidMail(formDetails.pocEmailId)) && isSubmit && (
            <ErrorMessage>Please enter valid Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Contact Number</Label>
          <PhoneNumber
            value={formDetails.pocContactNo}
            // onChange={handlePhone}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handlePhone(event, 'pocContactNo')}
            type="tel"
            placeholder="Enter Contact Number"
          ></PhoneNumber>
          {(formDetails.pocContactNo.trim() === '' || formDetails.pocContactNo.length < 10) && isSubmit && (
            <ErrorMessage>Please enter Contact Number</ErrorMessage>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomButton variant="contained" onClick={handleFormSubmittion}>
          Submit{' '}
        </CustomButton>
      </Grid>
    </BodyContainer>
  );
};

export default OrganizationSettingPage;

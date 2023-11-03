import { ChangeEvent, useEffect, useState } from 'react';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { fetchOrganizationSettings, updateSettings } from '../utils/APIActions';
import { organizationSettings } from '../types/organizationTypes';
import { Grid, TextField } from '@mui/material';
import LabelValue from '../components/LabelValue';
import { CustomButton, CustomeAutoSelect, Label, PhoneNumber } from '../components/styledComponents/InputBox.styles';
import { Timezone } from '../types/timezoneTypes';
import timezones from '../Data/timezones.json';
import dateformats from '../Data/dateformats.json';
import { CustomSwitch, ErrorMessage, FlexItemBetweenContent } from '../components/styledComponents/Common.styles';
import { isValidMail } from '../utils/common';
import { useLocation } from 'react-router-dom';
import { toaster } from '../components/Toaster/Toaster';

export interface formDetailsType {
  orgSettingId: number;
  orgCode: string;
  language: string; //backend dropdown
  timeZone: string;
  currency: string; // backend dropdown
  dateFormat: { label: string; value: string } | null;
  logo: File | null;
  logoName: string;
  pocName: string;
  pocContactNo: string;
  pocEmailId: string;
  designation: string;
  isActive: boolean;
}
const OrganizationSettingPage = () => {
  const [organizationDetails, setOrganizationDetials] = useState<organizationSettings | {}>({});
  const location = useLocation();
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
    await fetchOrganizationSettings()
      .then(res => {
        setFormDetails(res);
      })
      .catch(err => console.log(err));
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
    const payload = {}
    setIsLoader(true);
    await updateSettings(payload).then(res=>{
        if( res.statusCode==0 || res.statusCode ===1 ){
            toaster('success',res.statusMessage);
            setIsLoader(false);
        }else{
            setIsLoader(false);
        }
    }).catch(res=>{
        setIsLoader(false);
    })
  };
  return (
    <BodyContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelValue
            label="Organization Code"
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'designation')}
            value={formDetails.orgCode}
          />
        </Grid>
        <Grid item xs={12}>
          <LabelValue label="Language" onChange={() => {}} value={formDetails.language} />
        </Grid>
        <Grid item xs={12}>
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
          {!formDetails.timeZone && isSubmit && <ErrorMessage>Please select Timezone</ErrorMessage>}
        </Grid>
        <Grid item xs={12}>
          <LabelValue
            label="Currency"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleFormDetails(event, 'currency');
            }}
            value={formDetails.currency}
          />
        </Grid>
        <Grid item xs={12}>
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
          {!formDetails.timeZone && isSubmit && <ErrorMessage>Please select Date Format</ErrorMessage>}
        </Grid>
        <Grid item xs={12}>
          <LabelValue
            label="Designation"
            value={formDetails.designation}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'designation')}
            placeholder="Enter Designation"
          />
          {formDetails.designation.trim() === '' && isSubmit && <ErrorMessage>Please enter Designation</ErrorMessage>}
        </Grid>
        {location.state && (
          <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FlexItemBetweenContent>
            <h5>Point Of Contact</h5>
          </FlexItemBetweenContent>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <LabelValue
            label="Email Id"
            value={formDetails.pocEmailId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'pocEmailId')}
            placeholder="Enter Email Id"
          />
          {(formDetails.pocEmailId.trim() === '' || !isValidMail(formDetails.pocEmailId)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12}>
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
      <Grid item xs={12}>
        <CustomButton variant="contained" onClick={handleFormSubmittion}>
          Submit{' '}
        </CustomButton>
      </Grid>
    </BodyContainer>
  );
};

export default OrganizationSettingPage;

import React, { ChangeEvent, useEffect, useState } from 'react';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Loader from '../components/Loader/Loader';
import { Grid, TextField } from '@mui/material';
import LabelValue from '../components/LabelValue';
import { CustomTextArea, ErrorMessage } from '../components/styledComponents/Common.styles';
import { CustomeAutoSelect, Label, PhoneNumber } from '../components/styledComponents/InputBox.styles';
import { countryListItem, countryListArray, stateListArray, stateListItem } from '../types/organizationTypes';
import { fetchCoutryListDetails, fetchStateListDetails } from '../utils/APIActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { isValidMail } from '../utils/common';

interface formDetailsType {
  orgId: number;
  orgCode: string;
  orgName: string;
  planId: number;
  activationDate: string;
  countryCode: countryListItem | null;
  stateCode: stateListItem | null;
  address: string;
  numberOfUser: number;
  gstnNo: string;
  contactNo: string;
  emailId: string;
  pocName: string;
  pocContactNo: string;
  pocEmailId: string;
  isActive: boolean;
  forceUpdateIfExists: boolean;
}
const AddOrEditOrganization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [countryList, setCountryList] = useState<countryListArray>([]);
  const [stateList, setStateList] = useState<stateListArray>([]);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    orgId: 0,
    orgCode: '',
    orgName: '',
    planId: 0,
    activationDate: '',
    countryCode: null,
    stateCode: null,
    address: '',
    numberOfUser: 0,
    gstnNo: '',
    contactNo: '',
    emailId: '',
    pocName: '',
    pocContactNo: '',
    pocEmailId: '',
    isActive: true,
    forceUpdateIfExists: false
  });
  const handleFormDetails = (event: ChangeEvent<HTMLInputElement>, variable: string) => {
    setFormDetails({ ...formDetails, [variable]: event.target.value });
  };
  const fetchStateDetails = async (countryCode: string) => {
    await fetchStateListDetails(countryCode)
      .then(res => {
        setStateList(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchCountryDetails = async () => {
    await fetchCoutryListDetails()
      .then(res => {
        setCountryList(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCountryDetails();
    if (location.state) {
    }
  }, []);
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, contactNo: trimmedPhoneNumber });
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, emailId: e.target.value });
  };
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Organization Code"
            value={formDetails.orgCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'orgCode')}
            placeholder="Enter Organization Code"
          />
          {formDetails.orgCode.trim() === '' && isSubmit && <ErrorMessage>Please enter Organization Code</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Organization Name"
            value={formDetails.orgCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'orgName')}
            placeholder="Enter Organization Name"
          />
          {formDetails.orgName.trim() === '' && isSubmit && <ErrorMessage>Please enter Organization Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Country</Label>
          <CustomeAutoSelect
            options={countryList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
              setFormDetails({ ...formDetails, countryCode: data, stateCode: null });
              fetchStateDetails(data.categoryId);
            }}
            value={formDetails.countryCode}
            getOptionLabel={(option: countryListItem | any) => option.countryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {formDetails.orgName.trim() === '' && isSubmit && <ErrorMessage>Please select Country</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>State</Label>
          <CustomeAutoSelect
            options={stateList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
              setFormDetails({ ...formDetails, stateCode: data });
            }}
            value={formDetails.stateCode}
            getOptionLabel={(option: stateListItem | any) => option.stateName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {formDetails.orgName.trim() === '' && isSubmit && <ErrorMessage>Please select State</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="No of Users"
            value={formDetails.numberOfUser}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'numberOfUser')}
            placeholder="Enter No of Users"
          />
          {formDetails.address.trim() === '' && isSubmit && <ErrorMessage>Please enter No of Users</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="GST Number"
            value={formDetails.gstnNo}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'gstnNo')}
            placeholder="Enter GST Number"
          />
          {formDetails.gstnNo.trim() === '' && isSubmit && <ErrorMessage>Please enter valid GST Number</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Contact Number</Label>
          <PhoneNumber
            value={formDetails.contactNo}
            onChange={handlePhone}
            type="tel"
            placeholder="Enter Contact Number"
          ></PhoneNumber>
          {(formDetails.contactNo.trim() === '' || formDetails.contactNo.length < 10) && isSubmit && (
            <ErrorMessage>Please enter Contact Number</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Email Id"
            value={formDetails.emailId}
            onChange={handleEmail}
            placeholder="Enter Email Id"
          />
          {(formDetails.emailId.trim() === '' || !isValidMail(formDetails.emailId)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Address</Label>
          <CustomTextArea
            minRows={4}
            maxRows={4}
            value={formDetails.address}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormDetails({ ...formDetails, address: e.target.value })
            }
          />
          {formDetails.address.trim() === '' && isSubmit && <ErrorMessage>Please enter Address</ErrorMessage>}
        </Grid>
      </Grid>
    </BodyContainer>
  );
};

export default AddOrEditOrganization;

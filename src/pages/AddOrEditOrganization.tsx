import React, { ChangeEvent, useEffect, useState } from 'react';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Loader from '../components/Loader/Loader';
import { Grid, TextField } from '@mui/material';
import LabelValue from '../components/LabelValue';
import {
  CustomDatepicker,
  CustomSwitch,
  CustomTextArea,
  DatePickerContainer,
  ErrorMessage,
  FlexItemBetweenContent
} from '../components/styledComponents/Common.styles';
import { CustomeAutoSelect, Label, PhoneNumber } from '../components/styledComponents/InputBox.styles';
import {
  countryListItem,
  countryListArray,
  stateListArray,
  stateListItem,
  plansListArray,
  planItem
} from '../types/organizationTypes';
import {
  fetchCoutryListDetails,
  fetchPlansList,
  fetchStateListDetails,
  insertOrUpdateOrganization
} from '../utils/APIActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { isValidMail } from '../utils/common';
import { toaster } from '../components/Toaster/Toaster';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormActionsButtons from '../components/FormActionsButtons';
import CustomModal from '../components/CustomModal';

interface formDetailsType {
  orgId: number;
  orgCode: string;
  orgName: string;
  planId: planItem | null;
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
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [countryList, setCountryList] = useState<countryListArray>([]);
  const [plansList, setPlansList] = useState<plansListArray>([]);
  const [stateList, setStateList] = useState<stateListArray>([]);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    orgId: 0,
    orgCode: '',
    orgName: '',
    planId: null,
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
  const fetchPlansDetails = async () => {
    await fetchPlansList().then(res => {
      setPlansList(res);
    });
  };
  useEffect(() => {
    fetchCountryDetails();
    fetchPlansDetails();
  }, []);
  useEffect(() => {
    if (location.state) {
      const {
        activationDate,
        address,
        contactNo,
        countryCode,
        countryName,
        emailId,
        gstnNo,
        isActive,
        numberOfUser,
        orgCode,
        orgId,
        orgName,
        planId,
        planName,
        pocContactNo,
        pocEmailId,
        pocName,
        stateCode,
        stateName
      } = location.state.organizationDetails;
      fetchStateDetails(countryCode);
      setFormDetails({
        ...formDetails,
        activationDate: activationDate,
        address: address,
        contactNo: contactNo,
        countryCode: { countryCode: countryCode, countryName: countryName },
        stateCode: { stateCode: stateCode, stateName: stateName },
        emailId: emailId,
        gstnNo: gstnNo,
        isActive: isActive,
        numberOfUser: numberOfUser,
        orgCode: orgCode,
        orgId: orgId,
        orgName: orgName,
        planId: { planId: planId, planName: planName },
        pocContactNo: pocContactNo,
        pocEmailId: pocEmailId,
        pocName: pocName,
        forceUpdateIfExists: true
      });
    }
  }, []);

  const handlePhone = (e: ChangeEvent<HTMLInputElement>, variable: string) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, [variable]: trimmedPhoneNumber });
  };
  const isValidFields = (): boolean => {
    const {
      activationDate,
      address,
      contactNo,
      pocContactNo,
      stateCode,
      countryCode,
      emailId,
      gstnNo,
      orgCode,
      orgName,
      planId,
      pocEmailId,
      pocName
    } = formDetails;
    if (
      activationDate.trim() === '' ||
      formDetails.activationDate === 'Invalid Date' ||
      address.trim() === '' ||
      contactNo.trim() === '' ||
      pocContactNo.trim() === '' ||
      emailId.trim() === '' ||
      !isValidMail(emailId) ||
      pocEmailId.trim() === '' ||
      !isValidMail(pocEmailId) ||
      gstnNo.trim() === '' ||
      orgCode.trim() === '' ||
      orgName.trim() === '' ||
      pocName.trim() === '' ||
      !stateCode ||
      !countryCode ||
      !planId
    ) {
      return false;
    }
    return true;
  };

  const handleSubmittion = async (isForceUpdate = false) => {
    const payload = {
      ...formDetails,
      countryCode: formDetails.countryCode?.countryCode,
      stateCode: formDetails.stateCode?.stateCode,
      planId: formDetails.planId?.planId,
      forceUpdateIfExists: location.state ? true : isForceUpdate
    };
    const isValid = isValidFields();
    if (!isValid) {
      setIsSubmit(true);
      return;
    }
    setIsLoader(true);
    await insertOrUpdateOrganization(payload)
      .then(res => {
        const { statusCode, statusMessage } = res;
        if (statusCode == 0 || statusCode === 1) {
          toaster('success', statusMessage);
          setIsLoader(false);
          navigate(-1);
        } else if (statusCode === -1) {
          setIsConfirmPopUp(true);
          setIsLoader(false);
        } else {
          toaster('error', statusMessage);
        }
      })
      .catch(err => {
        console.log(err, 'err');
        setIsLoader(false);
      });
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
            value={formDetails.orgName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'orgName')}
            placeholder="Enter Organization Name"
          />
          {formDetails.orgName.trim() === '' && isSubmit && <ErrorMessage>Please enter Organization Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Country</Label>
          <CustomeAutoSelect
            options={countryList}
            onChange={(_event: React.SyntheticEvent<Element, Event>, data: countryListItem | any) => {
              setFormDetails({ ...formDetails, countryCode: data, stateCode: null });
              fetchStateDetails(data.countryCode);
            }}
            value={formDetails.countryCode}
            getOptionLabel={(option: countryListItem | any) => option.countryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {!formDetails.countryCode && isSubmit && <ErrorMessage>Please select Country</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>State</Label>
          <CustomeAutoSelect
            options={stateList}
            onChange={(_event: React.SyntheticEvent<Element, Event>, data: any) => {
              setFormDetails({ ...formDetails, stateCode: data });
            }}
            value={formDetails.stateCode}
            getOptionLabel={(option: stateListItem | any) => option.stateName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {!formDetails.stateCode && isSubmit && <ErrorMessage>Please select State</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="No of Users"
            type="number"
            value={formDetails.numberOfUser}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const inputNumber = event.target.value;
              if (Number(inputNumber) >= 0) {
                setFormDetails({ ...formDetails, numberOfUser: Number(inputNumber) });
              }
            }}
            placeholder="Enter No of Users"
          />
          {/* {formDetails.address.trim() === '' && isSubmit && <ErrorMessage>Please enter No of Users</ErrorMessage>} */}
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
            // onChange={handlePhone}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handlePhone(event, 'contactNo')}
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormDetails(event, 'emailId')}
            placeholder="Enter Email Id"
          />
          {(formDetails.emailId.trim() === '' || !isValidMail(formDetails.emailId)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Activation Date</Label>
          <DatePickerContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatepicker
                format="DD/MM/YYYY"
                minDate={dayjs()}
                value={formDetails.activationDate ? dayjs(formDetails.activationDate) : null}
                onChange={(date: any) =>
                  setFormDetails({ ...formDetails, activationDate: dayjs(date).format('YYYY-MM-DD') })
                }
                slotProps={{
                  textField: { size: 'small' },
                  field: {
                    clearable: true,
                    onClear: () => {
                      setFormDetails({ ...formDetails, activationDate: '' });
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </DatePickerContainer>
          {(formDetails.activationDate.trim() === '' || formDetails.activationDate === 'Invalid Date') && isSubmit && (
            <ErrorMessage>Please select Activation Date</ErrorMessage>
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
        <Grid item xs={12} md={3}>
          <Label>Plan</Label>
          <CustomeAutoSelect
            options={plansList}
            onChange={(_event: React.SyntheticEvent<Element, Event>, data: planItem | any) => {
              setFormDetails({ ...formDetails, planId: data });
            }}
            value={formDetails.planId}
            getOptionLabel={(option: planItem | any) => option.planName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {!formDetails.planId && isSubmit && <ErrorMessage>Please select Plan</ErrorMessage>}
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
            placeholder="Enter Organization Name"
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
            <ErrorMessage>Please enter Email Id</ErrorMessage>
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
      <FormActionsButtons handleForm={handleSubmittion} />

      {isConfirmPopUp && (
        <CustomModal
          handleForm={() => {
            handleSubmittion(true);
            setIsConfirmPopUp(false);
          }}
          handleCancel={() => setIsConfirmPopUp(false)}
          heading="Confirm Popup"
          subText="Are you sure you want to continue to update the existing Organization."
        />
      )}
    </BodyContainer>
  );
};

export default AddOrEditOrganization;

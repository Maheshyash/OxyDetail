import { BodyContainer } from '../components/styledComponents/Body.styles';
import { ActionButtonGroup, CustomButton, Label } from '../components/styledComponents/InputBox.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import LabelValue from '../components/LabelValue';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  CustomSwitch,
  CustomeFileUpload,
  ErrorMessage,
  StyledInput
} from '../components/styledComponents/Common.styles';
import { insertOrUpdateAttributes } from '../utils/APIActions';
import { toaster } from '../components/Toaster/Toaster';
import { updateFileName } from '../utils/common';
import { FileSize } from '../Constants';
interface formDetailsType {
  AttributeName: string;
  AttributeIconUpload: any;
  IsActive: boolean;
}
const AddOrEditAttributes = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    AttributeName: '',
    AttributeIconUpload: '',
    IsActive: true
  });
  const [fileName, setFileName] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleAttribute = (event: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, AttributeName: event.target.value });
  };
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
    setFileName(newFileName);
    setFormDetails({ ...formDetails, AttributeIconUpload: newFile });
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const options = [
    { label: 'true', value: true },
    { label: 'false', value: false }
  ];
  useEffect(() => {
    if (location?.state) {
      const { attributeDetails } = location.state;
      setFormDetails({
        ...formDetails,
        AttributeName: attributeDetails.attributeName,
        IsActive: attributeDetails.isActive,
        AttributeIconUpload: ''
      });
      // setFileName(attributeDetails.)
    }
  }, []);
  const handleAddOrUpdateAttribute = async e => {
    debugger;
    e.preventDefault();
    if ((fileName.trim() === '' && !location.state) || formDetails.AttributeName.trim() === '') {
      setIsSubmit(true);
      return;
    }

    console.log(formDetails, 'formDetails');
    const formData = new FormData();
    formData.append('AttributeName', formDetails.AttributeName);
    formData.append('AttributeIconUpload', formDetails.AttributeIconUpload);
    formData.append('IsActive', formDetails.IsActive);
    console.log(formData, 'formdata');
    if (location.state?.attributeDetails) {
      formData.append('AttributeId', location.state.attributeDetails.attributeId);
    }
    await insertOrUpdateAttributes(formData)
      .then(res => {
        if (res.statusCode === 1 || res.statusCode === 0) {
          toaster('success', res.statusMessage);
          navigate(-1);
        } else {
          toaster('error', res.statusMessage);
        }
      })
      .catch(err => {
        toaster('error', 'Something went wrong');
      });
  };
  return (
    <BodyContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Attribute Name"
            value={formDetails.AttributeName}
            onChange={handleAttribute}
            placeholder="Enter Attribute Name"
          />
          {formDetails.AttributeName.trim() === '' && isSubmit && (
            <ErrorMessage>Please enter Attribute Name</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Attribute Icon</Label>
          <CustomeFileUpload
            id="image-upload"
            type="text"
            readOnly
            value={fileName}
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
            ref={fileInputRef}
          />
          {fileName.trim() === '' && !location.state && isSubmit && (
            <ErrorMessage>Please enter Attribute Name</ErrorMessage>
          )}
        </Grid>
        {location.state?.attributeDetails && (
          <Grid item xs={12} md={3}>
            <Label>IsActive</Label>
            <CustomSwitch
              checked={formDetails.IsActive}
              onChange={() =>
                setFormDetails(props => {
                  return { ...formDetails, IsActive: !props.IsActive };
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
        <CustomButton variant="contained" onClick={handleAddOrUpdateAttribute}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
    </BodyContainer>
  );
};

export default AddOrEditAttributes;

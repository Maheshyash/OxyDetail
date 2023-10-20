import { BodyContainer } from '../components/styledComponents/Body.styles';
import {
  ActionButtonGroup,
  CustomButton,
  CustomeAutoSelect,
  Label,
  PhoneNumber
} from '../components/styledComponents/InputBox.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import LabelValue from '../components/LabelValue';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { StyledInput } from '../components/styledComponents/Common.styles';
import { TextField } from '@mui/material';
import { insertOrUpdateAttributes } from '../utils/APIs';
const AddOrEditAttributes = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formDetails, setFormDetails] = useState({ AttributeName: '', AttributeIconUpload: '', IsActive: true });
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();
  const handleAttribute = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, AttributeName: e.target.value });
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    const filename = file.name;
    setFileName(filename);

    if (file) {
      // You can perform additional validation here if needed
      console.log(`Selected file: ${file.name}`);
      setFormDetails({...formDetails, AttributeIconUpload:file})
    }
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
  useEffect(()=>{
    console.log(location.state,'location.state')
    if(location?.state){
      const {attributeDetails} = location.state
      setFormDetails({...formDetails, AttributeName:attributeDetails.attributeName,IsActive:attributeDetails.isActive })
      // setFileName(attributeDetails.)
    }
  },[])
  const handleAddOrUpdateAttribute = async (e) => {
    e.preventDefault();
    console.log(formDetails,'formDetails')
    const formData = new FormData()
    formData.append('AttributeName', formDetails.AttributeName)
    formData.append('AttributeIconUpload', formDetails.AttributeIconUpload)
    formData.append('IsActive',formDetails.IsActive);
    console.log(formData,'formdata')
    await insertOrUpdateAttributes(formData).then(res=>console.log(res,'res')).catch(err=> console.log(err,'err'))
  };
  const getDefaultIsActiveValue = (value) => {
    console.log(value,)
      const result = options.find(ele=> ele.value === value)
      if(result){
        return result;
      }else{
        return {}
      }
  }
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Attribute Icon</Label>
          <Input
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>IsActive</Label>
          <CustomeAutoSelect
            options={options}
            onChange={(event, data) => {
              setFormDetails({...formDetails, IsActive:data.value});
              console.log(data,'data')
            }}
            value={getDefaultIsActiveValue(formDetails.IsActive)}
            getOptionLabel={option => option.label}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
        </Grid>
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

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import { Label } from '../components/styledComponents/InputBox.styles';
import { CustomMultiSelect, CustomeFileUpload, StyledInput } from '../components/styledComponents/Common.styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const AttributeMappingPage = () => {
  const location = useLocation();
  const [array, setArray] = useState<Array<{ Image: any; ImageName: string; Audio: any; AudioName: string }> | []>([]);
  const fileRefs = Array.from({ length: location.state.attributeDetails.length }, () =>
    Array(5)
      .fill(null)
      .map(() => useRef(null))
  );

  const audioRefs = Array.from({ length: location.state.attributeDetails.length }, () =>
    Array(5)
      .fill(null)
      .map(() => useRef(null))
  );

  useEffect(() => {
    if (location.state) {
      //  fileRef = location.state.attributeDetails.map(() => React.createRef());
      console.log(location.state.attributeDetails, 'attributeDetails');
    }
  }, []);
  const handleAddAdditionalAttributeFiles = () => {
    console.log('hii');
    setArray([...array, { Image: '', ImageName: '', Audio: '', AudioName: '' }]);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const filename = file.name;
    setArray(prevArray => {
      const newArray = [...prevArray];
      if (!newArray[index]) {
        newArray[index] = { ImageName: filename, Image: file, AudioName: '', Audio: null };
      } else {
        newArray[index].ImageName = filename;
        newArray[index].Image = file;
      }
      return newArray;
    });
    // setFileName(filename);

    if (file) {
      // You can perform additional validation here if needed
      console.log(`Selected file: ${file.name}`);
      //   setFormDetails({ ...formDetails, AttributeIconUpload: file });
    }
  };
  console.log(array, 'array');
  const handleButtonClick = index => {
    fileRefs[0][index].current.click();
  };
  const handleAudioFiles = (event, index) => {};
  const handleAudioFileChange = (event, index) => {
    audioRefs[0][index].current.click();
  };
  const removeItem = index => {
    const dummyArray = JSON.parse(JSON.stringify(array));
    dummyArray.splice(index, 1);
    setArray(dummyArray);
  };
  return (
    <BodyContainer>
        {/* <Grid item xs={12} md={3}>
          <Label>Product Attributes</Label>
          <CustomMultiSelect
            hasSelectAll={false}
            options={attributeList}
            value={selected}
            onChange={(data: Array<attributeTypes>) => {
              if (data.length <= 5) {
                setSelected(data);
              }
            }}
            labelledBy="Select"
          />
        </Grid> */}
      <button onClick={handleAddAdditionalAttributeFiles}>Add</button>
      {array.map((ele, index) => {
        return (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} md={3}>
              <Label>Attribute Image</Label>
              <CustomeFileUpload
                id="image-upload"
                type="text"
                readOnly
                // value={fileName}
                endAdornment={
                  <IconButton color="primary" component="span" onClick={() => handleButtonClick(index)}>
                    <PhotoCamera />
                  </IconButton>
                }
              />
              <StyledInput
                id="image-upload-input"
                type="file"
                accept="image/*"
                onChange={e => handleFileChange(event, index)}
                ref={fileRefs[0][index]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Label>Attribute Audio</Label>
              <CustomeFileUpload
                id="image-upload"
                type="text"
                readOnly
                // value={fileName}
                endAdornment={
                  <IconButton color="primary" component="span" onClick={event => handleAudioFileChange(event, index)}>
                    <AudioFileIcon />
                  </IconButton>
                }
              />
              <StyledInput
                id="image-upload-input"
                type="file"
                accept="audio/*"
                onChange={event => handleAudioFiles(event, index)}
                ref={audioRefs[0][index]}
              />
            </Grid>
            <Grid item xs={3}>
              <RemoveCircleIcon onClick={() => removeItem(index)} color='red'/>

            </Grid>
          </Grid>
        );
      })}
    </BodyContainer>
  );
};

export default AttributeMappingPage;

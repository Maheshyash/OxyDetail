import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import { ActionButtonGroup, CustomButton, Label } from '../components/styledComponents/InputBox.styles';
import {
  CustomeFileUpload,
  FlexItemBetweenContent,
  StyledInput
} from '../components/styledComponents/Common.styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { fetchAttributeList, insertOrUpdateDataMapping } from '../utils/APIs';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { toaster } from '../components/Toaster/Toaster';
import { FileSize } from '../Constants';
interface attributeTypes {
  label: string;
  value: number;
}

export type listItemArrayInterface = listItem[] | [];

export interface listItem {
  productCode: string;
  attributeId: number;
  media: listItemMedia[] | [];
}

export interface listItemMedia {
  productCode: string;
  attributeId: number;
  productAttributeOrder: number;
  image: string|any;
  oldImage: any;
  voice: string|any;
  imageName?:string;
  voiceName?:string;
  oldVoice: any;
  isDeleted: any;
}
const AttributeMappingPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [attributeListArray, setAttributeListArray] = useState<listItemArrayInterface>([]);
  const [attributeList, setAttributeList] = useState<Array<attributeTypes> | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
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
      location.state.attributeDetails;
      setAttributeListArray(location.state.attributeDetails);
    }
  }, []);

  const handleAddAdditionalAttributeFiles = (productCode: string, attributeId: number, listItemIndex: number) => {
    setAttributeListArray(prevArray => {
      const newArray = [...prevArray];
      if (newArray[listItemIndex].media.length < 5) {
        newArray[listItemIndex].media = [
          ...newArray[listItemIndex].media,
          {
            productCode: productCode,
            attributeId: attributeId,
            productAttributeOrder: newArray[listItemIndex].media.length + 1,
            image: '',
            oldImage: '',
            voice: '',
            oldVoice: '',
            isDeleted: false
          }
        ];
      }
      return newArray;
    });
  };

  const handleImageIconClick = (listItemIndex: number, index: number) => {
    fileRefs[listItemIndex][index].current.click();
  };

  const handleAudioIconClick = (event, listItemIndex: number, index: number) => {
    audioRefs[listItemIndex][index].current.click();
  };

  const handleFileChange = (e, listItemIndex: number, index: number) => {
    const file = e.target.files[0];
    const filename = file.name;
    const currentTimestamp = new Date().getTime();
    if (file.size > FileSize.IMAGEFILESIZE) {
      // Display an error message or take appropriate action for oversized image.
      toaster('warning','Please Select Image file upto 1mb')
      return;
    }
    const parts = filename.split(/(\.[^.]+)$/);
    const fileNameWithoutExtension = parts[0]; // Get the file name without extension
    const fileExtension = parts[1]; // Get the file extension

    // Create a new name by appending a timestamp
    const newFileName = `${fileNameWithoutExtension}_${currentTimestamp}${fileExtension}`;
    // const newFileName = `${filename}_${currentTimestamp}`;
    const newFile = new File([file], newFileName, { type: file.type });
    setAttributeListArray(prevArray => {
      var newArray:listItemArrayInterface = [...prevArray];
      if (!newArray[listItemIndex].media[index]) {
        newArray[listItemIndex].media[index] = {...newArray[listItemIndex].media[index], imageName: newFileName, image: newFile }; 
      } else {
        newArray[listItemIndex].media[index].imageName = newFileName;
        newArray[listItemIndex].media[index].image = newFile;
      }

      return newArray;
    });
  };

  const handleAudioFiles = (event: ChangeEvent<HTMLInputElement>, listItemIndex: number, index: number) => {
    const file = event.target.files[0];
    const filename =  file.name;
    const currentTimestamp = new Date().getTime();
    if (file.size > FileSize.AUDIOFILESIZE) {
      // Display an error message or take appropriate action for oversized image.
      toaster('warning','Please Select Audio file upto 1mb')
      return;
    }
    const parts = filename.split(/(\.[^.]+)$/);
    const fileNameWithoutExtension = parts[0]; // Get the file name without extension
    const fileExtension = parts[1]; // Get the file extension

    // Create a new name by appending a timestamp
    const newFileName = `${fileNameWithoutExtension}_${currentTimestamp}${fileExtension}`;

    // const newFileName = `${filename}_${currentTimestamp}`;
    const newFile = new File([file], newFileName, { type: file.type });
    setAttributeListArray(prevArray => {
      const newArray = [...prevArray];
      if (!newArray[listItemIndex].media[index]) {
        newArray[listItemIndex].media[index] = {...newArray[listItemIndex].media[index], voiceName: newFileName, voice: newFile}; //...newArray[index], imageName: filename, Image: file };
      } else {
        newArray[listItemIndex].media[index].voiceName = newFileName;
        newArray[listItemIndex].media[index].voice = newFile;
      }

      return newArray;
    });
  };

  const removeItem = (listItemIndex: number, index: number) => {
    var dummyArray: listItemArrayInterface = JSON.parse(JSON.stringify(attributeListArray));
    dummyArray[listItemIndex].media[index] = { ...dummyArray[listItemIndex].media[index], isDeleted: true };
    setAttributeListArray(dummyArray);
  };

  const handleMediaMappingSubmittion = async (e:any) => {
    e.preventDefault();
    const ProductCode = location.state.attributeDetails[0].productCode;
    const Data = {
      productCode: ProductCode,
      Media: attributeListArray.flatMap(ele =>
        ele.media.map(ele1 => ({
          AttributeId: ele1.attributeId,
          Image: ele1.imageName,
          Voice: ele1.voiceName,
          ProductAttributeOrder: ele1.productAttributeOrder,
          OldImage: ele1.oldImage,
          OldVoice: ele1.oldVoice,
          IsDeleted: ele1.isDeleted
        }))
      )
    };
    console.log(Data, 'data');

    var formData = new FormData();
    formData.append('Data', JSON.stringify(Data));
    attributeListArray.map((ele: any, eleIndex: number) =>
      ele.media.map((ele1: any, index: number) => {
        return formData.append(`${ele1.imageName}`, ele1.image);
      })
    );
    attributeListArray.map((ele: any, eleIndex: number) =>
      ele.media.map((ele1: any, index: number) => {
        return formData.append(`${ele1.voiceName}`, ele1.voice);
      })
    );
    console.log(formData, 'formData');
    insertOrUpdateDataMapping(formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <BodyContainer>
      {attributeListArray.map((listArrayItem, listItemIndex) => {
        return (
          <div key={listItemIndex}>
            <FlexItemBetweenContent>
              <h5>{listArrayItem.attributeId}</h5>
              <AddCircleOutlinedIcon
                onClick={() =>
                  handleAddAdditionalAttributeFiles(listArrayItem.productCode, listArrayItem.attributeId, listItemIndex)
                }
              />
            </FlexItemBetweenContent>

            {listArrayItem.media.map((ele, index) => {
              if (!ele.isDeleted) {
                return (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} md={3}>
                      <Label>Attribute Image</Label>
                      <CustomeFileUpload
                        id="image-upload"
                        type="text"
                        readOnly
                        value={ele.imageName || ele.image}
                        endAdornment={
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => handleImageIconClick(listItemIndex, index)}
                          >
                            <PhotoCamera />
                          </IconButton>
                        }
                      />
                      <StyledInput
                        id="image-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(event, listItemIndex, index)}
                        ref={fileRefs[listItemIndex][index]}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Label>Attribute Audio</Label>
                      <CustomeFileUpload
                        id="image-upload"
                        type="text"
                        readOnly
                        value={ele.voiceName || ele.voice}
                        endAdornment={
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={event => handleAudioIconClick(event, listItemIndex, index)}
                          >
                            <AudioFileIcon />
                          </IconButton>
                        }
                      />
                      <StyledInput
                        id="image-upload-input"
                        type="file"
                        accept="audio/*"
                        onChange={event => handleAudioFiles(event, listItemIndex, index)}
                        ref={audioRefs[listItemIndex][index]}
                      />
                    </Grid>
                    {index !== 0 && (
                      <Grid item xs={3} sx={{ alignSelf: 'flex-end' }}>
                        <RemoveCircleIcon onClick={() => removeItem(listItemIndex, index)} />
                      </Grid>
                    )}
                  </Grid>
                );
              }
            })}
          </div>
        );
      })}
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleMediaMappingSubmittion}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
    </BodyContainer>
  );
};

export default AttributeMappingPage1;

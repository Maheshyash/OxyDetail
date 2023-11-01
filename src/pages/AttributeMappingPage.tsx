import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import { ActionButtonGroup, CustomButton, Label } from '../components/styledComponents/InputBox.styles';
import { CustomParagraph, CustomeFileUpload, FlexItemBetweenContent, StyledInput } from '../components/styledComponents/Common.styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { insertOrUpdateDataMapping } from '../utils/APIActions';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { toaster } from '../components/Toaster/Toaster';
import { FileSize } from '../Constants';
import { updateFileName } from '../utils/common';
import Loader from '../components/Loader/Loader';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';

export type listItemArrayInterface = listItem[] | [];

export interface listItem {
  productCode: string;
  attributeId: number;
  attributeName: string;
  media: listItemMedia[] | [];
}

export interface listItemMedia {
  productCode: string;
  attributeId: number;
  productAttributeOrder: number;
  image: string | any;
  oldImage: any;
  voice: string | any;
  imageName?: string;
  voiceName?: string;
  oldVoice: any;
  isDeleted: any;
  isNewRow: boolean;
}
const AttributeMappingPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [attributeListArray, setAttributeListArray] = useState<listItemArrayInterface>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(() => {
    if (location.state) {
      const modifiedData = location.state.attributeDetails.attributes.map((ele: listItem) => ({
        ...ele,
        media: ele.media.map((ele1: listItemMedia) => ({ ...ele1, isNewRow: false }))
      }));
      console.log(modifiedData, 'modifiedData');
      setAttributeListArray(modifiedData);
    }
  }, []);
  const handleAddAdditionalAttributeFiles = (productCode: string, attributeId: number, listItemIndex: number) => {
    // const newArray = JSON.parse(JSON.stringify(attributeListArray));
    const newArray = attributeListArray.map(ele => ele);
    const condition = newArray[listItemIndex].media.filter((ele: listItemMedia) => {
      if (!ele.isDeleted) {
        return ele;
      }
    });
    if (condition.length < 5) {
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
          isDeleted: false,
          isNewRow: true
        }
      ];
      debugger;
      setAttributeListArray(newArray);
    }
  };

  const handleImageIconClick = (listItemIndex: number, index: number) => {
    const imageFile = document.getElementById(`image${listItemIndex}${index}`);
    imageFile?.click();
  };

  const handleAudioIconClick = (listItemIndex: number, index: number) => {
    const audioFile = document.getElementById(`audio${listItemIndex}${index}`);
    audioFile?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, listItemIndex: number, index: number) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const filename = file.name;
    if (file.size > FileSize.IMAGEFILESIZE) {
      toaster('warning', 'Please Select Image file upto 1mb');
      return;
    }

    // updating fileName by appending a timestamp
    const newFileName = updateFileName(filename);
    const newFile = new File([file], newFileName, { type: file.type });

    setAttributeListArray(prevArray => {
      // var newArray: listItemArrayInterface = JSON.parse(JSON.stringify(prevArray));
      var newArray: listItemArrayInterface = prevArray.map(ele => ele);
      const indexedMedia = newArray[listItemIndex].media[index];
      const { image, oldImage } = indexedMedia;
      if (!indexedMedia) {
        newArray[listItemIndex].media[index] = {
          ...newArray[listItemIndex].media[index],
          imageName: newFileName,
          image: newFile,
          oldImage: oldImage || (image ? image : '')
        };
      } else {
        newArray[listItemIndex].media[index].imageName = newFileName;
        newArray[listItemIndex].media[index].image = newFile;
        newArray[listItemIndex].media[index].oldImage = oldImage || (image ? image : '');
      }
      debugger;
      return newArray;
    });
  };

  const handleAudioFiles = (event: ChangeEvent<HTMLInputElement>, listItemIndex: number, index: number) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const filename = file.name;

    if (file.size > FileSize.AUDIOFILESIZE) {
      toaster('warning', 'Please Select Audio file upto 1mb');
      return;
    }

    // updating filename by appending a timestamp
    const newFileName = updateFileName(filename);
    const newFile = new File([file], newFileName, { type: file.type });

    setAttributeListArray(prevArray => {
      // let newArray: listItemArrayInterface = JSON.parse(JSON.stringify(prevArray));
      let newArray: listItemArrayInterface = prevArray.map(ele => ele);
      const indexedMedia = newArray[listItemIndex].media[index];
      const { voice, oldVoice } = indexedMedia;
      if (!indexedMedia) {
        newArray[listItemIndex].media[index] = {
          ...newArray[listItemIndex].media[index],
          voiceName: newFileName,
          voice: newFile,
          oldVoice: oldVoice || (voice ? voice : '')
        };
      } else {
        newArray[listItemIndex].media[index].voiceName = newFileName;
        newArray[listItemIndex].media[index].voice = newFile;
        newArray[listItemIndex].media[index].oldVoice = oldVoice || (voice ? voice : '');
      }
      debugger;
      return newArray;
    });
  };

  const removeItem = (listItemIndex: number, index: number) => {
    // var dummyArray: listItemArrayInterface = JSON.parse(JSON.stringify(attributeListArray));
    var dummyArray: listItemArrayInterface = attributeListArray.map(ele => ele);
    if (dummyArray[listItemIndex].media[index].isNewRow) {
      dummyArray[listItemIndex].media.splice(index, 1);
    } else {
      dummyArray[listItemIndex].media[index] = { ...dummyArray[listItemIndex].media[index], isDeleted: true };
    }
    setAttributeListArray(dummyArray);
  };

  const handleMediaMappingSubmittion = async (e: any) => {
    e.preventDefault();
    let isEverythingFilled: boolean = true;
    attributeListArray.map(ele =>
      ele.media.map(ele1 => {
        if (ele1.image === '' || ele1.voice === '') {
          isEverythingFilled = false;
          toaster('warning', 'Please Upload all files');
          return;
        }
      })
    );
    if (!isEverythingFilled) return;
    const ProductCode = location.state.attributeDetails.productCode;
    const Data = {
      productCode: ProductCode,
      Media: attributeListArray.flatMap(ele =>
        ele.media.map(ele1 => ({
          AttributeId: ele1.attributeId,
          Image: typeof ele1.image === 'string' ? ele1.image : ele1.imageName || '',
          Voice: typeof ele1.voice === 'string' ? ele1.voice : ele1.voiceName || '',
          ProductAttributeOrder: ele1.productAttributeOrder,
          OldImage: ele1.oldImage || '',
          OldVoice: ele1.oldVoice || '',
          IsDeleted: ele1.isDeleted == null ? false : ele1.isDeleted
        }))
      )
    };
    var formData = new FormData();
    formData.append('Data', JSON.stringify(Data));
    debugger;
    attributeListArray.map((ele: any) =>
      ele.media.map((ele1: any) => {
        if (ele1.imageName && ele1.image) {
          return formData.append(`${ele1.imageName}`, ele1.image);
        }
      })
    );
    attributeListArray.map((ele: any) =>
      ele.media.map((ele1: any) => {
        if (ele1.voiceName && ele1.voice) {
          return formData.append(`${ele1.voiceName}`, ele1.voice);
        }
      })
    );
    console.log(formData, 'formData');
    setIsLoader(true);
    insertOrUpdateDataMapping(formData)
      .then(res => {
        setIsLoader(false);
        if (res.statusCode === 1 || res.statusCode === 0) {
          toaster('success', res.statusMessage);
          navigate(-1);
        } else {
          toaster('error', res.statusMessage);
        }
      })
      .catch(err => {
        setIsLoader(false);
        console.log(err);
        toaster('error', 'something went wrong');
      });
  };
  return (
    <BodyContainer>

      <div style={{ background: theme.palette.background.default, padding: 10, borderRadius: 8 }}>
        <Grid container>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Product Codes</Label>
            <CustomParagraph>{location.state.attributeDetails.productCode}</CustomParagraph>
          </Grid>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Product Name</Label>
            <CustomParagraph>{location.state.attributeDetails.productName}</CustomParagraph>
          </Grid>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Category</Label>
            <CustomParagraph>{location.state.attributeDetails.categoryName}</CustomParagraph>
          </Grid>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Sub Category</Label>
            <CustomParagraph>{location.state.attributeDetails.subCategoryName}</CustomParagraph>
          </Grid>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Product Description</Label>
            <CustomParagraph>{location.state.attributeDetails.productDescription}</CustomParagraph>
          </Grid>
          <Grid md={3}>
            <Label style={{ fontWeight: 600 }}>Activation Date</Label>
            <CustomParagraph>{dayjs(location.state.attributeDetails.activationDate).format('DD/MM/YYYY')}</CustomParagraph>
          </Grid>
        </Grid>
      </div>
      {isLoader && <Loader />}
      {attributeListArray.map((listArrayItem, listItemIndex) => {
        return (
          <div key={listItemIndex}>
            <FlexItemBetweenContent>
              <h5>{listArrayItem.attributeName}</h5>
              <AddCircleOutlinedIcon
                onClick={event => {
                  event.stopPropagation();
                  handleAddAdditionalAttributeFiles(
                    // event,
                    listArrayItem.productCode,
                    listArrayItem.attributeId,
                    listItemIndex
                  );
                }}
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
                        id={`image${listItemIndex}${index}`}
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, listItemIndex, index)}
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
                            onClick={() => handleAudioIconClick(listItemIndex, index)}
                          >
                            <AudioFileIcon />
                          </IconButton>
                        }
                      />
                      <StyledInput
                        id={`audio${listItemIndex}${index}`}
                        type="file"
                        accept="audio/*"
                        onChange={event => handleAudioFiles(event, listItemIndex, index)}
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ alignSelf: 'flex-end' }}>
                      <RemoveCircleIcon onClick={() => removeItem(listItemIndex, index)} />
                    </Grid>
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

export default AttributeMappingPage;

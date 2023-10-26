import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import Grid from '@mui/material/Grid';
import { ActionButtonGroup, CustomButton, Label } from '../components/styledComponents/InputBox.styles';
import {
  CustomMultiSelect,
  CustomeFileUpload,
  FlexItemBetweenContent,
  StyledInput
} from '../components/styledComponents/Common.styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { fetchAttributeList, insertOrUpdateDataMapping } from '../utils/APIs';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
interface attributeTypes {
  label: string;
  value: number;
}
interface listItem {
  AttributeId: number;
  AttributeName: string;
  Image: any;
  ImageName: string;
  Audio: any;
  AudioName: string;
}
export type Root = Root2[] | [];

export interface Root2 {
  productCode: string;
  attributeId: number;
  media: Medum[] | [];
}

export interface Medum {
  productCode: string;
  attributeId: number;
  productAttributeOrder: number;
  image: string|any;
  oldImage: any;
  voice: string|any;
  oldVoice: any;
  isDeleted: any;
}
const AttributeMappingPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [array, setArray] = useState<Array<{ Image: any; ImageName: string; Audio: any; AudioName: string }> | []>([]);
  const [attributeListArray, setAttributeListArray] = useState<Root>([]);
  const [attributeList, setAttributeList] = useState<Array<attributeTypes> | []>([]);
  const [selected, setSelected] = useState<Array<any> | []>([]);
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
      //  fileRef = location.state.attributeDetails.map(() => React.createRef());
      console.log(location.state.attributeDetails, 'attributeDetails');
      // {AttributeId:data[data.length-1].value,AttributeName:data[data.length-1].label, Image: '', ImageName: '', Audio: '', AudioName: '' }
      location.state.attributeDetails;
      setAttributeListArray(location.state.attributeDetails);
      fetchAttributeDetails();
      // const res = location.state.attributeDetails.map(ele=> {label:ele.attributeId, value:ele.attribute })
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
    // setArray(prevArray => {
    //   const newArray = [...prevArray];
    //   if (!newArray[index]) {
    //     newArray[index] = { ...newArray[index], ImageName: filename, Image: file };
    //   } else {
    //     newArray[index].ImageName = filename;
    //     newArray[index].Image = file;
    //   }
    //   return newArray;
    // });
    setAttributeListArray(prevArray => {
      // const newArray = JSON.parse(JSON.stringify(prevArray));
      var newArray:Root = [...prevArray];
      if (!newArray[listItemIndex].media[index]) {
        newArray[listItemIndex].media[index] = {...newArray[listItemIndex].media[index], ImageName: filename, image: file, AudioName: '', Audio: '' }; //...newArray[index], ImageName: filename, Image: file };
      } else {
        newArray[listItemIndex].media[index].ImageName = filename;
        newArray[listItemIndex].media[index].image = file;
      }

      return newArray;
    });
  };

  const handleAudioFiles = (event: ChangeEvent<HTMLInputElement>, listItemIndex: number, index: number) => {
    const file = event.target.files[0];
    const filename = file.name;
    setAttributeListArray(prevArray => {
      // const newArray = JSON.parse(JSON.stringify(prevArray));
      const newArray = [...prevArray];
      if (!newArray[listItemIndex].media[index]) {
        newArray[listItemIndex].media[index] = { voiceName: filename, voice: file, ImageName: '', Image: '' }; //...newArray[index], ImageName: filename, Image: file };
      } else {
        newArray[listItemIndex].media[index].voiceName = filename;
        newArray[listItemIndex].media[index].voice = file;
      }

      return newArray;
    });
    // setArray(prevArray => {
    //   const newArray = [...prevArray];
    //   if (!newArray[index]) {
    //     newArray[index] = { ...newArray[index], AudioName: filename, Audio: file };
    //   } else {
    //     newArray[index].AudioName = filename;
    //     newArray[index].Audio = file;
    //   }
    //   return newArray;
    // });
  };

  const removeItem = (listItemIndex: number, index: number) => {
    var dummyArray: Root = JSON.parse(JSON.stringify(attributeListArray));
    dummyArray[listItemIndex].media[index] = { ...dummyArray[listItemIndex].media[index], isDeleted: true };
    // dummyArray[listItemIndex].splice(index, 1);
    setAttributeListArray(dummyArray);
  };

  const fetchAttributeDetails = async (AttributeId = null) => {
    setIsLoader(true);
    await fetchAttributeList(AttributeId)
      .then(res => {
        // setAttributeList(res.map(ele=>{label:ele.attributeId, value:ele.attributeName}));
        const filteredArray = res.filter(obj =>
          location.state.attributeDetails.some(ele => ele.attributeId === obj.attributeId)
        );
        const list = filteredArray.map(ele => ({ label: ele.attributeName, value: ele.attributeId }));
        setAttributeList(list);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
        setIsLoader(false);
      });
  };
  const handleMediaMappingSubmittion = async e => {
    e.preventDefault();
    const ProductCode = location.state.attributeDetails[0].productCode;
    const Data = {
      productCode: ProductCode,
      //   Media:attributeListArray.flatMap((ele:any)=> ele.map((ele1:any,index:number)=>{
      //     return ({AttributeId:ele1.AttributeId, Image:ele1.ImageName, Voice:ele1.AudioName, ProductAttributeOrder:index, OldImage:'',OldVoice:'',IsDeleted:false })
      //   }))
      Media: attributeListArray.flatMap(ele =>
        ele.media.map(ele1 => ({
          AttributeId: ele1.attributeId,
          Image: ele1.image,
          Voice: ele1.voice,
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
        return formData.append(`File${(eleIndex + 1) * index + 1}`, ele1.Image);
      })
    );
    attributeListArray.map((ele: any, eleIndex: number) =>
      ele.media.map((ele1: any, index: number) => {
        return formData.append(`Audio${(eleIndex + 1) * index + 1}`, ele1.Voice);
      })
    );
    console.log(formData, 'formData');
    // let data = {"productCode":"asdf",
    // "Media":[{"AttributeId":10,"Image":"image","Voice":"audio","ProductAttributeOrder":4,"OldImage":"image123.avif","OldVoice":"Voice123.mp3" ,"IsDeleted":false}]}
    insertOrUpdateDataMapping(formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    console.log(attributeListArray, 'attributeListArray');
  }, [attributeListArray]);
  const handleAttributeSelection = (data: Array<attributeTypes>) => {
    if (data.length <= 5) {
      setSelected(data);
      const attributeIds = data.map(ele => ele.value);
      const filteredArray = attributeListArray.map((innerArray, index) =>
        innerArray.filter(obj => attributeIds.some(ele => ele === obj.AttributeId))
      );
      const filteredArrayWithoutEmpty = filteredArray.filter(innerArray => innerArray.length > 0);
      setAttributeListArray(prev => {
        var result = [...filteredArrayWithoutEmpty];
        if (prev.length !== data.length + 1 && data.length !== 0) {
          result = [
            ...result,
            [
              {
                AttributeId: data[data.length - 1].value,
                AttributeName: data[data.length - 1].label,
                Image: '',
                ImageName: '',
                Audio: '',
                AudioName: ''
              }
            ]
          ];
        }
        return result;
      });
    }
  };
  return (
    <BodyContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Label>Product Attributes</Label>
          <CustomMultiSelect
            hasSelectAll={false}
            options={attributeList}
            value={selected}
            onChange={(data: Array<attributeTypes>) => handleAttributeSelection(data)}
            labelledBy="Select"
          />
        </Grid>
      </Grid>
      {/* <button onClick={handleAddAdditionalAttributeFiles}>Add</button> */}
      {attributeListArray.map((listArrayItem, listItemIndex) => {
        // const attributeId = listArrayItem[0].AttributeId;
        // const attributeName = listArrayItem[0].AttributeName;
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
                        value={ele.image}
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
                        value={ele.voice}
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

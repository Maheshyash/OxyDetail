import { Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import LabelValue from '../components/LabelValue';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  ActionButtonGroup,
  CustomButton,
  CustomeAutoSelect,
  Label
} from '../components/styledComponents/InputBox.styles';
import {
  fetchAttributeList,
  fetchCategoryList,
  fetchSubCategoryList,
  insertOrUpdateProductDetail
} from '../utils/APIs';
import {
  categoryListArray,
  categoryListType,
  subCategoryListType,
  subCategoryListTypeArray
} from '../types/productTypes';
import {
  CustomDatepicker,
  CustomMultiSelect,
  CustomParagraph,
  CustomSwitch,
  CustomTextArea,
  DatePickerContainer,
  ErrorMessage,
  StyledModalBackdrop,
  StyledModalContent
} from '../components/styledComponents/Common.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { toaster } from '../components/Toaster/Toaster';
import dayjs from 'dayjs';
interface productTypes {
  productCode: string;
  productName: string;
  description: string;
  category: null | any;
  subCategory: null | any;
  categoryId: any;
  attributes: Array<attributeTypes>;
  isNewProduct: boolean;
  isFocusedProduct: boolean;
  isActive: boolean;
  activationDate: string;
}
interface attributeTypes {
  label: string;
  value: number | string;
}
const AddOrEditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formDetails, setFormDetails] = useState<productTypes>({
    productCode: '',
    productName: '',
    description: '',
    category: null,
    subCategory: null,
    attributes: [{ label: '', value: 0 }],
    isNewProduct: false,
    isFocusedProduct: false,
    categoryId: null,
    isActive: true,
    activationDate: ''
  });
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [subCategoryList, setSubCategoryList] = useState<subCategoryListTypeArray>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<subCategoryListType | null>(null);
  const [attributeList, setAttributeList] = useState<Array<attributeTypes> | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isConfirmPopUp, setIsConfirmPopUp] = useState<boolean>(false);
  const handleProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, productName: e.target.value });
  };
  const handleProductCode = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, productCode: e.target.value });
  };
  const fetchAttributeDetails = async (AttributeId = null) => {
    setIsLoader(true);
    await fetchAttributeList(AttributeId)
      .then(res => {
        // setAttributeList(res.map(ele=>{label:ele.attributeId, value:ele.attributeName}));
        const list = res.map(ele => ({ label: ele.attributeName, value: ele.attributeId }));
        if (location.state) {
          const list1 = location.state.productDetails.attributes.map(ele => ele.attributeId);
          const info = list1
            .map(ele => (list.find(ele1 => ele1.value === ele) ? list.find(ele1 => ele1.value === ele) : null))
            .filter(ele => ele !== null && ele !== undefined);
          // const info = list.filter(ele => list.findIndex(ele1 => ele1.value === ele) && list.find(ele1 => ele1.value === ele) );
          console.log(info, 'info');
          setSelected(info);
        }
        setAttributeList(list);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
        setIsLoader(false);
      });
  };
  const fetchCategoryDetails = async () => {
    setIsLoader(true);
    await fetchCategoryList()
      .then(res => {
        setCategoryList(res);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        setIsLoader(false);
      });
  };
  const fetchSubCategoryDetails = async (categoryId: number) => {
    setIsLoader(true);
    await fetchSubCategoryList(categoryId)
      .then(res => {
        setSubCategoryList(res);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        setIsLoader(false);
      });
  };
  useEffect(() => {
    fetchCategoryDetails();
    fetchAttributeDetails();
    console.log(location.state);
    if (location?.state) {
      const {
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
        isFocusedProduct,
        isNewProduct,
        productDescription,
        productName,
        productCode,
        isActive,
        activationDate
      } = location.state.productDetails;
      fetchSubCategoryDetails(categoryId);
      setFormDetails({
        ...formDetails,
        productCode: productCode,
        productName: productName,
        description: productDescription,
        isFocusedProduct: isFocusedProduct,
        isNewProduct: isNewProduct,
        isActive: isActive,
        categoryId: { categoryId: categoryId, categoryName: categoryName },
        activationDate: activationDate
      });
      setSubCategoryId({ subCategoryId: subCategoryId, subCategoryName: subCategoryName });
    }
  }, []);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const handleProductSubmittion = (isForceUpdate = false) => {
    const {
      productCode,
      productName,
      description,
      categoryId,
      isNewProduct,
      isFocusedProduct,
      isActive,
      activationDate
    } = formDetails;
    if (
      productCode.trim() === '' ||
      productName.trim() === '' ||
      description.trim() === '' ||
      selected.length === 0 ||
      formDetails.activationDate.trim() === '' ||
      formDetails.activationDate === 'Invalid Date'
    ) {
      setIsSubmit(true);
      return;
    }
    const payload = {
      productCode: productCode,
      productName: productName,
      productDescription: description,
      categoryId: categoryId?.categoryId,
      subCategoryId: subCategoryId?.subCategoryId,
      categoryName: '',
      subCategoryName: '',
      isNewProduct: isNewProduct,
      isFocusedProduct: isFocusedProduct,
      isActive: isActive,
      attributes: selected.map((ele, index) => ({
        productCode: productCode,
        attributeId: ele.value,
        productAttributeOrder: index
      })),
      activationDate: activationDate,
      forceUpdateIfExists: location.state ? true : isForceUpdate
    };
    setIsLoader(true);
    insertOrUpdateProductDetail(JSON.stringify(payload))
      .then(res => {
        const { statusCode, statusMessage } = res;
        console.log(res, 'res');
        if (statusCode === 1 || statusCode === 0) {
          toaster('success', statusMessage);
          setIsLoader(false);
          navigate(-1);
        } else if (statusCode === -1) {
          setIsConfirmPopUp(true);
          setIsLoader(false)
        } else {
          toaster('error', statusMessage);
          setIsLoader(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  };
  const [selected, setSelected] = useState<Array<any> | []>([]);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Product Code"
            value={formDetails.productCode}
            onChange={handleProductCode}
            placeholder="Enter Product Code"
          />
          {formDetails.productCode.trim() === '' && isSubmit && <ErrorMessage>Please enter Product Code</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Product Name"
            value={formDetails.productName}
            onChange={handleProductName}
            placeholder="Enter Product Name"
          />
          {formDetails.productName.trim() === '' && isSubmit && <ErrorMessage>Please enter Product Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Category</Label>
          <CustomeAutoSelect
            options={categoryList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
              setCategoryId(data.categoryId);
              setFormDetails({ ...formDetails, categoryId: data });
              fetchSubCategoryDetails(data.categoryId);
              setSubCategoryId(null);
              console.log(data, 'data');
            }}
            value={formDetails.categoryId}
            getOptionLabel={(option: categoryListType | any) => option.categoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {formDetails.categoryId === null && isSubmit && <ErrorMessage>Please select Category</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Sub Category Name</Label>
          <CustomeAutoSelect
            options={subCategoryList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
              setSubCategoryId(data);
            }}
            value={subCategoryId}
            getOptionLabel={(option: subCategoryListType | any) => option.subCategoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
          {subCategoryId === null && isSubmit && <ErrorMessage>Please select Sub Category</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Product Description</Label>
          <CustomTextArea
            minRows={4}
            maxRows={4}
            value={formDetails.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormDetails({ ...formDetails, description: e.target.value })
            }
          />
          {formDetails.description.trim() === '' && isSubmit && (
            <ErrorMessage>Please enter Product Description</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
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
          {selected.length === 0 && isSubmit && <ErrorMessage>Please select Product Attributes</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>New Product</Label>
          <CustomSwitch
            checked={formDetails.isNewProduct}
            onChange={() =>
              setFormDetails(props => {
                return { ...formDetails, isNewProduct: !props.isNewProduct };
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Focused Product</Label>
          <CustomSwitch
            checked={formDetails.isFocusedProduct}
            onChange={() =>
              setFormDetails(props => {
                return { ...formDetails, isFocusedProduct: !props.isFocusedProduct };
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Activation Date</Label>
          <DatePickerContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatepicker
                format="DD/MM/YYYY"
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
          {formDetails.activationDate.trim() === '' ||
            (formDetails.activationDate === 'Invalid Date' && isSubmit && (
              <ErrorMessage>Please select Activation Date</ErrorMessage>
            ))}
        </Grid>
        {location.state && (
          <Grid item xs={12} md={3}>
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
      </Grid>
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={() => handleProductSubmittion()}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
      {isConfirmPopUp && (
        <StyledModalBackdrop>
          <StyledModalContent>
            <h5>Confirm Popup</h5>
            <CustomParagraph>Are you sure you want to continue to update the existing Product</CustomParagraph>
            <ActionButtonGroup>
              <CustomButton variant="outlined" onClick={() => setIsConfirmPopUp(false)}>
                Cancel
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={() => {
                  handleProductSubmittion(true);
                  setIsConfirmPopUp(false);
                }}
              >
                Submit
              </CustomButton>
            </ActionButtonGroup>
          </StyledModalContent>
        </StyledModalBackdrop>
      )}
    </BodyContainer>
  );
};

export default AddOrEditProduct;

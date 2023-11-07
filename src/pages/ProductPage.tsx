import { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ProductDetails,
  categoryListArray,
  subCategoryListType,
  subCategoryListTypeArray
} from '../types/productTypes';
import { BodyContainer, NormalContainer } from '../components/styledComponents/Body.styles';
import { CustomButton, CustomeAutoSelect, Label } from '../components/styledComponents/InputBox.styles';
import { fetchCategoryList, fetchProductList, fetchSubCategoryList } from '../utils/APIActions';
import { AddButtonContainer, FilterContainer } from '../components/styledComponents/Common.styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Loader from '../components/Loader/Loader';
import ProductTable from '../components/Product/ProductTable';

const ProductPage = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductDetails>([]);
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [subCategoryList, setSubCategoryList] = useState<subCategoryListTypeArray>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<subCategoryListType | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleAddProduct = () => {
    navigate('addProduct');
  };
  useEffect(() => {
    fetchProductDetails();
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = async () => {
    await fetchCategoryList()
      .then(res => {
        setCategoryList(res);
      })
      .catch(() => {
        alert('err');
      });
  };
  const fetchSubCategoryDetails = async (categoryId: number) => {
    setIsLoader(true);
    await fetchSubCategoryList(categoryId)
      .then(res => {
        setSubCategoryList(res);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
        alert('err');
      });
  };
  const fetchProductDetails = async (payload?: any) => {
    setIsLoader(true);
    await fetchProductList(payload)
      .then(res => {
        setProductList(res);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
        setIsLoader(false);
      });
  };
  const handleSearch = async () => {
    const payload = {
      CategoryId: categoryId,
      SubCategoryId: subCategoryId?.subCategoryId
    };
    await fetchProductDetails(payload);
  };
  return (
    <>
      <NormalContainer>
        {isLoader && <Loader />}
        <FilterContainer>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Label>Category</Label>
              <CustomeAutoSelect
                options={categoryList}
                onChange={(_event: React.SyntheticEvent<Element, Event>, data: any) => {
                  setCategoryId(data.categoryId);
                  fetchSubCategoryDetails(data.categoryId);
                  setSubCategoryId(null);
                  console.log(data, 'data');
                }}
                getOptionLabel={(option: any) => option.categoryName}
                size="small"
                renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Label>Sub Category Name</Label>
              <CustomeAutoSelect
                options={subCategoryList}
                onChange={(_event: React.SyntheticEvent<Element, Event>, data: any) => {
                  setSubCategoryId(data);
                }}
                value={subCategoryId}
                getOptionLabel={(option: any) => option.subCategoryName}
                size="small"
                renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
              />
            </Grid>
            <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'end' }}>
              <Button>
                <SearchRoundedIcon onClick={handleSearch} />
              </Button>
            </Grid>
          </Grid>
        </FilterContainer>
      </NormalContainer>
      <BodyContainer>
        <AddButtonContainer>
          <CustomButton variant="outlined" onClick={handleAddProduct}>
            Add
          </CustomButton>
        </AddButtonContainer>
        <ProductTable data={productList} />
      </BodyContainer>
    </>
  );
};

export default ProductPage;

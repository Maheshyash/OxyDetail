import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { fetchSubCategoryList } from '../utils/APIActions';
import { subCategoryListTypeArray } from '../types/productTypes';
import SubCategoryTable from '../components/SubCateogry/SubCategoryTable';

const SubCategoryPage = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<subCategoryListTypeArray>([]);
  useEffect(() => {
    fetchSubCategoryList()
      .then(res => {
        setSubCategory(res);
        setIsLoader(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  }, []);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <SubCategoryTable data={subCategory} />
    </BodyContainer>
  );
};

export default SubCategoryPage;

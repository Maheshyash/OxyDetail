import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { fetchCategoryList } from '../utils/APIActions';
import { categoryListArray } from '../types/productTypes';
import CategoryTable from '../components/Category/CategoryTable';

const CategoryPage = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  useEffect(() => {
    fetchCategoryList()
      .then(res => {
        setCategoryList(res);
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
      <CategoryTable data={categoryList} />
    </BodyContainer>
  );
};

export default CategoryPage;

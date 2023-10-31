import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchAttributeList } from '../utils/APIActions';
import {  AttributeList } from '../types/attributeTypes';
import Loader from '../components/Loader/Loader';
import AttributeTable from '../components/Attribute/AttributeTable';
const AttributesPage = () => {
  const navigate = useNavigate();
  const [attributeList, setAttributeList] = useState<AttributeList | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addAttribute');
  };
  useEffect(() => {
    fetchAttributeDetails();
  }, []);
  const fetchAttributeDetails = (AttributeId=null) =>{
    setIsLoader(true)
    fetchAttributeList(AttributeId)
      .then(res => {
        setAttributeList(res);
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
        setIsLoader(false);
      });
  }
  return (
    <>
    {/* <NormalContainer>
      <FilterContainer >
        <InputBox type='search' size='small' style={{width:'200px'}}/>
        <Button>
          <SearchRoundedIcon/>
        </Button>
      </FilterContainer>
    </NormalContainer> */}
    {isLoader && <Loader/>}
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {attributeList.length === 0 ? (
        <NoRecordsFound>No records found</NoRecordsFound>
      ) : (
        <AttributeTable data={attributeList} />
      )}
    </BodyContainer>
    </>
  );
};

export default AttributesPage;



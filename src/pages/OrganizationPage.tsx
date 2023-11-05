import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchOrganizationList } from '../utils/APIActions';
import { organizationListArray } from '../types/organizationTypes';
import OrganizationTable from '../components/Organization/OrganizationTable';
import Loader from '../components/Loader/Loader';
const OrganizationPage = () => {
  const navigate = useNavigate();
  const [organizationList, setOrganizationList] = useState<organizationListArray>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addOrganization');
  };
  useEffect(() => {
    setIsLoader(true);
    fetchOrganizationList()
      .then(res => {
        setOrganizationList(res);
        setIsLoader(false);
      })
      .catch(err => {
        console.log(err, 'err');
        setIsLoader(false);
      });
  }, []);
  return (
    <BodyContainer>
      {isLoader && <Loader/>}
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      
      {/* {organizationList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : <OrganizationTable data={organizationList}/>} */}
      <OrganizationTable data={organizationList}/>
    </BodyContainer>
  );
};

export default OrganizationPage;

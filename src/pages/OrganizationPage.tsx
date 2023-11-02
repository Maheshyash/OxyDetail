import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchOrganizationList } from '../utils/APIActions';
import { organizationListArray } from '../types/organizationTypes';
import OrganizationTable from '../components/Organization/OrganizationTable';
const OrganizationPage = () => {
  const navigate = useNavigate();
  const [organizationList, setOrganizationList] = useState<organizationListArray>([]);
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addOrganization');
  };
  useEffect(() => {
    fetchOrganizationList()
      .then(res => {
        setOrganizationList(res);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  }, []);
  return (
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      
      {organizationList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : <OrganizationTable data={organizationList}/>}
    </BodyContainer>
  );
};

export default OrganizationPage;

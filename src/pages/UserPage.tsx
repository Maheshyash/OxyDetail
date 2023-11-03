import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsersList } from '../utils/APIActions';
import { usersListItemArray } from '../types/userTypes';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import UserTable from '../components/User/UserTable';

const UserPage = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<usersListItemArray>([]);
  const handleAddUser = () => {
    navigate('addUser');
  };
  useEffect(() => {
    fetchUsersList()
      .then(res => {
        setUsersList(res.data);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  }, []);
  return (
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddUser}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {usersList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : <UserTable data={usersList}/>}
    </BodyContainer>
  );
};

export default UserPage;

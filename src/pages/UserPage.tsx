import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsersList } from '../utils/APIActions';
import { usersListItemArray } from '../types/userTypes';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import UserTable from '../components/User/UserTable';
import Loader from '../components/Loader/Loader';

const UserPage = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<usersListItemArray>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleAddUser = () => {
    navigate('addUser');
  };
  useEffect(() => {
    setIsLoader(true);
    fetchUsersList()
      .then(res => {
        setIsLoader(false);
        setUsersList(res.data);
      })
      .catch(err => {
        alert('err');
        setIsLoader(false);
        console.log(err, 'err');
      });
  }, []);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddUser}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {/* {usersList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : <UserTable data={usersList}/>} */}
      <UserTable data={usersList}/>
    </BodyContainer>
  );
};

export default UserPage;

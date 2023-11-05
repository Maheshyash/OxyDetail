import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { roleListArray } from '../types/roleTypes';
import { useEffect, useState } from 'react';
import { fetchRoleList } from '../utils/APIActions';
import RoleTable from '../components/Role/RoleTalbe';
import Loader from '../components/Loader/Loader';

const RolePage = () => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState<roleListArray>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  useEffect(() => {
    setIsLoader(true);
    fetchRoleList()
      .then(res => {
        setIsLoader(false);
        setRoleList(res);
      })
      .catch(err => {
        console.log(err, 'err');
        setIsLoader(false);
      });
  }, []);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={() => navigate('addRole')}>
          Add
        </CustomButton>
      </AddButtonContainer>
      <RoleTable data={roleList} />
    </BodyContainer>
  );
};

export default RolePage;

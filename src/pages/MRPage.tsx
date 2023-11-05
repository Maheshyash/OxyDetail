import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchMrList } from '../utils/APIActions';
import MRTable from '../components/MR/MRTable';
import Loader from '../components/Loader/Loader';
const MRPage = () => {
  const navigate = useNavigate();
  const [MrList, setMrList] = useState<Array<any> | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleAddMR = () => {
    navigate('addMR');
  };
  useEffect(() => {
    setIsLoader(true);
    fetchMrList()
      .then(res => {
        setIsLoader(false);
        setMrList(res.data);
      })
      .catch(err => {
        setIsLoader(false);
        alert('err');
        console.log(err, 'err');
      });
  }, []);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      <MRTable data={MrList} />
    </BodyContainer>
  );
};

export default MRPage;

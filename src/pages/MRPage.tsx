import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchMrList } from '../utils/APIs';
const MRPage = () => {
  const navigate = useNavigate();
  const [MrList, setMrList] = useState<Array<any> | []>([]);
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addMR');
  };
  useEffect(() => {
    fetchMrList()
      .then(res => {
        setMrList(res.data);
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
      {MrList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : ''}
    </BodyContainer>
  );
};

export default MRPage;

import { useNavigate } from "react-router-dom"
import { BodyContainer } from "../components/styledComponents/Body.styles"
import { AddButtonContainer, NoRecordsFound } from "../components/styledComponents/Common.styles"
import { CustomButton } from "../components/styledComponents/InputBox.styles"
import { roleListArray } from "../types/roleTypes"
import { useState } from "react"

const RolePage = () => {
    const navigate = useNavigate();
    const [roleList, setRoleList] = useState<roleListArray>([]);
  return (
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={()=>navigate('addRole')}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {roleList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : ''}
    </BodyContainer>
  )
}

export default RolePage
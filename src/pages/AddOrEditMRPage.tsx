import { useState, ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import {
  ActionButtonGroup,
  CustomButton,
  CustomeAutoSelect,
  Label,
  PhoneNumber
} from '../components/styledComponents/InputBox.styles';
import LabelValue from '../components/LabelValue';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { CustomeFileUpload, ErrorMessage, StyledInput } from '../components/styledComponents/Common.styles';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { FileSize } from '../Constants';
import { toaster } from '../components/Toaster/Toaster';
import { getCookie, updateFileName } from '../utils/common';
interface formDetailsType {
  mrName: string;
  email: string;
  phone: string;
  photo: File | null;
  role: any;
  category: any;
  photoName: string;
}
const AddOrEditMRPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    mrName: '',
    email: '',
    phone: '',
    photo: null,
    role: null,
    category: null,
    photoName: ''
  });
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, mrName: e.target.value });
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, email: e.target.value });
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const validPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
    const trimmedPhoneNumber = validPhoneNumber.substring(0, 10);
    setFormDetails({ ...formDetails, phone: trimmedPhoneNumber });
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const filename = file.name;
    if (file.size > FileSize.IMAGEFILESIZE) {
      toaster('warning', 'Please Select Image file upto 1mb');
      return;
    }

    // updating fileName by appending a timestamp
    const newFileName = updateFileName(filename);
    const newFile = new File([file], newFileName, { type: file.type });
    setFormDetails({ ...formDetails, photo: newFile, photoName: newFileName });
  };
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
      title: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
      title: 'Eternal Sunshine of the Spotless Mind',
      year: 2004
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 }
  ];
  const options = top100Films.map(option => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    };
  });
  const handleButtonClick = () => {
    const photoElement = document.getElementById('Photo');
    photoElement?.click();
  };
  const handleUserCreation = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);
    const isValidEmail = isValidMail(formDetails.email);

    if (
      !isValidEmail ||
      formDetails.mrName.trim() === '' ||
      formDetails.email.trim() === '' ||
      formDetails.phone.trim() === '' ||
      formDetails.phone.length < 10 ||
      !formDetails.category ||
      !formDetails.role
    ) {
      return;
    }
    let userDetails: any = getCookie('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      const payload = {
        userId: userDetails.userId,
        loginId: formDetails.email,
        name: formDetails.mrName,
        mobileNo: formDetails.phone,
        type: userDetails.type,
        emailId: formDetails.email,
        password: 'string',
        passwordSalt: 'string',
        photo: formDetails.photo,
        orgId: 'string',
        isActive: true,
        timeZoneId: 'string',
        roleId: formDetails.role.value
      };
    }
  };
  const isValidMail = (email: string) => {
    if (!email.trim()) return '';
    // const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return isValidEmail;
  };
  return (
    <BodyContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue label="Name" value={formDetails.mrName} onChange={handleName} placeholder="Enter Name" />
          {formDetails.mrName.trim() === '' && isSubmit && <ErrorMessage>Please User Name</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue label="Email Id" value={formDetails.email} onChange={handleEmail} placeholder="Enter Email Id" />
          {(formDetails.email.trim() === '' || !isValidMail(formDetails.email)) && isSubmit && (
            <ErrorMessage>Please enter Email Id</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Phone Number</Label>
          <PhoneNumber
            value={formDetails.phone}
            onChange={handlePhone}
            type="tel"
            placeholder="Enter Phone Number"
          ></PhoneNumber>
          {(formDetails.phone.trim() === '' || formDetails.phone.length < 10) && isSubmit && (
            <ErrorMessage>Please enter Phone Number</ErrorMessage>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Photo</Label>
          <CustomeFileUpload
            id="image-upload"
            type="text"
            readOnly
            value={formDetails.photoName}
            endAdornment={
              <IconButton color="primary" component="span" onClick={handleButtonClick}>
                <PhotoCamera />
              </IconButton>
            }
          />
          <StyledInput id="Photo" type="file" accept="image/*" onChange={handleFile} />
          {formDetails.photoName.trim() === '' && isSubmit && <ErrorMessage>Please select File</ErrorMessage>}
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Role</Label>
          <CustomeAutoSelect
            options={options}
            onChange={(event, data) => {
              setFormDetails({ ...formDetails, role: data });
            }}
            getOptionLabel={option => option.title}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Select Role'} />}
          />
          {!formDetails.role && isSubmit && <ErrorMessage>Please select Role</ErrorMessage>}
        </Grid>
        <Grid item xs={3} md={3}>
          <Label>Product Category</Label>
          <CustomeAutoSelect
            options={options}
            getOptionLabel={option => option.title}
            onChange={(event, data) => {
              setFormDetails({ ...formDetails, category: data });
            }}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Select Product Category'} />}
          />
          {!formDetails.category && isSubmit && <ErrorMessage>Please select Product Category</ErrorMessage>}
        </Grid>
      </Grid>
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleUserCreation}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
    </BodyContainer>
  );
};

export default AddOrEditMRPage;

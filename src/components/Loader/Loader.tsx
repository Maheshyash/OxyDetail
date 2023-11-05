import { LoaderContainer, LoaderContainerInner, LoaderSpinnerContainer } from '../styledComponents/Common.styles';

const Loader = () => {
  return (
    <LoaderSpinnerContainer>
      <LoaderContainer>
        <LoaderContainerInner />
      </LoaderContainer>
    </LoaderSpinnerContainer>
  );
};

export default Loader;

import { LoaderContainer, LoaderContainerInner, LoaderSpinnerContainer } from '../styledComponents/Common.styles';

const Loader = () => {
  return (
    // <div className="loadingio-spinner-eclipse-rauucresw3">
    //   <div className="ldio-f0wxnlwb1mt">
    //     <div></div>
    //   </div>
    // </div>
    <LoaderSpinnerContainer>
      <LoaderContainer>
        <LoaderContainerInner />
      </LoaderContainer>
    </LoaderSpinnerContainer>
  );
};

export default Loader;

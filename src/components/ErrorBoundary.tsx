import React from "react";
import { CustomParagraph, StyledModalBackdrop, StyledModalContent } from "./styledComponents/Common.styles";
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
    error: null,
  };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }
  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <StyledModalBackdrop>
        <StyledModalContent>
          <h5>Confirm Popup</h5>
          <CustomParagraph>{error.message}</CustomParagraph>
          
        </StyledModalContent>
      </StyledModalBackdrop>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
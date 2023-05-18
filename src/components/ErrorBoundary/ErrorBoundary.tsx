import { Component, PropsWithChildren, ErrorInfo } from 'react';
import {
  StyledErrorBoundary,
  ErrorText,
  ErrorDetails,
  ErrorDetailsSummary,
  CopyButton,
} from './ErrorBoundary.styled';
import { MdContentCopy as CopyIcon } from 'react-icons/md';

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      let clipboardText = '';
      if (this.state.error) clipboardText = this.state.error.toString();
      clipboardText += this.state.errorInfo.componentStack;

      return (
        <StyledErrorBoundary>
          <h2>Произошла ошибка</h2>
          <hr />
          <ErrorText>{this.state.error && this.state.error.toString()}</ErrorText>

          <ErrorDetails>
            <ErrorDetailsSummary>Подробные сведения</ErrorDetailsSummary>
            {this.state.errorInfo.componentStack}
          </ErrorDetails>

          <CopyButton onClick={() => navigator.clipboard.writeText(clipboardText)}>
            <CopyIcon />
            Скопировать
          </CopyButton>
        </StyledErrorBoundary>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

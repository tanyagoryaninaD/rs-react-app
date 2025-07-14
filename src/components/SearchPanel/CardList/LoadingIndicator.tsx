import React from 'react';

class LoadingIndicator extends React.Component {
  render() {
    return (
      <div className="table-loader">
        <div className="loader-spinner"></div>
        Loading data...
      </div>
    );
  }
}
export default LoadingIndicator;

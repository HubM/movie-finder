import React from "react";

import Logo from "../layout/header/Logo";

class LoadingLogo extends React.Component {
  render() {
    return (
      <div className="app-loading">
        <Logo width="100px" height="100px" />
      </div>
    );
  }
}

export default LoadingLogo;

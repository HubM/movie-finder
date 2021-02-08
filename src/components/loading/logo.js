import React from "react";

import Logo from "../Logo";

class LoadingLogo extends React.Component {
  render() {
    return <div className="app-loading"><Logo width="100px" height="100px" /></div>
  }
}

export default LoadingLogo;


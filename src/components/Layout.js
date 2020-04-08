import React, { useState } from "react";

import Navigation from "./Navigation";
import Logo from "./Logo";


export default function Layout (props) {
  const [isOpened, changeNavState ] = useState(false);

  return (
    <div>
      <header>
        <div className="header-first-level">
          <Logo />
          <button className={`menuActivator ${isOpened ? "open" : "close"}`} onClick={() => changeNavState(!isOpened)}>+</button>
        </div>
        <div className={`header-second-level ${isOpened ? "open" : ""}`}>
          <Navigation onClick={() => changeNavState(!isOpened) }/>
        </div>
      </header>
      <div className="page">
        {props.children}
      </div>
    </div>
  );
}
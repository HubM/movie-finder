import { useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header(props) {
  const [isOpened, changeNavState] = useState(false);
  const history = useHistory();

  function GoToHomepage() {
    if (history.location.pathname !== "/") {
      history.push("/");
    }
  }
  return (
    <header>
      <div className="header-first-level">
        <Logo onClickFunction={GoToHomepage} />
        <button className={`menuActivator ${isOpened ? "open" : "close"}`} onClick={() => changeNavState(!isOpened)}>
          +
        </button>
      </div>
      <div className={`header-second-level ${isOpened ? "open" : ""}`}>
        <Navigation onClick={() => changeNavState(!isOpened)} />
      </div>
    </header>
  );
}

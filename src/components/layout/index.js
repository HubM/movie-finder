import React from "react";

import Header from "./header";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <main>
        <div className="page">{props.children}</div>
      </main>
    </div>
  );
}

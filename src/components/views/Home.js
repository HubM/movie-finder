import { useState } from "react";

import citations from "../../helpers/citations";

export default function Home() {
  const [famous, setCitation] = useState({ ...citations[Math.floor(Math.random() * citations.length)] });
  return (
    <section className="home">
      <div>
        <p className="famous-citation">{famous.citation}</p>
        <p className="famous-author">{famous.author}</p>
        <button onClick={() => setCitation({ ...citations[Math.floor(Math.random() * citations.length)] })} className="btn-action">
          {" "}
          Recommencer
        </button>
      </div>
    </section>
  );
}

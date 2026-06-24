import { useState } from "react";
import StickerCard from "./components/StickerCard";
import { stickers } from "./data/stickers";

function App() {

  const initialState = {};

  stickers.forEach((sticker) => {
    initialState[sticker.id] = "falta";
  });

  const [status, setStatus] = useState(initialState);

  const handleStatusChange = (id) => {
    setStatus((prev) => {

      const currentStatus = prev[id];

      let nextStatus;

      if (currentStatus === "falta") {
        nextStatus = "tengo";
      } else if (currentStatus === "tengo") {
        nextStatus = "repetida";
      } else {
        nextStatus = "falta";
      }

      return {
        ...prev,
        [id]: nextStatus,
      };
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Álbum Mundial 2026</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {stickers.slice(0, 5).map((sticker) => (
          <StickerCard
            key={sticker.id}
            number={sticker.code}
            name={sticker.name}
            group={sticker.group}
            status={status[sticker.id]}
            onClick={() => handleStatusChange(sticker.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
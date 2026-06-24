import { useState } from "react";
import StickerCard from "./components/StickerCard";
import { stickers } from "./data/stickers";

function App() {
  const initialState = {};

  stickers.forEach((sticker) => {
    initialState[sticker.id] = "falta";
  });

  const [status, setStatus] = useState(initialState);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");

  const handleStatusChange = (id) => {
    setStatus((prev) => {
      const current = prev[id];

      let next;

      if (current === "falta") {
        next = "tengo";
      } else if (current === "tengo") {
        next = "repetida";
      } else {
        next = "falta";
      }

      return {
        ...prev,
        [id]: next,
      };
    });
  };

  const filteredStickers = stickers.filter((sticker) => {
    const matchesSearch =
      sticker.name.toLowerCase().includes(search.toLowerCase()) ||
      sticker.code.toLowerCase().includes(search.toLowerCase());

    const currentStatus = status[sticker.id];

    const matchesFilter =
      filter === "Todas" ||
      (filter === "Tengo" && currentStatus === "tengo") ||
      (filter === "Repetidas" && currentStatus === "repetida") ||
      (filter === "Faltan" && currentStatus === "falta");

    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Álbum Mundial 2026</h1>

      <input
        type="text"
        placeholder="Buscar figurita"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "10px",
        }}
      >
        <option>Todas</option>
        <option>Tengo</option>
        <option>Repetidas</option>
        <option>Faltan</option>
      </select>

      <h3>Figuritas visibles: {filteredStickers.length}</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {filteredStickers.map((sticker) => (
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
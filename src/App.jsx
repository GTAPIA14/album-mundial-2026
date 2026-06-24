import { useState, useEffect } from "react";
import StickerCard from "./components/StickerCard";
import AlbumSummary from "./components/AlbumSummary";
import { stickers } from "./data/stickers";

function App() {
  const initialState = {};

  stickers.forEach((sticker) => {
    initialState[sticker.id] = "falta";
  });

  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem("album");

    return saved ? JSON.parse(saved) : initialState;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    localStorage.setItem(
      "album",
      JSON.stringify(status)
    );
  }, [status]);

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

  const tengo = Object.values(status).filter(
    (s) => s === "tengo"
  ).length;

  const repetidas = Object.values(status).filter(
    (s) => s === "repetida"
  ).length;

  const faltan = Object.values(status).filter(
    (s) => s === "falta"
  ).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Álbum Mundial 2026</h1>

      <AlbumSummary
        total={stickers.length}
        tengo={tengo}
        repetidas={repetidas}
        faltan={faltan}
      />

      <input
        type="text"
        placeholder="Buscar figurita"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
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
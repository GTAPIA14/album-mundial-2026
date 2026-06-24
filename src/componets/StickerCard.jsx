function StickerCard({ number, name, group, status }) {

  const colors = {
    tengo: "#90EE90",
    repetida: "#FFD700",
    falta: "#D3D3D3",
  };

  return (
    <div
      style={{
        backgroundColor: colors[status],
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <h3>{number}</h3>
      <p>{name}</p>
      <p>{group}</p>
    </div>
  );
}

export default StickerCard;
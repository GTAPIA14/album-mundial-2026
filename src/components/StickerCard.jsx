function StickerCard({
  number,
  name,
  group,
  status,
  onClick,
}) {

  const colors = {
    tengo: "#90EE90",
    repetida: "#FFD700",
    falta: "#D3D3D3",
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors[status],
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "220px",
        cursor: "pointer",
      }}
    >
      <h3>{number}</h3>
      <h4>{name}</h4>
      <p>{group}</p>
      <strong>Estado: {status}</strong>
    </div>
  );
}

export default StickerCard;
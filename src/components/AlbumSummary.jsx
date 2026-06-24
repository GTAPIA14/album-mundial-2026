function AlbumSummary({
  total,
  tengo,
  repetidas,
  faltan,
}) {
  const porcentaje = ((tengo / total) * 100).toFixed(1);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Resumen del Álbum</h2>

      <p>Total de figuritas: {total}</p>
      <p>Tengo: {tengo}</p>
      <p>Repetidas: {repetidas}</p>
      <p>Faltan: {faltan}</p>
      <p>Completado: {porcentaje}%</p>
    </div>
  );
}

export default AlbumSummary;
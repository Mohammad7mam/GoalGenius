export default function MenuAppBar({ imageData, activeIndex }) {
  const active = imageData[activeIndex];

  return (
    <div
      className="background-image"
      style={{
        backgroundColor: active.color,
      }}
    >
      {imageData.map((item, index) => (
        <img
          key={index}
          src={item.image}
          alt={`background-${index}`}
          style={{
            mixBlendMode: item.blendMode,
          }}
          className={index === activeIndex ? "active" : ""}
        />
      ))}
    </div>
  );
}

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: "120px",
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img
          src="img1.jpg"
          alt="Gallery"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  // If only one image -> show directly
  if (images.length === 1) {
    return (
      <div style={{
        height: "120px",
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img
          src={images[0].image}
          alt="Gallery"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  // Multiple images -> slider
  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div style={{
      position: "relative",
      height: "120px",
      width: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <img
        src={images[currentIndex].image}
        alt="Gallery"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </div>
  );
};

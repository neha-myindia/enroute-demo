import React, { useState } from "react";

const fallbackImage = "https://via.placeholder.com/300x120?text=No+Image";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div style={{ width: "300px", height: "120px", background: "#f5f5f5" }}>
        <img
          src={fallbackImage}
          alt="Fallback"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  const nextSlide = () => {
    setError(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setError(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "120px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        background: "#00000005",
      }}
    >
      {/* Current Image (with error handling) */}
      <img
        src={error ? fallbackImage : images[currentIndex].image}
        alt={images[currentIndex].caption || `slide-${currentIndex}`}
        onError={() => setError(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          fontSize: "18px",
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
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ›
      </button>

      {/* Progress Indicators */}
      {/* <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "4px",
        }}
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "20px",
              height: "4px",
              borderRadius: "2px",
              background: idx === currentIndex ? "gray" : "#ccc",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;

import React, { useState, useEffect } from "react";
import "./Gallery.css";
import clinicImg from "../../assets/image/clinic.png";
import Marketing from "../../assets/image/market.png";
import Law from "../../assets/image/law.png";
import Engineering from "../../assets/image/eng.png";
import Farmacy from "../../assets/image/farmacy.png";

export default function Gallery() {
  const images = [
    {
      src: clinicImg,
      link: "https://my-clinic-chi.vercel.app/",
    },
    {
      src: Marketing,
      link: "https://unsplash.com/photos/LNRyGwIJr5c",
    },
    {
      src: Law,
      link: "https://unsplash.com/photos/cyFBmFEsytU",
    },
    {
      src: Engineering,
      link: "https://unsplash.com/photos/6VhPY27jdps",
    },
    {
      src: Farmacy,
      link: "https://unsplash.com/photos/GXMr7BadXQo",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const angle = 360 / images.length;

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (idx) => {
    if (idx === currentIndex) {
      window.open(images[idx].link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="gallery-wrapper">
      <div
        className="gallery"
        style={{ transform: `rotateY(-${currentIndex * angle}deg)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={`Image ${idx}`}
            className={`gallery-image ${idx === currentIndex ? "active" : ""}`}
            style={{
              transform: `rotateY(${idx * angle}deg) translateZ(250px)`,
              cursor: idx === currentIndex ? "pointer" : "default",
            }}
            onClick={() => handleImageClick(idx)}
          />
        ))}
      </div>
      <div className="gallery-controls">
        <button onClick={prevImage}>◀</button>
        <button onClick={nextImage}>▶</button>
      </div>
    </div>
  );
}

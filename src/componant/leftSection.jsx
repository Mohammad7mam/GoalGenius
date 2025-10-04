import React, { useState, useEffect, useRef } from "react";

const img1 =
  "https://i.postimg.cc/1X4k30tv/fabian-schultz-Ygl-H7su-Wgg-Q-unsplash-2.png";
const img2 =
  "https://i.postimg.cc/KzpWwK5C/philbo-PMwa1zf-OYa-U-unsplash-2.png";
const img3 = "https://i.postimg.cc/BbrJW7g0/Untitled-2-031-3.png";

const img4 =
  "https://i.postimg.cc/502Gs58k/omar-ram-c-E1-U5cok7-JA-unsplash-4.png";

const img5 =
  "https://i.postimg.cc/MH4hMcMP/andrii-solok-Nmrxc-l86-Bc-unsplash-2.png";
const images = [img1, img3, img4, img5, img2];

const blendModes = [
  "hard-light",
  "hard-light",
  "hard-light",
  "hard-light",
  "hard-light",
];

const backgroundColors = [
  "#005F2D",
  "#005F2D",
  "#005F2D",
  "#005F2D",
  "#009245",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const leftSectionRef = useRef(null);
  const intervalRef = useRef(null);

  const changeImage = (next = true) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      const newIndex = next
        ? (prev + 1) % images.length
        : (prev - 1 + images.length) % images.length;
      return newIndex;
    });

    // اسمح بالتغيير بعد انتهاء التلاشي (1.2s في CSS)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const restartAutoChange = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeImage(true);
    }, 10000);
  };

  useEffect(() => {
    restartAutoChange();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (leftSectionRef.current) {
      leftSectionRef.current.style.backgroundColor =
        backgroundColors[currentIndex];
    }
  }, [currentIndex]);

  return (
    <div className="left-section" ref={leftSectionRef}>
      <div className="overlay"></div>

      {images.map((image, index) => (
        <img
          key={index}
          className={`slideshow-image ${
            index === currentIndex ? "active" : "inactive"
          }`}
          src={image}
          alt={`Slide ${index}`}
          style={{ mixBlendMode: blendModes[index] }}
        />
      ))}

      <button
        className="nav-btn prev-btn"
        onClick={() => {
          changeImage(false);
          restartAutoChange();
        }}
        disabled={isTransitioning}
      >
        &lt;
      </button>
      <button
        className="nav-btn next-btn"
        onClick={() => {
          changeImage(true);
          restartAutoChange();
        }}
        disabled={isTransitioning}
      >
        &gt;
      </button>
    </div>
  );
};

export default Slideshow;

import { useEffect, useState } from "react";
import "../styles/components/Carousel.css";

const Carousel = ({
  images,
  addClassCarousel = "",
  addClassContainer = "",
  currentCategory,
}) => {
  const [counter, setCounter] = useState(1);
  const [prevCategory, setPrevCategory] = useState(currentCategory);

  useEffect(() => {
    if (currentCategory !== prevCategory) {
      setCounter(1);
    }

    setPrevCategory(currentCategory);

    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  const nextImage = () => {
    if (counter === images.length) setCounter(1);
    else setCounter((prevCounter) => ++prevCounter);
  };

  return (
    <div
      className={`carousel-container d-flex justify-content-center ${addClassContainer}`}
    >
      <div className={`carousel ${addClassCarousel}`}>
        <div className="slides">
          {images.map((_, key) => (
            <input
              key={key + 1}
              type="radio"
              name="radio-btn"
              id={`radio${key + 1}`}
              checked={counter === key + 1}
              onChange={() => setCounter(key + 1)}
            />
          ))}
          {images.map((image, key) => (
            <div
              key={key + 1}
              className={`slide ${key + 1 === 1 ? "first" : ""}`}
            >
              <div className="carousel-text">
                <h1 className="featured-text">{image.title}</h1>
                <hr />
                <p style={{ margin: 0 }}>{image.description}</p>
              </div>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
          <div className="navigation-auto">
            {images.map((_, key) => (
              <div key={key + 1} className={`auto-btn${key + 1}`} />
            ))}
          </div>
        </div>
        <div className="manual-navigation">
          {images.map((_, key) => (
            <label
              key={key}
              htmlFor={`radio${key + 1}`}
              className="manual-btn"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

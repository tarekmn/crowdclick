import { useState } from "react";

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "stock0",
    "stock1",
    "stock2",
    "stock3",
    "stock4",
    "stock5",
    "stock6",
    "stock7",
    "stock8",
    "stock9",
    "stock10",
    "stock11",
    "stock12",
    "stock13",
    "stock14",
  ];

  const containerStyles = {
    width: "190px",
    height: "190px",
    margin: "0 auto",
  };

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    backgroundSize: "cover",
    backgroundImage: `url(/stock/${slides[currentIndex]}.png)`,
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "-40px",
    fontSize: "45px",
    color: "black",
    zIndex: 1,
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "-40px",
    fontSize: "45px",
    color: "black",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div style={containerStyles}>
        <div style={sliderStyles}>
          <div style={leftArrowStyles} onClick={goToPrevious}>
            &#9664;
          </div>
          <div style={slideStyles}></div>
          <div style={rightArrowStyles} onClick={goToNext}>
            &#9654;
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;

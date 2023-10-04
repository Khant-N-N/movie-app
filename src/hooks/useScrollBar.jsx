import { useState } from "react";

const useScrollBar = (ids) => {
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);
  const handleScrollRight = () => {
    document.getElementById(ids).scrollLeft += 300;
  };
  const handleScrollLeft = () => {
    document.getElementById(ids).scrollLeft -= 300;
  };

  const handleScroll = () => {
    const containerWidth = document.getElementById(ids).offsetWidth;
    const scrollPosition = document.getElementById(ids).scrollLeft;
    const scrollWidth = document.getElementById(ids).scrollWidth;

    if (scrollPosition === 0) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }

    if (scrollPosition + containerWidth >= scrollWidth - 10) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }
  };
  return {
    handleScroll,
    handleScrollLeft,
    handleScrollRight,
    disableLeft,
    disableRight,
  };
};

export default useScrollBar;

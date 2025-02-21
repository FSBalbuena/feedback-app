import { useLayoutEffect, useEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const updateSize = (): void => {
      if (isMobile !== window.innerWidth < 768) {
        setIsMobile((prevIsMobile) => !prevIsMobile);
      }
    };
    window.addEventListener("resize", updateSize);

    return (): void => window.removeEventListener("resize", updateSize);
  }, [isMobile]);

  return isMobile;
};

export default useIsMobile;

import { useMediaQuery } from "react-responsive";

const useResponsiveColumnCount = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 639 });
  const isMediumScreen = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isLargeScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const columnCount = isSmallScreen
    ? 1
    : isMediumScreen
    ? 2
    : isLargeScreen
    ? 3
    : 4;

  return columnCount;
};

export default useResponsiveColumnCount;
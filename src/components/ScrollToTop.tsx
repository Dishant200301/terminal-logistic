import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  location?: { pathname: string };
}

const ScrollToTop = ({ location: externalLocation }: ScrollToTopProps = {}) => {
  const routerLocation = useLocation();
  const pathname = externalLocation?.pathname ?? routerLocation.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

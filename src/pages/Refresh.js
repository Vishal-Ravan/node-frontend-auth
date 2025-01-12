import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Refresh = ({setIsAuth}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsAuth(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuth]);
  return null;
};

export default Refresh;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./AnimatedCircle.css";

const AnimatedCircle = () => {
  const { user } = useContext(UserContext);
  const [showText, setShowText] = useState(false);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const showCircleTimer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 15 && currentHour < 12) {
        setGreeting("Buen día");
      } else if (currentHour >= 13 && currentHour < 19) {
        setGreeting("Buenas tardes");
      } else {
        setGreeting("Buenas noches");
      }
    };

    getGreeting();

    // Redirigir automáticamente después de 5 segundos
    setTimeout(() => {
      navigate("/");
    }, 15000); // Esperamos 2 segundos adicionales después de mostrar la frase

    return () => {
      clearTimeout(showCircleTimer);
    };
  }, []);

  return (
    <div className="container-circles">
      <div className={`circle ${showText ? "showText" : ""}`}>
        <div className={`point red ${showText ? "joined red" : ""}`}></div>
        <div className={`point black ${showText ? "joined black" : ""}`}></div>
        <div
          className={`point yellow ${showText ? "joined yellow" : ""}`}
        ></div>
        <div className={`point blue ${showText ? "joined blue" : ""}`}></div>
        {showText && (
          <div className="joined">
            {user ? (
              <>
                <h5 className="title-joined">Comunidad Mocoví</h5>
                <img className="img-joined" src={user.profilePicture}/>
                <p>{greeting}, {user.username}</p>
              </>
            ) : (
              <h5 className="title-joined">Hasta luego</h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCircle;

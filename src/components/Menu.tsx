import "../styles/menu.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

type Props = {
  menuState: boolean;
  toggleMenu: () => void;
};

const Menu = ({ menuState, toggleMenu }: Props) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState({
    home: false,
    about: false,
    contact: false,
    finder: false,
    help: false,
    reviews: false,
  });
  const { REACT_APP_URL } = process.env;

  useEffect(() => {
    if (
      Object.hasOwn(
        activeTab,
        window.location.href.slice(REACT_APP_URL ? REACT_APP_URL.length + 1 : 0)
      )
    ) {
      setActiveTab((prev) => {
        return {
          home: false,
          about: false,
          contact: false,
          finder: false,
          help: false,
          reviews: false,
          [window.location.href.slice(
            REACT_APP_URL ? REACT_APP_URL.length + 1 : 0
          )]: true,
        };
      });
    }
  }, [menuState, location]);

  return (
    <div
      className="menu--container"
      style={{
        zIndex: menuState ? "1" : "-2",
        opacity: menuState ? "100" : "0",
      }}
    >
      <div
        className="menu"
        style={{
          right: menuState ? (isBrowser ? "17px" : "0px") : "-1000px",
          transition: "all linear .5s",
        }}
      >
        <section
          style={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <LuMenu className="menu--menu" onClick={toggleMenu} />
        </section>
        <Link className="menu--item" to={"/home"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.home ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            Home
          </h3>
        </Link>
        <Link className="menu--item" to={"/finder"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.finder ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            Finder
          </h3>
        </Link>
        <Link className="menu--item" to={"/contact"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.contact ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            Contact
          </h3>
        </Link>
        <Link className="menu--item" to={"/about"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.about ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            About
          </h3>
        </Link>
        <Link className="menu--item" to={"/reviews"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.reviews ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            Reviews
          </h3>
        </Link>
        <Link className="menu--item" to={"/help"} onClick={toggleMenu}>
          <h3
            style={{
              borderBottom: activeTab.help ? "2px solid #d92323" : "none",
              fontWeight: "500",
            }}
          >
            Help
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Menu;

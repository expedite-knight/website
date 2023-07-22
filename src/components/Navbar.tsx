import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";

type Props = {
    menuState: boolean;
    toggleMenu: () => void;
};

const Navbar = ({ menuState, toggleMenu }: Props) => {
    const [update, toggleUpdate] = useState(false);
    const [activeTab, setActiveTab] = useState({
        home: false,
        about: false,
        contact: false,
        finder: false,
        help: false,
    });
    const { REACT_APP_URL } = process.env;

    useEffect(() => {
        if (
            Object.hasOwn(
                activeTab,
                window.location.href.slice(
                    REACT_APP_URL ? REACT_APP_URL.length + 1 : 0
                )
            )
        ) {
            setActiveTab((prev) => {
                return {
                    home: false,
                    about: false,
                    contact: false,
                    finder: false,
                    help: false,
                    [window.location.href.slice(
                        REACT_APP_URL ? REACT_APP_URL.length + 1 : 0
                    )]: true,
                };
            });
        }
    }, [update]);

    return (
        <div
            className="navbar"
            style={{
                zIndex: menuState ? 0 : 100,
                boxShadow: "0 4px 8px 0 rgba(110, 110, 110, 0.2)",
            }}
        >
            <img
                src={"/assets/ek_logo_trim.jpg"}
                className="navbar--logo"
                alt="Expedite Knight logo"
            />
            <section className="navbar--container">
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        className="navbar--button"
                        to="/home"
                        style={{
                            color: activeTab.home ? "gray" : "black",
                        }}
                        onClick={() => toggleUpdate((prev) => !prev)}
                    >
                        Home
                    </Link>
                    <div
                        style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: activeTab.home
                                ? "#d92323"
                                : "white",
                            transition: "all linear .2s",
                        }}
                    ></div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        className="navbar--button"
                        to="/finder"
                        style={{
                            color: activeTab.finder ? "gray" : "black",
                        }}
                        onClick={() => toggleUpdate((prev) => !prev)}
                    >
                        Finder
                    </Link>
                    <div
                        style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: activeTab.finder
                                ? "#d92323"
                                : "white",
                            transition: "all linear .2s",
                        }}
                    ></div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        className="navbar--button"
                        to="/contact"
                        style={{
                            color: activeTab.contact ? "gray" : "black",
                        }}
                        onClick={() => toggleUpdate((prev) => !prev)}
                    >
                        Contact
                    </Link>
                    <div
                        style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: activeTab.contact
                                ? "#d92323"
                                : "white",
                            transition: "all linear .2s",
                        }}
                    ></div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        className="navbar--button"
                        to="/about"
                        style={{
                            color: activeTab.about ? "gray" : "black",
                        }}
                        onClick={() => toggleUpdate((prev) => !prev)}
                    >
                        About
                    </Link>
                    <div
                        style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: activeTab.about
                                ? "#d92323"
                                : "white",
                            transition: "all linear .2s",
                        }}
                    ></div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        className="navbar--button"
                        to="help"
                        style={{
                            color: activeTab.help ? "gray" : "black",
                        }}
                        onClick={() => toggleUpdate((prev) => !prev)}
                    >
                        Help
                    </Link>
                    <div
                        style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: activeTab.help
                                ? "#d92323"
                                : "white",
                            transition: "all linear .2s",
                        }}
                    ></div>
                </div>
            </section>
            <section className="navbar--menu-container">
                <LuMenu
                    className="navbar--menu"
                    style={{
                        color: menuState ? "white" : "black",
                        transition: "all linear .0s",
                    }}
                    onClick={toggleMenu}
                />
            </section>
        </div>
    );
};

export default Navbar;

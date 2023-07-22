import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Finder from "./pages/Finder";
import Help from "./pages/Help";
import Menu from "./components/Menu";
import Error from "./pages/Error";
import ErrorBoundary from "./components/ErrorBoundary";
import Redirect from "./components/Redirect";

/*when the mobile menu is out change the z-index of the container class
to 0, idk if i can do that directly so it might have to be done on every page
manually*/
function App() {
    const [menuState, setMenuState] = useState(false);
    const [loading, setLoading] = useState(false);
    const { REACT_APP_API_URL, REACT_APP_URL } = process.env;

    const toggleMenu = () => {
        setMenuState((prev) => !prev);
    };

    const handleResize = () => {
        if (window.innerWidth > 1000) setMenuState(false);
    };

    const toggleMenuOff = () => {
        setMenuState(() => false);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", toggleMenuOff);
        document.body.style.overflowY = menuState ? "scroll" : "scroll";

        setLoading(true);

        const page = window.location.href.slice(REACT_APP_URL.length + 1);
        fetch(`${REACT_APP_API_URL}/api/v1/analytics/view`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: page,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log("ERROR:", error);
                setLoading(false);
            });

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", toggleMenuOff);
        };
    }, [menuState]);

    return (
        <BrowserRouter>
            <ErrorBoundary>
                {/* <Popup /> */}
                <Menu menuState={menuState} toggleMenu={toggleMenu} />
                <Navbar menuState={menuState} toggleMenu={toggleMenu} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        minHeight: "calc(100vh - 200px)",
                        position: "relative",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Redirect />} />
                        <Route
                            path="/home"
                            element={<Home menuState={menuState} />}
                        />
                        <Route
                            path="/about"
                            element={<About menuState={menuState} />}
                        />
                        <Route
                            path="/contact"
                            element={<Contact menuState={menuState} />}
                        />
                        <Route
                            path="/finder"
                            element={<Finder menuState={menuState} />}
                        />
                        <Route
                            path="/help"
                            element={<Help menuState={menuState} />}
                        />
                        <Route
                            path="/*"
                            element={<Error menuState={menuState} />}
                        />
                    </Routes>
                </div>
                <Footer />
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;

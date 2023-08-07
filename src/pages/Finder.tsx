import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import "../styles/finder.css";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
    menuState: boolean;
};

const Finder = ({ menuState }: Props) => {
    const [targetLocation, setTargetLocation] = useState({
        lat: 35.2,
        long: -80.8,
    });
    const [destination, setDestination] = useState("Concord+NC");
    const [routeId, setRouteId] = useState<string | null>(null);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { REACT_APP_API_URL } = process.env;
    const queryParams = new URLSearchParams(window.location.search);

    const fetchLocation = () => {
        if (routeId) {
            console.log("fetching: ", routeId)
            setLoading(true);
            fetch(`${REACT_APP_API_URL}/api/v1/routes/location`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    routeId: routeId,
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.status === 200) {
                        setTargetLocation({
                            lat: data.body.route.activeLocation.lat,
                            long: data.body.route.activeLocation.long,
                        });
                        setDestination(
                            data.body.route.destination.replaceAll(" ", "+")
                        );
                        setIsActive(true);
                        setError(false);
                    } else {
                        setError(true);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("ERROR:", error);
                    setError(true);
                    setLoading(false);
                    setRouteId(null);
                });
        } else if(queryParams.has("route")) {
            setRouteId(queryParams.get("route"));
            setLoading(true);
            fetch(`${REACT_APP_API_URL}/api/v1/routes/location`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    routeId: queryParams.get("route"),
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.status === 200) {
                        setTargetLocation({
                            lat: data.body.route.activeLocation.lat,
                            long: data.body.route.activeLocation.long,
                        });
                        setDestination(
                            data.body.route.destination.replaceAll(" ", "+")
                        );
                        setIsActive(true);
                        setError(false);
                    } else {
                        setError(true);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("ERROR:", error);
                    setError(true);
                    setLoading(false);
                    setRouteId(null);
                });
        }
    };

    useEffect(() => {
        if (routeId || queryParams.has("route")) {
            fetchLocation();
        }
        const interval = setInterval(() => {
            if (!error && routeId) {
                fetchLocation();
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [routeId, error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserInput(value);
    };

    return (
        <div className="container" style={{ zIndex: menuState ? "-1" : "0" }}>
            <section className="img-container">
                <img
                    src="https://img.freepik.com/free-vector/hand-drawn-flat-design-international-trade_23-2149154534.jpg?w=1480&t=st=1689302926~exp=1689303526~hmac=484e32200f4c3d919d1465309ef3026157c143183adf06642af28cb802586c98"
                    className="header-img"
                    alt="Error loading img:/"
                />
                <h2 className="img-header">
                    <span style={{ color: "#d92323" }}>FIND</span>
                    <span>YOUR</span> <span>ROUTE</span>
                </h2>
            </section>
            <section className="content">
                <section
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <h3 className="header">Route ID:</h3>
                    {/* <small style={{ color: "red", display: error ? "inline" : "none" }}>
                        Unable to find route or route is inactive
                    </small> */}
                    <input
                        className="input"
                        placeholder="Ex: 64970caf5c13229e1adf11a0"
                        value={userInput}
                        onChange={handleChange}
                    />
                    {loading ? (
                        <CustomButton
                            size={20}
                            background={"#d92323"}
                            onClick={() => {
                                if (userInput.trim() !== "") {
                                    setRouteId(userInput);
                                } else {
                                    setRouteId(null);
                                }
                            }}
                        >
                            <ClipLoader
                                color={"white"}
                                loading={true}
                                size={15}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </CustomButton>
                    ) : (
                        <CustomButton
                            size={20}
                            background={"#d92323"}
                            onClick={() => {
                                if (userInput.trim() !== "") {
                                    setRouteId(userInput);
                                } else {
                                    setRouteId(null);
                                }
                            }}
                        >
                            Search
                        </CustomButton>
                    )}
                </section>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 10
                    }}
                >
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5}}>
                        {routeId && <h4>Status:</h4>}
                        {isActive && <h4 style={{color: "#03c04a", background: "#AFE1AF", paddingInline: 10, paddingBlock: 5, borderRadius: 5}}>Active</h4>}
                        {!isActive && error ? <h4 style={{color: "#de3623", background: "pink", paddingInline: 10, paddingBlock: 5, borderRadius: 5}}>Inactive</h4> : null}
                    </div>

                    <iframe
                        title="Route location map"
                        width="600"
                        height="300"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_API_KEY}&origin=${targetLocation.lat}%2C${targetLocation.long}&destination=${destination}&zoom=10`}
                        allowFullScreen
                    ></iframe>
                </div>

                <div style={{ textAlign: "center" }}>
                    <h3 className="subheader" style={{ fontWeight: 500 }}>
                        To receive SMS updates text "verify" to +1 704-686-8257
                    </h3>
                </div>
            </section>
        </div>
    );
};

export default Finder;

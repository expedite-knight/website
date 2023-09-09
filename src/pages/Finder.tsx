import React, { ReactNode, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import "../styles/finder.css";
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  menuState: boolean;
};

const Finder = ({ menuState }: Props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [routeParam, setRouteParam] = useState<null | string>(
    queryParams.get("route")
  );
  const [routeId, setRouteId] = useState<string | null>(
    routeParam ? routeParam : null
  );
  const [userInput, setUserInput] = useState(routeParam ? routeParam : "");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState(false);
  const { REACT_APP_API_URL, REACT_APP_GOOGLE_API_KEY } = process.env;
  const [mapQuery, setMapQuery] = useState(
    `place?key=${REACT_APP_GOOGLE_API_KEY}&q=United+States+Of+America`
  );
  const [statusElement, setStatusElement] = useState<ReactNode | null>(null);

  const fetchLocation = (searchString: string) => {
    setLoading(true);
    fetch(`${REACT_APP_API_URL}/api/v1/routes/location`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeId: searchString,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === 200 && data.body.route.active) {
          setNotFound(false);
          setMapQuery(
            `directions?key=${REACT_APP_GOOGLE_API_KEY}&origin=${
              data.body.route.activeLocation.lat
            }%2C${
              data.body.route.activeLocation.long
            }&destination=${data.body.route.destination.replaceAll(
              " ",
              "+"
            )}&zoom=10`
          );
          setIsActive(true);
          if (data.body.route.deliveryMode) setDeliveryMode(true);
          else setDeliveryMode(false);

          if (data.body.route.delivered) setDelivered(true);
          else setDelivered(false);

          //route is found but not active
        } else if (data.status === 200 && !data.body.route.active) {
          setIsActive(false);
          setNotFound(false);
          setMapQuery(
            `place?key=${REACT_APP_GOOGLE_API_KEY}&q=${data.body.route.destination.replaceAll(
              " ",
              "+"
            )}`
          );
          if (data.body.route.deliveryMode) setDeliveryMode(true);
          else setDeliveryMode(false);

          if (data.body.route.delivered) setDelivered(true);
          else setDelivered(false);
        } else {
          setIsActive(false);
          setNotFound(true);
          setMapQuery(
            `place?key=${REACT_APP_GOOGLE_API_KEY}&q=United+States+Of+America`
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        //bad request
        console.log("ERROR:", error);
        setMapQuery(
          `place?key=${REACT_APP_GOOGLE_API_KEY}&q=United+States+Of+America`
        );
        setIsActive(false);
        setLoading(false);
        setRouteId(null);
      });
  };

  useEffect(() => {
    if (routeId) fetchLocation(routeId);

    const interval = setInterval(() => {
      if (isActive && routeId) {
        console.log("isActive: ", isActive, "route id: ", routeId);
        fetchLocation(routeId!);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [routeId, isActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
  };

  useEffect(() => {
    if (routeId) {
      if (notFound) {
        setStatusElement(
          <h4
            style={{
              color: "gray",
              background: "gainsboro",
              paddingInline: 10,
              paddingBlock: 5,
              borderRadius: 5,
            }}
          >
            Not Found
          </h4>
        );
      } else if (isActive) {
        setStatusElement(
          <h4
            style={{
              color: "#03c04a",
              background: "#AFE1AF",
              paddingInline: 10,
              paddingBlock: 5,
              borderRadius: 5,
            }}
          >
            {deliveryMode ? "En Route" : "Active"}
          </h4>
        );
      } else if (!isActive && delivered && deliveryMode) {
        setStatusElement(
          <h4
            style={{
              color: "#0096FF",
              background: "#ADD8E6",
              paddingInline: 10,
              paddingBlock: 5,
              borderRadius: 5,
            }}
          >
            Delivered
          </h4>
        );
      } else {
        setStatusElement(
          <h4
            style={{
              color: "#de3623",
              background: "pink",
              paddingInline: 10,
              paddingBlock: 5,
              borderRadius: 5,
            }}
          >
            Inactive
          </h4>
        );
      }
    }
  }, [routeId, delivered, deliveryMode, isActive, notFound]);

  return (
    <div className="container" style={{ zIndex: menuState ? "-1" : "0" }}>
      <section className="img-container">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-international-trade_23-2149154534.jpg?w=1480&t=st=1689302926~exp=1689303526~hmac=484e32200f4c3d919d1465309ef3026157c143183adf06642af28cb802586c98"
          className="header-img"
          alt="Error loading img:/"
        />
        <AnimatePresence>
          <motion.h2
            className="img-header"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            key="title"
          >
            <span style={{ color: "#d92323" }}>FIND</span>
            <span>YOUR</span>
            <span>ROUTE</span>
          </motion.h2>
        </AnimatePresence>
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
                  setRouteParam(null);
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
                  fetchLocation(userInput);
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
            gap: 10,
          }}
        >
          <div className="iframe-container">
            <div className="route-status-indicator">
              {statusElement && statusElement}
            </div>
            <iframe
              title="Route location map"
              className="responsive-iframe"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/${mapQuery}`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* <p style={{ textDecoration: "underline" }}>Click for route details</p> */}
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

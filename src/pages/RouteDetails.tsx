import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import "../styles/routeDetails.css";

type Props = {
  menuState: boolean;
};

type RouteDetails = {
  active: boolean;
  delivered: boolean;
  deliveryMode: boolean;
  destination: string;
  disabled: boolean;
  lastActivatedAt: number;
  startingETA: number;
  coreReturned: boolean;
  arrivalTime: number;
};

const { REACT_APP_API_URL, REACT_APP_GOOGLE_API_KEY } = process.env;

const RouteDetails = ({ menuState }: Props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [routeId, setRouteId] = useState<null | string>(queryParams.get("id"));
  const [routeDetails, setRouteDetails] = useState<null | RouteDetails>(null);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/v1/routes/details`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: routeId,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === 200) {
          setRouteDetails(data.body.message);
        }
      })
      .catch((error) => {
        //bad request
        console.log("ERROR:", error);
      });
  }, []);

  console.log("res: ", routeDetails);

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
            <span style={{ color: "#d92323" }}>ROUTE</span>
            <span>DETAILS</span>
          </motion.h2>
        </AnimatePresence>
      </section>
      <section className="content">
        <h1 className="title">ID: {routeId}</h1>
        <section className="details">
          <p>
            <span style={{ fontWeight: 600, textDecoration: "underline" }}>
              Status:
            </span>{" "}
            {routeDetails?.active
              ? "Active"
              : routeDetails?.deliveryMode
              ? "Delivered"
              : "Inactive"}
          </p>
          <p>
            {" "}
            <span style={{ fontWeight: 600, textDecoration: "underline" }}>
              To:
            </span>{" "}
            {routeDetails?.destination}
          </p>
          <p>
            <span style={{ fontWeight: 600, textDecoration: "underline" }}>
              Left:
            </span>{" "}
            {moment(routeDetails?.lastActivatedAt).format(
              "MMM Do YYYY, h:mm:ss a"
            )}
          </p>
          {routeDetails?.delivered ? (
            <p>
              <span style={{ fontWeight: 600, textDecoration: "underline" }}>
                Delivered:
              </span>{" "}
              {moment(routeDetails?.arrivalTime).format(
                "MMM Do YYYY, h:mm:ss a"
              )}
            </p>
          ) : (
            <p>
              <span style={{ fontWeight: 600, textDecoration: "underline" }}>
                Arrived:
              </span>{" "}
              {routeDetails?.arrivalTime
                ? moment(routeDetails?.arrivalTime).format(
                    "MMM Do YYYY, h:mm:ss a"
                  )
                : "In progress..."}
            </p>
          )}
          {routeDetails?.delivered && (
            <p>
              <span style={{ fontWeight: 600, textDecoration: "underline" }}>
                Core returned:
              </span>{" "}
              {routeDetails?.coreReturned ? "Yes" : "No"}
            </p>
          )}
        </section>
      </section>
    </div>
  );
};

export default RouteDetails;

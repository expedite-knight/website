import CustomButton from "../components/CustomButton";
import "../styles/home.css";
import "../styles/parallax.css";
import Card from "../components/Card";
import { LiaShippingFastSolid, LiaWrenchSolid, LiaStar } from "react-icons/lia";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { SiAwsfargate } from "react-icons/si";
import { HiArrowRight, HiOutlineLightBulb } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { BsArrowRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "@react-spring/web";

type Props = {
  menuState: boolean;
};

const Home = ({ menuState }: Props) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [moreReviewsButtonHover, setMoreReviewsButtonHover] = useState(false);
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      anon: true,
      name: "",
      body: "Best experience ive ever had with an expedite company",
      createdAt: new Date().getTime(),
    },
    {
      rating: 4,
      anon: false,
      name: "Jim Walsh",
      body: "It was quick and painlesss, I loved getting the sms updates ",
      createdAt: new Date().getTime(),
    },
    {
      rating: 5,
      anon: false,
      name: "Ben Johnson",
      body: "",
      createdAt: new Date().getTime(),
    },
  ]);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <div className="container" style={{ zIndex: menuState ? "-1" : "0" }}>
      <div className="content">
        <section className="dynamic">
          <AnimatePresence>
            <motion.img
              src="assets/EK_logo.png"
              className="home--logo"
              placeholder="image not available"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              key="logo"
            />
          </AnimatePresence>
          <section className="home--buttons">
            <Link
              className="button home--button"
              to={"/contact"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                color: "#d92323",
                textAlign: "center",
                textDecoration: "none",
                border: "2px solid #d92323",
              }}
            >
              Get a Quote
            </Link>
            <Link
              className="button home--button"
              to={"/finder"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "black",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Track Shipment
            </Link>
          </section>
        </section>
        <AnimatePresence>
          <motion.section
            className="home--reviews"
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 },
            }}
            initial="hidden"
            animate={control}
            key="reviews"
            ref={ref}
          >
            {reviews.map((review) => {
              return (
                <div className="home--review">
                  <h1>{review.anon ? "Anonymous" : review.name}</h1>
                  <div className="home--review-ratings">
                    <LiaStar
                      color={review.rating >= 1 ? "gold" : "gainsboro"}
                      size={30}
                    />
                    <LiaStar
                      color={review.rating >= 2 ? "gold" : "gainsboro"}
                      size={30}
                    />
                    <LiaStar
                      color={review.rating >= 3 ? "gold" : "gainsboro"}
                      size={30}
                    />
                    <LiaStar
                      color={review.rating >= 4 ? "gold" : "gainsboro"}
                      size={30}
                    />
                    <LiaStar
                      color={review.rating >= 5 ? "gold" : "gainsboro"}
                      size={30}
                    />
                  </div>
                  {review.body.trim() !== "" ? (
                    <p className="home--review-body">{review.body}</p>
                  ) : null}
                  <small className="home--review-date">
                    {moment().format("ll")}
                  </small>
                </div>
              );
            })}
          </motion.section>
        </AnimatePresence>
        <motion.div whileHover={{ scale: 1.25 }}>
          <Link
            to={"/reviews"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: moreReviewsButtonHover ? "pointer" : "default",
              textDecoration: "none",
              gap: 5,
            }}
            onMouseEnter={() => setMoreReviewsButtonHover((prev) => !prev)}
            onMouseLeave={() => setMoreReviewsButtonHover((prev) => !prev)}
          >
            <span
              style={{
                background: "none",
                border: "none",
                fontSize: 15,
                borderBottom: moreReviewsButtonHover
                  ? "1px solid black"
                  : "1px solid white",
                cursor: moreReviewsButtonHover ? "pointer" : "default",
                color: "black",
                textDecoration: "none",
              }}
            >
              See more reviews
            </span>
            <HiArrowRight
              style={{
                border: moreReviewsButtonHover
                  ? "1px solid black"
                  : "1px solid white",
                borderRadius: 20,
                padding: 5,
                fontSize: 15,
                cursor: moreReviewsButtonHover ? "pointer" : "default",
                color: "black",
              }}
            />
          </Link>
        </motion.div>
        <section className="home--cards">
          <Card header="Fast" body={<LiaShippingFastSolid />} />
          <Card header="Reliable" body={<VscWorkspaceTrusted />} />
          <Card header="Innovative" body={<HiOutlineLightBulb />} />
          <Card header="Logistics" body={<SiAwsfargate />} />
          <Card header="Services" body={<LiaWrenchSolid />} />
        </section>
      </div>
    </div>
  );
};

export default Home;

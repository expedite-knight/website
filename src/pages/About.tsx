import "../styles/about.css";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  menuState: boolean;
};
const About = ({ menuState }: Props) => {
  return (
    <div className="container" style={{ zIndex: menuState ? "-1 " : "0" }}>
      <section className="img-container">
        <img
          src="https://img.freepik.com/free-vector/isometric-logistics-composition-with-outdoor-scenery-warehouse-area-with-buldings-parcel-boxes-vans-trucks_1284-61844.jpg?w=1060&t=st=1689303322~exp=1689303922~hmac=aded6f11a3aa031d3e407f1dea6f3def980dc4dd3d2cc666006bbae86a05742f"
          className="header-img"
          alt="error loading img:/"
        />
        <AnimatePresence>
          <motion.h2
            className="img-header"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            key="title"
          >
            <span style={{ color: "#d92323" }}>ABOUT</span>
            <span>US</span>
          </motion.h2>
        </AnimatePresence>
      </section>
      <section className="content">
        <section className="about--info">
          <div className="about--info-top">
            <img
              src="/assets/terry.jpg"
              className="about--headshot"
              alt="Error loading img:/"
            />
            <span className="about--title">
              <h3 className="about--name">Terry Tubicsak</h3>
              <p>●</p>
              <h3 className="about--name">Field Technician</h3>
            </span>
          </div>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="about--bio">
            My name is Terry and a 10 year veteran of the U.S. Navy and 20 years
            of working on medical linear accelerators. I understand how
            important it is to get parts reliably and expeditiously.
          </p>
        </section>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "gray",
          }}
        ></div>
        <section className="about--info">
          <div className="about--info-top">
            <img
              src="https://th.bing.com/th/id/OIP.y84km38R4zbJ3S-XqjzQaQAAAA?pid=ImgDet&rs=1"
              className="about--headshot"
              alt="Error loading img:/"
            />
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h3 className="about--name">Kai Larson</h3>
              <p>●</p>
              <h3 className="about--name">Software Engineer</h3>
            </span>
          </div>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="about--bio">
            My name is Kai and I am a recent Illinois State University grad who
            now builds applications full time.
          </p>
        </section>
      </section>
    </div>
  );
};

export default About;

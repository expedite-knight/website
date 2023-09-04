import "../styles/help.css";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  menuState: boolean;
};
const Help = ({ menuState }: Props) => {
  return (
    <div className="container" style={{ zIndex: menuState ? "-1 " : "0" }}>
      <section className="img-container">
        <img
          src="https://img.freepik.com/free-vector/curiosity-people-concept-illustration_114360-11034.jpg?w=1060&t=st=1689303969~exp=1689304569~hmac=fce1b51674cbcecc7b3e00736667a51b8d740480c9d0fee2b37de55124192fa0"
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
            style={{ display: "flex", flexDirection: "row", gap: 0 }}
          >
            <span style={{ color: "#d92323" }}>H</span>
            <span>ELP</span>
          </motion.h2>
        </AnimatePresence>
      </section>
      <section className="content">
        <section className="help--question">
          <h2 className="help--title">How do I sign up for SMS?</h2>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="help--body">
            You can sign up for SMS by texting "verify" to +1 704-686-8257, that
            will allow us to send you an updated ETA at set intervals giving you
            a real time estimate of when you should expect your delivery to
            arrive
          </p>
        </section>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "gainsboro",
          }}
        ></div>
        <section className="help--question">
          <h2 className="help--title">How do I remove myself from a route?</h2>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="help--body">
            If you think you have been added to a route by mistake you can send
            the route id to the same number you got the route activation SMS
            from
          </p>
        </section>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "gainsboro",
          }}
        ></div>
        <section className="help--question">
          <h2 className="help--title">How do I stop SMS messages?</h2>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="help--body">
            If you no longer want to receive SMS updates you can text "unverify"
            to the same number you have been receiving updates from
          </p>
        </section>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "gainsboro",
          }}
        ></div>
        <section className="help--question">
          <h2 className="help--title">Who will be delivering my package</h2>
          <div
            style={{
              background: "#d92323",
              height: "2px",
              width: "50px",
              marginBottom: "-5px",
            }}
          ></div>
          <p className="help--body">
            Both Terry and Kai deliver depending on availability and distance
          </p>
        </section>
      </section>
    </div>
  );
};

export default Help;

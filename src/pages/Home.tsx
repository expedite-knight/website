import CustomButton from "../components/CustomButton";
import "../styles/home.css";
import "../styles/parallax.css";
import Card from "../components/Card";
import { LiaShippingFastSolid, LiaWrenchSolid } from "react-icons/lia";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { SiAwsfargate } from "react-icons/si";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { Link } from "react-router-dom";

type Props = {
    menuState: boolean;
};

const Home = ({ menuState }: Props) => {
    return (
        <div className="container" style={{ zIndex: menuState ? "-1" : "0" }}>
            <div className="content">
                <section className="dynamic">
                    <img src="assets/EK_logo.png" className="home--logo" />
                    <section className="home--buttons">
                        <Link
                            className="button home--button"
                            to={"/contact"}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#d92323",
                                color: "white",
                                textAlign: "center",
                                textDecoration: "none",
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

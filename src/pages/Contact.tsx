import { useState } from "react";
import "../styles/contact.css";
import CustomButton from "../components/CustomButton";
import ClipLoader from "react-spinners/ClipLoader";
import Popup from "../components/Popup";

type Props = {
    menuState: boolean;
};

const Contact = ({ menuState }: Props) => {
    const [error, setError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Could not send email:/");
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState("");
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [liftgate, setLiftgate] = useState(false);
    const [onPallet, setOnPallet] = useState(false);
    const { REACT_APP_API_URL } = process.env;

    const handleSubmit = () => {
        setLoading(true);
        fetch(`${REACT_APP_API_URL}/api/v1/quotes/process`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: item,
                pickup: pickup,
                dropoff: dropoff,
                name: name,
                email: email,
                number: number,
                length: length,
                width: width,
                height: height,
                weight: weight,
                liftgate: liftgate,
                onPallet: onPallet,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                console.log("DATA: ", data);
                if (data.status === 200) {
                    setError(false);
                } else {
                    setError(true);
                    setErrorMessage(
                        data?.body?.message
                            ? data.body.message[0]
                            : "Could not send email:/"
                    );
                }
                setEmailSent(true);
                setLoading(false);
                setTimeout(() => {
                    setEmailSent(false);
                }, 3000);
            })
            .catch((error) => {
                console.log("ERROR:", error);
                setLoading(false);
                setEmailSent(true);
                setError(true);
                setTimeout(() => {
                    setEmailSent(false);
                }, 3000);
            });
    };

    return (
        <div className="container" style={{ zIndex: menuState ? "-1 " : "0" }}>
            {emailSent && error ? (
                <Popup
                    message={errorMessage}
                    background={"#d92323"}
                    enabled={emailSent}
                />
            ) : (
                <Popup
                    message={"Email sent successfully"}
                    enabled={emailSent}
                />
            )}
            <section className="img-container">
                <img
                    src="https://img.freepik.com/free-vector/hand-drawn-international-trade_23-2149174377.jpg?w=1060&t=st=1689303046~exp=1689303646~hmac=b948ace17b07c7861861a55ac0cb64a890dd901abf1ea110d17dcff1408aff80"
                    className="header-img"
                    alt="Error loading img:/"
                />
                <h2 className="img-header">
                    <span style={{ color: "#d92323" }}>GET</span>
                    <span>A</span> <span>QUOTE</span>
                </h2>
            </section>
            <section className="content">
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column",
                    }}
                >
                    <h3 className="subheader" style={{ color: "black" }}>
                        Fill out this form for a quote
                    </h3>
                    <small style={{ color: "gray" }}>
                        *Dimensions in inches*
                    </small>
                </div>
                <section className="contact--quote">
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <section
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            width: "100%",
                        }}
                    >
                        <input
                            className="input"
                            style={{ width: "100%" }}
                            placeholder="L"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <input
                            className="input"
                            style={{ width: "100%" }}
                            placeholder="W"
                            value={width}
                            name="width"
                            onChange={(e) => setWidth(e.target.value)}
                        />
                        <input
                            className="input"
                            style={{ width: "100%" }}
                            placeholder="H"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </section>
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Weight (lbs.)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Pickup address"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                    />
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Dropoff address"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                    />
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        style={{ width: "100%" }}
                        placeholder="Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <section className="contact--checkboxes">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                            }}
                        >
                            <input
                                type="checkbox"
                                value={JSON.stringify(liftgate)}
                                onChange={(e) => setLiftgate((prev) => !prev)}
                                id="liftgate"
                            />
                            <label style={{ color: "gray" }} htmlFor="liftgate">
                                Liftgate needed
                            </label>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                            }}
                        >
                            <input
                                type="checkbox"
                                value={JSON.stringify(onPallet)}
                                onChange={(e) => setOnPallet((prev) => !prev)}
                                id="pallet"
                            />
                            <label style={{ color: "gray" }} htmlFor="pallet">
                                Item is on a pallet
                            </label>
                        </div>
                    </section>
                </section>
                {loading ? (
                    <CustomButton size={20} background={"#d92323"}>
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
                        onClick={handleSubmit}
                    >
                        Get Quote
                    </CustomButton>
                )}
            </section>
        </div>
    );
};

export default Contact;

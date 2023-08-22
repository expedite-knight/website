import CustomButton from "./CustomButton";
import React from "react";

type Props = {
  header?: string;
  body?: string | React.ReactNode;
  buttonText?: string;
  buttonBackground?: string;
};

const Card = ({ header, body, buttonText, buttonBackground }: Props) => {
  return (
    <section className="home--card">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3
          className="home--card-header"
          style={{ borderBottom: "1px solid red" }}
        >
          {header?.slice(0, 1)}
        </h3>
        <h3 className="home--card-header">{header?.slice(1)}</h3>
      </div>
      <p className="home--card-body">{body}</p>
      {buttonText && (
        <CustomButton background={buttonBackground} size={15}>
          {buttonText}
        </CustomButton>
      )}
    </section>
  );
};

export default Card;

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
            <h3 className="home--card-header">{header}</h3>
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

import React from "react";

type Props = {
    children?: React.ReactNode;
    size?: number;
    background?: string;
    color?: string;
    onClick?: () => void;
};

const CustomButton = ({
    children,
    size,
    background,
    color,
    onClick,
}: Props) => {
    return (
        <button
            style={{
                fontSize: `${size}px` || "1em",
                background: background || "#3399ff",
                color: color || "white",
            }}
            className="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CustomButton;

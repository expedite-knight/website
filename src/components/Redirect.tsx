import { useEffect } from "react";
const { REACT_APP_URL } = process.env;

const Redirect = () => {
    useEffect(() => {
        window.location.href = `${REACT_APP_URL}/home`;
    });
};

export default Redirect;

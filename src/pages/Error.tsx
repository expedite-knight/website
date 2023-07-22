import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="container" style={{ textAlign: "center" }}>
            <h1>This page does not exist:/</h1>
            <Link className="button" to="/home">
                Redirect to home
            </Link>
        </div>
    );
};

export default Error;

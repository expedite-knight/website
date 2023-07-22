import "../styles/popup.css";

type Props = {
    background?: string;
    message: string;
    enabled: boolean;
};

const Popup = ({ background, message, enabled }: Props) => {
    return (
        <div
            className="popup"
            style={{
                background: background ? background : "rgba(114, 159, 252, 1)",
                opacity: enabled ? 100 : 0,
                top: enabled ? 110 : 0,
            }}
        >
            <h4>{message}</h4>
        </div>
    );
};

export default Popup;

import "../styles/footer.css";
import { BsEnvelopeFill, BsMeta, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="footer">
            <section className="footer--items">
                <a
                    href="https://www.facebook.com/profile.php?id=100094194135739"
                    className="footer--icon"
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsMeta />
                </a>
                <a
                    href="https://twitter.com/ExpediteKnight"
                    className="footer--icon"
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsTwitter />
                </a>
                <a
                    href="mailto:terryt@expediteknight.net?subject=Hello Expedite Knight&body=I am contacting you to..."
                    className="footer--icon"
                    rel="noreferrer"
                >
                    <BsEnvelopeFill />
                </a>
            </section>
        </div>
    );
};

export default Footer;

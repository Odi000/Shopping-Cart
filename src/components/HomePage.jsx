import { Link } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Button from "./button";
import styles from "../css-modules/home-page.module.css"

function HomePage(props) {
    return (
        <div className={styles.homePage}>
            <NavBar />
            <Link to="/#"><Button>Shop Now</Button></Link>
            {props.children}
        </div>
    )
}

export default HomePage;
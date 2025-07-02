import styles from "../css-modules/footer.module.css";


export default function Footer({ backBtnLocation }) {

    return (
        <footer className={backBtnLocation.current === "/" ? styles.homepage : styles.footer}>
            <p>ElectroMart © 2025</p>
            <p>Privacy & Legal</p>
            <p>Product Recalls</p>
            <p>Contact</p>
            <p>News</p>
            <p>Get Updates</p>
            <p>Locations</p>
            <p><a href="https://github.com/Odi000" target="_blank">About Us</a></p>
        </footer>
    )
}
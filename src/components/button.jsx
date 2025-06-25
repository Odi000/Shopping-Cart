import styles from "../css-modules/button.module.css";

export default function Button({children: textContent}) {
    return <button className={styles.button}>{textContent}</button>
}
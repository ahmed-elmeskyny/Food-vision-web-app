//styles
import styles from "./layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <img src="/pizza.png" className={styles.icon1}></img>
      <img src="/donut.png" className={styles.icon2}></img>

      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <div className={styles.logo}>
            <img src="/see.png"></img>
          </div>
          <div className={styles.list}>
            <ul>
              <li>
                <a href="/">
                  <img src="/home.png"></img>
                </a>
                {/* <p>Home</p> */}
              </li>
              <li>
                <a href="/about">
                  <img src="/info.png"></img>
                </a>
                {/* <p>About</p> */}
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

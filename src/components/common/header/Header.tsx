import Input from "../input/Input";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h2 className={styles.header__title}>Search Photos</h2>
        <Input />
      </div>
    </header>
  );
}

export default Header;

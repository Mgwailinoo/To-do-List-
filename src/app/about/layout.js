import styles from "./style.module.css";
export default function AboutLayout({ children }) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
}

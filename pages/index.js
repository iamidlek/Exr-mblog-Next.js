import styles from "../styles/Home.module.css";

export default function Home({ hello }) {
  return (
    <div className={styles.container}>
      <h1>Blog Home {hello}</h1>
    </div>
  );
}

export function getStaticProps() {
  // sanity로 부터 데이터를 가지고 온다
  return {
    props: {
      hello: "world",
    },
  };
}

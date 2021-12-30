import styles from "../styles/Home.module.css";
import sanityClient from "@sanity/client";

export default function Home({ hello }) {
  return (
    <div className={styles.container}>
      <h1>Blog Home {hello}</h1>
    </div>
  );
}

export async function getStaticProps() {
  // sanity로 부터 데이터를 가지고 온다
  const client = sanityClient({
    dataset: "production",
    projectId: "gvddgzfs",
    useCdn: process.env.NODE_ENV === "production",
  });

  const home = await client.fetch(
    `*[_type == 'home'][0]{'mainPostUrl': mainPost -> slug.current}`
  );
  // 터미널에서 찍어보면
  // console.log(data);
  return {
    props: {
      home,
    },
  };
}

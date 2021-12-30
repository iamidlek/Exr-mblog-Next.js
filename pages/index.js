import styles from "../styles/Home.module.css";
import SanityService from "../services/SanityService";
import Header from "./components/Header";

export default function Home({ home, posts }) {
  // console.log(home);
  // console.log(posts);
  const mainPost = posts.find((p) => p.slug === home.mainPostUrl);
  const otherPosts = posts.filter((p) => p.slug !== home.mainPostUrl);
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}

export async function getStaticProps() {
  const sanityService = new SanityService();
  const home = await sanityService.getHome();
  const posts = await sanityService.getPosts();

  return {
    props: {
      home,
      posts,
    },
  };
}

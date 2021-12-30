import SanityService from "../../services/SanityService";
import styles from "../../styles/Home.module.css";
import Header from "../components/Header";
import BlogMainPost from "../components/BlogMainPost";
import Footer from "../components/Footer";
import BlogPostDetail from "../components/BlogPostDetail";

export default function PostAll({ slug, post }) {
  console.log(post);
  return (
    <div className={styles.container}>
      <Header />
      <BlogMainPost {...post} />
      <BlogPostDetail blocks={post.content} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

  const paths = posts?.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    // 요소 하나하나가 스테틱한 페이지가 됨
    paths,
    fallback: false,
  };
}

// 요소(객체)에서 slug를 꺼낸다
//! slug 라는 이름으로 동적 라우팅 되어있으므로 이름을 맞추어 주어야 한다
export async function getStaticProps({ params }) {
  const { slug } = params;

  const posts = await new SanityService().getPosts();

  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      slug,
      post,
    },
  };
}

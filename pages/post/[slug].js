import { useRouter } from "next/router";

export default function PostAll() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export function getStaticPaths() {
  return {
    // 요소 하나하나가 스테틱한 페이지가 됨
    paths: [{ paramas: { slug: "my-blog-test" } }],
    fallback,
  };
}

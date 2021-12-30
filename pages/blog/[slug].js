import { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h1>blog/{slug}</h1>
    </div>
  );
}

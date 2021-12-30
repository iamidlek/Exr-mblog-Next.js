// post/아무거나
// post/아무거나/아무거나 ... 다 매칭

import { useRouter } from "next/router";

//! post에 매칭하려면 index.js가 폴더 내에 있어야 함
export default function PostAll() {
  const router = useRouter();
  console.log(router.query);
  const { all } = router.query;
  return (
    <div>
      <h1>Post : {all.join("/")}</h1>
    </div>
  );
}

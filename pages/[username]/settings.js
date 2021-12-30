import { useRouter } from "next/router";

// 아무이름/settings 에 매칭
export default function UsernameSettings() {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <h1>{username} Settings</h1>
    </div>
  );
}

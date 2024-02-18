import { useEffect } from "react";
import { useRouter } from "next/navigation";
import altogic from "../configs/altogic";

const AuthRedirectView = () => {
  const router = useRouter();
  const { query } = router;

  const access_token = query.access_token as string;

  const handleToken = async () => {
    const { user, session } = await altogic.auth.getAuthGrant(access_token);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } else {
      router.push("/?sign-in=true");
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div>
      <div>Redirecting...</div>
    </div>
  );
};

export default AuthRedirectView;
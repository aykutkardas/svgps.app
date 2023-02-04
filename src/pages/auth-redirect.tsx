import { useEffect } from "react";
import { useRouter } from "next/router";
import altogic from "../configs/altogic";
import { useAuthContext } from "../context/AuthContext";

const AuthRedirectView = () => {
  const { setAuth, setSession } = useAuthContext();
  const router = useRouter();
  const { query } = router;

  const access_token = query.access_token as string;

  const handleToken = async () => {
    const { user, session } = await altogic.auth.getAuthGrant(access_token);

    if (user) {
      setAuth(user);
      setSession(session);
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

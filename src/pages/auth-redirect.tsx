import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthRedirectView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const access_token = searchParams?.get("access_token") as string;

  const handleToken = async () => {
    // const { user, session } = await altogic.auth.getAuthGrant(access_token);
    // if (user) {
    //   localStorage.setItem("user", JSON.stringify(user));
    //   window.location.href = "/";
    // } else {
    //   router.push("/?sign-in=true");
    // }
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

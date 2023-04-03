import { useEffect } from "react";
import { useRouter } from "next/router";
import Auth from "layouts/Auth";
import { LoginForm } from "ui";
import { useLoginMutation, useMeQuery } from "store/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentialis } from "store/features/auth/authSlice";

export default function Login() {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const { data, refetch, isFetching } = useMeQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.role.name === "Admin") {
      router.push("/admin/dashboard");
    }

    if (data?.role.name === "Authenticated") {
      router.push("/user/dashboard");
    }
  }, [data, isFetching, router]);

  const onSubmit = async (email: string, password: string) => {
    try {
      const userData = await login({ identifier: email, password }).unwrap();

      dispatch(setCredentialis(userData));

      await refetch();
    } catch (err) {
      // TODO error handling
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <LoginForm
            focusFirstField
            isLoading={isLoading || isFetching}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;

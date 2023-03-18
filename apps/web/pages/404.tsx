import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <p>This page does not exist</p>;
}

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/");
  // }, [router]);

  // TODO nextjs error page
  return <h1>Error occured</h1>;
}

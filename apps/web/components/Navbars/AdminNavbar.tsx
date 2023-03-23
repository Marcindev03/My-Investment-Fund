import { useRouter } from "next/router";
import { FC } from "react";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <nav className="top-0 bg-blueGray-800 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 pt-8">
      <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <p className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
          Admin {router.pathname.replace("/admin/", "").replace(/\?.*/, "")}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;

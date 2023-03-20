import { useEffect, useState } from "react";

type UseBreakpointValueArguments = {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export const useBreakpointValue = (args: UseBreakpointValueArguments) => {
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<keyof UseBreakpointValueArguments>("base");

  useEffect(() => {
    const changeCurrentBreakpoint = () => {
      const windowWidth = global.window.innerWidth;

      if (windowWidth < 640) {
        setCurrentBreakpoint("base");
        return;
      }
      if (windowWidth < 768) {
        setCurrentBreakpoint("sm");
        return;
      }
      if (windowWidth < 1024) {
        setCurrentBreakpoint("md");
        return;
      }
      if (windowWidth < 1280) {
        setCurrentBreakpoint("lg");
        return;
      }
      if (windowWidth < 1536) {
        setCurrentBreakpoint("xl");
        return;
      } else {
        setCurrentBreakpoint("2xl");
        return;
      }
    };

    global.window.addEventListener("resize", changeCurrentBreakpoint);

    changeCurrentBreakpoint();

    return () => {
      global.window.removeEventListener("resize", changeCurrentBreakpoint);
    };
  }, []);

  return args[currentBreakpoint];
};

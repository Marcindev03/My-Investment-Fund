import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "./Sidebar";
import { APP_NAME_SHORTCUT } from "mocks/data";

describe("Sidebar", () => {
  it("Should render properly", () => {
    render(<SideBar />);

    const shortcutLogo = screen.getByText(APP_NAME_SHORTCUT);

    expect(shortcutLogo).toHaveTextContent(APP_NAME_SHORTCUT);
  });
});

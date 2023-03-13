import { render, act, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "../Navigation";
import { MenuData } from "@base/config/menuData";

describe("Navigation", () => {
  it("should contain NavLinks equal to menuItems length", () => {
    const menuItems = MenuData.filter((item) => item.showInNav);
    const { getAllByRole } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navLinks = getAllByRole("link");
    expect(navLinks).toHaveLength(menuItems.length);
  });
});

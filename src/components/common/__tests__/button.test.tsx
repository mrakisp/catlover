import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomButton } from "../button";

describe("CustomButton", () => {
  test("renders button with correct title and calls handleButtonClick on click", () => {
    const title = "Click me";
    const handleClick = jest.fn();

    render(<CustomButton title={title} handleButtonClick={handleClick} />);

    const button = screen.getByRole("button", { name: title });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(title);

    act(() => {
      userEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

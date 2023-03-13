import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CatCard, CatCardProps } from "../CatCard";

describe("CatCard", () => {
  const defaultProps: CatCardProps = {
    id: "1",
    image: "cat-image.png",
  };

  it("should render an image", () => {
    render(<CatCard {...defaultProps} />);

    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", defaultProps.image);
  });

  it("should render a button and call handleButtonClick when clicked", () => {
    const handleButtonClick = jest.fn();
    const props: CatCardProps = {
      ...defaultProps,
      handleButtonClick,
    };
    render(<CatCard {...props} />);

    const buttonElement = screen.getByRole("button", {
      name: "Remove From Favourites",
    });

    fireEvent.click(buttonElement);

    expect(handleButtonClick).toHaveBeenCalledWith(defaultProps.id);
  });

  it("should not render a button when handleButtonClick is not provided", () => {
    render(<CatCard {...defaultProps} />);

    const buttonElement = screen.queryByRole("button", {
      name: "Remove From Favourites",
    });

    expect(buttonElement).not.toBeInTheDocument();
  });

  it("calls handleButtonClick when the remove button is clicked", () => {
    const mockHandleButtonClick = jest.fn();
    render(
      <CatCard {...defaultProps} handleButtonClick={mockHandleButtonClick} />
    );
    const removeButton = screen.getByRole("button", {
      name: /Remove From Favourites/i,
    });
    act(() => {
      userEvent.click(removeButton);
    });
    // userEvent.click(removeButton);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(defaultProps.id);
  });
});

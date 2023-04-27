import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from ".";

const onChange = jest.fn();

describe("Input component", () => {
  it("Input render", () => {
    render(<Input label={""} name={""} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("onChange works", async () => {
    render(<Input label={""} name={""} onChangeEvent={onChange} />);

    await userEvent.type(screen.getByRole("textbox"), "test");

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("setInput is works", () => {
    render(<Input label={""} name={""} value={"test"} />);

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });
});

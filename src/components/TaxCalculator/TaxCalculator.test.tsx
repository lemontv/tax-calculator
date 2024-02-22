import { render, fireEvent, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import taxBrackets from "./__mock__/tax-brackets-2022.json";
import { TaxCalculator } from "./TaxCalculator";

const handlers = [
  http.get("/tax-calculator/tax-year/2022", () => {
    return HttpResponse.json({
      tax_brackets: taxBrackets,
    });
  }),
  http.get("/tax-calculator/tax-year/2023", () => {
    return new HttpResponse(
      JSON.stringify({
        errors: [
          {
            code: "INTERNAL_SERVER_ERROR",
            field: "",
            message: "Database not found!",
          },
        ],
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Renders the TaxCalculator", () => {
  it("should calculate the income tax", async () => {
    const screen = render(<TaxCalculator />);
    const taxableIncomeInput = screen.getByLabelText("Taxable Income");
    const taxYearInput = screen.getByLabelText("Tax Year");
    const submitBtn = screen.getByText("Calculate");

    expect(taxYearInput).toBeInTheDocument();
    expect(taxableIncomeInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toHaveAttribute("disabled");
    expect(screen.queryByText("$385,587.65")).not.toBeInTheDocument();

    fireEvent.change(taxableIncomeInput, { target: { value: 1234567 } });
    fireEvent.change(taxYearInput, { target: { value: 2022 } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
    expect(submitBtn).toHaveAttribute("disabled");
    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    expect(screen.getByText("$385,587.65")).toBeInTheDocument();
  });

  it("should handle network error", async () => {
    const screen = render(<TaxCalculator />);
    const taxableIncomeInput = screen.getByLabelText("Taxable Income");
    const taxYearInput = screen.getByLabelText("Tax Year");
    const submitBtn = screen.getByText("Calculate");

    expect(taxYearInput).toBeInTheDocument();
    expect(taxableIncomeInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toHaveAttribute("disabled");
    expect(screen.queryByText("Database not found!")).not.toBeInTheDocument();

    fireEvent.change(taxableIncomeInput, { target: { value: 1234567 } });
    fireEvent.change(taxYearInput, { target: { value: 2023 } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
    expect(submitBtn).toHaveAttribute("disabled");
    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Database not found!")).toBeInTheDocument();
  });
});

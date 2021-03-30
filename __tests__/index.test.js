import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import TaxCalculator from "../pages/index";

// https://github.com/testing-library/jest-dom#readme
// https://testing-library.com/docs/queries/about/#priority
// https://testing-library.com/docs/react-testing-library/example-intro
// https://www.robinwieruch.de/react-testing-library
// https://medium.com/frontend-digest/setting-up-testing-library-with-nextjs-a9702cbde32d

describe("TaxCalculator", () => {
  beforeEach(() => render(<TaxCalculator />));

  it("should render all default Quebec values", () => {
    expect(
      screen.getByRole("heading", {
        name: "Calcul de taxes pour la TPS et la TVQ",
      }),
    ).toBeVisible();
    expect(screen.getByText(`TAUX ${new Date().getFullYear()}`)).toBeVisible();

    expect(screen.getByText("Montant sans taxes:")).toBeVisible();
    expect(screen.getByPlaceholderText("Montant $")).toHaveDisplayValue("0.00");
    expect(screen.getByText("Entrez le MONTANT (avant taxes).")).toBeVisible();

    expect(screen.getByText("TPS (5.000%):")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Fédérale $")).toHaveDisplayValue(
      "0.00",
    );

    expect(screen.getByText("TVQ (9.975%):")).toBeVisible();
    expect(
      screen.getByPlaceholderText("Taxe Provinciale $"),
    ).toHaveDisplayValue("0.00");

    expect(screen.getByText("Total avec taxes:")).toBeVisible();
    expect(screen.getByPlaceholderText("Total $")).toHaveDisplayValue("0.00");

    expect(screen.getByText("Calcul de taxes inversé:")).toBeVisible();
    const taxeInCheckbox = screen.getByTitle(
      "Cliquez pour activer ou désactiver le mode de calcul taxes inverse.",
    );
    expect(taxeInCheckbox).toBeVisible();
    expect(taxeInCheckbox).not.toBeChecked();

    expect(screen.getByText("Province/territoire du Canada:")).toBeVisible();
    expect(screen.getByText("Québec (TPS 5% + TVQ 9.975%)")).toBeVisible();

    expect(
      screen.getByTitle("Visitez le site internet de Finance D"),
    ).toHaveAttribute("href", "https://finance-d.com");
    expect(
      screen.getByTitle(
        "Visitez le site du gouvernement pour plus d'informations",
      ),
    ).toHaveAttribute(
      "href",
      "https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/",
    );
  });

  it("should calculate 100$ plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "100.00"}});
    expect(montant.value).toBe("100.00");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("5.00");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("9.98");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("114.98");
  });

  it("should change calculation mode when clicking the TaxeInCheckbox", () => {
    expect(screen.getByText("Calcul de taxes inversé:")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour activer ou désactiver le mode de calcul taxes inverse.",
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    expect(
      screen.getByRole("heading", {
        name: "Calcul de taxes inversé pour la TPS et la TVQ",
      }),
    ).toBeVisible();

    expect(screen.getByText("Montant sans taxes:")).toBeVisible();
    expect(screen.getByPlaceholderText("Montant $")).toHaveDisplayValue("0.00");

    expect(screen.getByText("TPS (5.000%):")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Fédérale $")).toHaveDisplayValue(
      "0.00",
    );

    expect(screen.getByText("TVQ (9.975%):")).toBeVisible();
    expect(
      screen.getByPlaceholderText("Taxe Provinciale $"),
    ).toHaveDisplayValue("0.00");

    expect(screen.getByText("Total avec taxes:")).toBeVisible();
    expect(screen.getByPlaceholderText("Total $")).toHaveDisplayValue("0.00");
    expect(screen.getByText("Entrez le TOTAL (taxes incluses).")).toBeVisible();

    expect(screen.getByText("Province/territoire du Canada:")).toBeVisible();
    expect(screen.getByText("Québec (TPS 5% + TVQ 9.975%)")).toBeVisible();
  });

  it("should calculate 100$ taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé:")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour activer ou désactiver le mode de calcul taxes inverse.",
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    const total = screen.getByPlaceholderText("Total $");
    fireEvent.change(total, {target: {value: "100.00"}});
    expect(total.value).toBe("100.00");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("4.35");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("8.68");
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("86.98");
  });

  it("should focus the montant input by default", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant).toHaveFocus();
  });
});

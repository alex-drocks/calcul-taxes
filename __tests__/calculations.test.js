import {fireEvent, render, screen} from "@testing-library/react";
import Index from "../pages/index";

describe("Calculations", () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => render(<Index />));

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

  it("should calculate 473.35 plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "473.35"}});
    expect(montant.value).toBe("473.35");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("23.67");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("47.22");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("544.24");
  });

  it("should calculate 79.95$ plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "79.95"}});
    expect(montant.value).toBe("79.95");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("4.00");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("7.98");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("91.93");
  });

  it("should calculate 1.33$ plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "1.33"}});
    expect(montant.value).toBe("1.33");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("0.07");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("0.13");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("1.53");
  });

  it("should calculate -7 00.01$ plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "7000.01"}});
    expect(montant.value).toBe("7 000.01");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("350.00");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("698.25");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("8 048.26");
  });

  it("should calculate 77 777.77$ plus taxes correctly", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("0.00");

    fireEvent.change(montant, {target: {value: "77777.77"}});
    expect(montant.value).toBe("77 777.77");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("3 888.89");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("7 758.33");
    const total = screen.getByPlaceholderText("Total $");
    expect(total.value).toBe("89 424.99");
  });

  it("should change calculation mode when clicking the TaxeInCheckbox", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    expect(
      screen.getByRole("heading", {
        name: "Calcul de taxes inversé pour la TPS et la TVQ"
      })
    ).toBeVisible();

    expect(screen.getByText("Montant sans taxes :")).toBeVisible();
    expect(screen.getByPlaceholderText("Montant $")).toHaveDisplayValue("0.00");

    expect(screen.getByText("TPS (5.000%) :")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Fédérale $")).toHaveDisplayValue("0.00");

    expect(screen.getByText("TVQ (9.975%) :")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Provinciale $")).toHaveDisplayValue("0.00");

    expect(screen.getByText("Total avec taxes :")).toBeVisible();
    expect(screen.getByPlaceholderText("Total $")).toHaveDisplayValue("0.00");
    expect(
      screen.getByText("Entrez le total taxes incluses pour calculer les taxes.")
    ).toBeVisible();

    expect(screen.getByText("Province/territoire du Canada :")).toBeVisible();
    expect(screen.getByText("Québec (TPS 5% + TVQ 9.975%)")).toBeVisible();
  });

  it("should calculate 156.22 taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    const total = screen.getByPlaceholderText("Total $");
    fireEvent.change(total, {target: {value: "156.22"}});
    expect(total.value).toBe("156.22");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("6.79");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("13.55");
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("135.88");
  });

  it("should calculate 100$ taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
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
    expect(montant.value).toBe("86.97");
  });

  it("should calculate 1.33$ taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    const total = screen.getByPlaceholderText("Total $");
    fireEvent.change(total, {target: {value: "1.33"}});
    expect(total.value).toBe("1.33");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("0.06");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("0.12");
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("1.15");
  });

  it("should calculate -7 000.01$ taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    const total = screen.getByPlaceholderText("Total $");
    fireEvent.change(total, {target: {value: "-7000.01"}});
    expect(total.value).toBe("-7 000.01");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("-304.41");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("-607.31");
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("-6 088.29");
  });

  it("should calculate 77 777.77$ taxes included correctly", () => {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckBox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckBox).toBeVisible();
    fireEvent.click(taxeInCheckBox);
    expect(taxeInCheckBox).toBeChecked();

    const total = screen.getByPlaceholderText("Total $");
    fireEvent.change(total, {target: {value: "77777.77"}});
    expect(total.value).toBe("77 777.77");

    const tps = screen.getByPlaceholderText("Taxe Fédérale $");
    expect(tps.value).toBe("3 382.38");
    const tvq = screen.getByPlaceholderText("Taxe Provinciale $");
    expect(tvq.value).toBe("6 747.84");
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant.value).toBe("67 647.55");
  });

  it("should focus the montant input by default", () => {
    const montant = screen.getByPlaceholderText("Montant $");
    expect(montant).toHaveFocus();
  });
});

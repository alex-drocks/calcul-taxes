import {render, screen} from "@testing-library/react";
import Index from "../pages/index";

describe("Labels", () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => render(<Index />));

  it("should render TITLE", function () {
    const mainTitle = screen.getByRole("heading", {
      name: "Calcul de taxes pour la TPS et la TVQ"
    });
    expect(mainTitle).toBeVisible();
  });

  it("should render MONTANT", function () {
    expect(screen.getByText("Montant sans taxes :")).toBeVisible();
    expect(screen.getByPlaceholderText("Montant $")).toHaveDisplayValue("0.00");
    expect(screen.getByText("Entrez le montant hors-taxes pour calculer les taxes.")).toBeVisible();
  });

  it("should render TPS", function () {
    expect(screen.getByText("TPS (5.000%) :")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Fédérale $")).toHaveDisplayValue("0.00");
  });

  it("should render TVQ", function () {
    expect(screen.getByText("TVQ (9.975%) :")).toBeVisible();
    expect(screen.getByPlaceholderText("Taxe Provinciale $")).toHaveDisplayValue("0.00");
  });

  it("should render TOTAL", function () {
    expect(screen.getByText("Total avec taxes :")).toBeVisible();
    expect(screen.getByPlaceholderText("Total $")).toHaveDisplayValue("0.00");
  });

  it("should render TAXE-IN CHECKBOX", function () {
    expect(screen.getByText("Calcul de taxes inversé :")).toBeVisible();
    const taxeInCheckbox = screen.getByTitle(
      "Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
    );
    expect(taxeInCheckbox).toBeVisible();
    expect(taxeInCheckbox).not.toBeChecked();
  });

  it("should render TAUX TAXES QC", function () {
    expect(screen.getByText("Province/territoire du Canada :")).toBeVisible();
    expect(screen.getByText("Québec (TPS 5% + TVQ 9.975%)")).toBeVisible();
  });

  it("should render FINANCE D LINK", function () {
    expect(
      screen.getByTitle(
        "Visitez le site internet du concepteur de cette calculatrice de taxes (finance-d.com)"
      )
    ).toHaveAttribute("href", "https://finance-d.com");
  });

  it("should render GOUV QC LINK", function () {
    expect(
      screen.getByTitle("Visitez le site du gouvernement pour plus d'informations")
    ).toHaveAttribute(
      "href",
      "https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/"
    );
  });
});

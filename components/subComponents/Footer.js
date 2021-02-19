export default function Footer({province}) {
  return (
    <div className="calculator-footer"
         style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <div className={"footer-row"}>
        {province === "Québec" ?
          (
            <a className="text-link"
               href="https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/">
              Calcul des taxes selon Revenu Québec
            </a>
          ) : (
            <a className="text-link"
               href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises/facturer-percevoir-quel-taux/calculatrice.html">
              Calcul des taxes selon Canada.ca
            </a>
          )
        }
        <a href="https://finance-d.com"
           style={{display: "flex", alignItems: "center", marginLeft: "4em"}}>
          <img style={{width: "1.1em", height: "1.1em", marginRight: "2px"}}
               src="/icons/icon-48x48.png" alt="Logo"
               width={48} height={48}/>
          <span className="no-wrap">Finance D</span>
        </a>
      </div>

      <div className={"footer-row invisible-keywords"}>
        <p>
          Une calculatrice de taxes {new Date().getFullYear()} offerte gratuitement et sans publicité.
          Calcul de TPS et TVQ inversé (taxes incluses).
          Calcul des taxes du Québec.
          Calculatrice de taxes Québec.
          Calculatrice de TPS TVQ.
          Calcul des taxes canadiennes.
          Calcul de taxe renversé.
          Calculatrice de taxes incluses.
          Calcul des taxes {new Date().getFullYear()}.
        </p>
      </div>
    </div>
  );
}
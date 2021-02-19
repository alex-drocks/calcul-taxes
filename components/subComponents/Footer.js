export default function Footer({province}) {
  return (
    <div className="calculator-footer"
         style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <div className={"footer-row"}>
        <a href="https://finance-d.com"
           style={{display: "flex", alignItems: "center", marginRight: "4em"}}>
          <img style={{width: "1.1em", height: "1.1em", marginRight: "2px"}}
               src="/icons/icon-48x48.png" alt="Logo"
               width={48} height={48}/>
          <span className="no-wrap">Finance D</span>
        </a>
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
      </div>

      <div className={"footer-row"}>
        <p>
          Une calculatrice de taxes aux taux de {new Date().getFullYear()} sans publicité.
          Elle inclut le calcul de TPS et TVQ inversé (taxes incluses);
          Calcul des taxes du Québec et calcul des taxes pour l'ensemble des provinces et territoires du Canada.
          Sélectionnez la province désirée et un des deux modes calcul de taxes. Soit le calcul avant taxes ou calcul après taxes.
          Accessible à partir de n'importe quel appareil connecté à internet:
          ordinateur, portable, cellulaire / mobile / téléphone intelligent.
        </p>
      </div>
    </div>
  );
}
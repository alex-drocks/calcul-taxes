export default function Footer({province}) {
  return (
    <div className="footer no-select"
         style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <div className={"footer-row logo-fd-and-link-to-gov"}>

        {/*Logo Finance D links to main web site*/}
        <a href="https://finance-d.com"
           style={{display: "flex", alignItems: "center", marginRight: "4em"}}>
          <img style={{width: "1.1em", height: "1.1em", marginRight: "4px", marginBottom: "2px"}}
               src="/icons/icon-48x48.png" alt="Logo"
               width={48} height={48}/>
          <span className="no-wrap">Finance D</span>
        </a>

        {/*Dynamic link to gouvernement authorities page on the topic of taxes calculation*/}
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
      <div className="footer-row footer-text-container">
        <div className={"footer-row app-description"}>
          {/*More details on what this app is meant to be*/}
          <p style={{color: "rgba(0, 8, 27, .59)"}}>
            Une calculatrice de taxes aux taux de {new Date().getFullYear()} sans publicité.
            Elle inclut le calcul de TPS et TVQ renversé (taxes incluses);
            Calcul des taxes du Québec et calcul des taxes pour l'ensemble des provinces et territoires du Canada.
            Sélectionnez la province désirée et un des deux modes de calcul de taxes.
            Soit le calcul avant taxes ou, le calcul après taxes.
            Accessible à partir de n'importe quel appareil connecté à internet.
          </p>

        </div>
        <div className="footer-row contextual-note">
          <p>
            Note: Les taux de taxes pour les provinces canadiennes autres que le Québec prennent pour
            acquis que vous êtes un résident du Québec et que vous facturez vos clients dans une de
            ces autres provinces du Canada.
            C'est pourquoi, les provinces qui ne font pas parti du système canadien de la TVH on seulement
            la taxe fédérale dans notre calcul de taxe.
          </p>
        </div>
      </div>
      <div className="footer-row copyright-and-social-links">
        <p className="footer-copyright">
          ©&nbsp;{new Date().getFullYear()}&#32;<a href="https://finance-d.com/a-propos/">Finance&nbsp;D</a>
        </p>
        <a className="github-repository-link" href="https://github.com/alex-drocks/calcul-taxes" rel="noopener"
           target="_blank"
           aria-label="GitHub">
          <svg width="19" height="19" viewBox="0 0 14 14" aria-label="github logo">
            <path
              d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
              fill="currentColor" fillRule="nonzero"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
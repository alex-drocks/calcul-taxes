export default function Footer() {
  return (
    <div className="footer no-select">
      <div className="footer-row logo-fd-and-link-to-gov">
        {/*Logo Finance D links to main web site*/}
        <a href="https://finance-d.com" className="link-to-finance-d">
          <img src="/icons/icon-48x48.png"
               alt="Logo de l'entreprise Finance D."
               width={48} height={48}
          />
          <span className="no-wrap">Finance D</span>
        </a>
        {/*Dynamic link to gouvernement authorities page on the topic of taxes calculation*/}
        <a id="gouvernment-link" className="text-link"
           href="#">
          Calcul des taxes selon <span>Revenu Québec</span>
        </a>
      </div>

      {/*Details about the calculator and note about other privinces*/}
      <div className="footer-row footer-text-container">
        <h2>À propos de cette calculatrice de taxes&nbsp;:</h2>
        <div className={"footer-row app-description"}>
          {/*More details on what this app is meant to be*/}
          <p>
            Il s'agit d'un calculateur de taxes polyvalent pour la TPS/TVH et TVQ,
            avec les taux de {new Date().getFullYear()}.
            Plusieurs fonctions de calcul sont réunies&nbsp;:
            le calcul des taxes du Québec,
            le calcul des taxes pour l'ensemble des provinces et territoires du Canada,
            et le mode de calcul de taxes renversé (taxes incluses).
            Sélectionnez la province désirée et un des deux modes de calcul de taxes.
            Soit le mode de calcul avant taxes régulier ou,
            le mode de calcul après taxes (calcul inverse sur le total).
          </p>

        </div>
        <div className="footer-row contextual-note">
          {/*Disclaimer about how the tax rates are for other than Quebec provinces*/}
          <p>
            Note&nbsp;: Les taux de taxes pour les provinces canadiennes autres que le Québec prennent pour
            acquis que vous êtes un résident du Québec et que vous facturez vos clients dans une de
            ces autres provinces du Canada.
            C'est pourquoi, les provinces qui ne font pas parti du système canadien de la TVH on seulement
            la taxe fédérale dans notre calcul de taxe.
          </p>
        </div>
      </div>

      {/*Copyright and social links*/}
      <div className="footer-row copyright-and-social-links">

        <span className="footer-copyright">
          ©&nbsp;{new Date().getFullYear()}{" "}
          <a
            href="https://finance-d.com/a-propos/"
            title="En savoir plus à propos de Finance D"
          >
            Finance&nbsp;D
          </a>
        </span>

        <div className="social-links">
          {/*Github*/}
          <a className="github-repository-link"
             href="https://github.com/alex-drocks/calcul-taxes"
             title="Voir le code source de cette application créée avec Next JS."
             rel="noopener"
             target="_blank"
             aria-label="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 14 14" aria-label="github logo">
              <path
                d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                fill="currentColor" fillRule="nonzero"/>
            </svg>
          </a>
          {/*Facebook*/}
          <a className="facebook-page-link"
             href="https://www.facebook.com/Finance.D.Logiciels"
             title="Voir la page Facebook de Finance D."
             rel="noopener"
             target="_blank"
             aria-label="Facebook"
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z"/>
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
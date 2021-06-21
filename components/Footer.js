export default function Footer() {
  return (
    <div className="footer no-select">
      <div className="footer-row logo-fd-and-link-to-gov">
        {/*Logo Finance D links to main web site*/}
        <a
          href="https://finance-d.com"
          className="link-to-finance-d"
          title="Visitez le site internet du concepteur de cette calculatrice de taxes (finance-d.com)"
        >
          <img
            src="/icons/icon-48x48.png"
            alt="Logo de l'entreprise Finance D."
            width={48}
            height={48}
          />
          <span className="no-wrap">Finance D</span>
        </a>

        {/*Dynamic link to gouvernement authorities page on the topic of taxes calculation*/}
        <a
          id="gouvernment-link"
          className="text-link"
          title="Visitez le site du gouvernement pour plus d'informations"
          href="#"
          target="_blank"
          rel="noopener"
        >
          Calcul des taxes selon <span>Revenu Québec</span>
        </a>
      </div>

      {/*Details about the calculator and note about other provinces*/}
      <div className="footer-row footer-text-container">
        <h2>À propos de cette calculatrice de taxes&nbsp;:</h2>
        <div className={"footer-row app-description"}>
          {/*Describe what this app is meant to be*/}
          <p>
            Il s&rsquo;agit d&rsquo;un calculateur de taxes pour la TPS / TVH et la TVQ / TVP, avec les taux de{" "}
            {`${new Date().getFullYear()}`} en vigueur au Canada. Plusieurs fonctions de calcul sont
            réunies, faisant de cet outil un tout-inclut pour vos calcul de taxes sur les biens et
            services. Elle peut faire le calcul des taxes du Québec, le calcul des taxes pour
            l&rsquo;ensemble des provinces et territoires du Canada, ainsi que le calcul de taxes inverse
            (taxes incluses). Cette calculatrice de taxes à la consommation canadienne vous est
            offerte par Finance&nbsp;D, une entreprise du Québec qui offre des logiciels simples aux
            défis quotidiens de la comptabilité.
            <br />
            <br />
            Sélectionnez une province du Canada et un des deux modes de calcul de taxes. Soit le
            mode de calcul avant taxes régulier ou, le mode de calcul après taxes (calcul inverse
            sur le total). Ensuite, inscrivez le montant ou le total pour calculer les taxes. Si
            vous voulez générer une grille Excel de vos calculs de taxes, il suffit d&rsquo;appuyer sur{" "}
            <kbd>Enter</kbd> au clavier, ou d&rsquo;appuyer sur le bouton de confirmation sur votre
            mobile. Vous pourrez imprimer votre grille de calculs en PDF ou l&rsquo;exporter vers un
            fichier Excel.
          </p>
        </div>
      </div>
      {/*<iframe*/}
      {/*  src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ftaxes.finance-d.com%2F&width=165&layout=button&action=like&size=large&share=true&height=30&appId"*/}
      {/*  width="165"*/}
      {/*  height="30"*/}
      {/*  style={{border: "none", overflow: "hidden"}}*/}
      {/*  scrolling="no"*/}
      {/*  frameBorder="0"*/}
      {/*  allowFullScreen={true}*/}
      {/*  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"*/}
      {/*/>*/}
      <div className="footer-row copyright-and-social-links">
        {/*Copyright*/}
        <span className="footer-copyright">
          {`© ${new Date().getFullYear()} `}
          <a href="https://finance-d.com/a-propos/" title="En savoir plus à propos de Finance D">
            Finance&nbsp;D
          </a>
        </span>

        <div className="social-links">
          {/*Facebook*/}
          <a
            className="facebook-page-link"
            href="https://www.facebook.com/Finance.D.Logiciels"
            title="Voir la page Facebook de Finance D."
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Facebook"
          >
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z" />
            </svg>
          </a>

          {/*Github*/}
          <a
            className="github-repository-link"
            href="https://github.com/alex-drocks/calcul-taxes"
            title="Voir le code source de cette application créée avec Next JS."
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <svg width="30" height="30" viewBox="0 0 14 14" aria-label="github logo">
              <path
                d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                fill="currentColor"
                fillRule="nonzero"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

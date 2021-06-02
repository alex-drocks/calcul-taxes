export default function TopCornerRibbon() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={"ribbon no-select"}>
      <span>
        <a
          title={`Les taux utilisés pour le calcul de taxes de chaque province ou territoire du Canada sont à jour en date de ${currentYear} selon la calculatrice de taxes du site officiel du Gouvernement Fédéral du Canada.`}
          href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises/facturer-percevoir-quel-taux/calculatrice.html"
          rel="noopener"
          target="_blank"
          style={{color: "#fdfdfd"}}
        >
          {`TAUX ${currentYear}`}
        </a>
      </span>
    </div>
  );
}

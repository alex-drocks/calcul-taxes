export default function ResultsGrid({montant, tps, tvq, total, province, tauxFed, tauxQc}) {

  return (
    <div className="results-grid">
      <div className="results-grid--header">
        <span>MONTANT</span>
        <span>TAXE FÉD</span>
        <span>TAXE QC</span>
        <span>TOTAL</span>
        <span>PROVINCE</span>
        <span>TAUX FÉD</span>
        <span>TAUX QC</span>
      </div>
      <div className="results-grid--rows">
        <span>{montant}</span>
        <span>{tps}</span>
        <span>{tvq}</span>
        <span>{total}</span>
        <span>{province}</span>
        <span>{tauxFed}</span>
        <span>{tauxQc}</span>
      </div>
    </div>
  );
}

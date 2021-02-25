export default function ResultsGrid() {

  function handleDeleteBtnClicks(e) {
    const clickedElm = e.target;

    if (clickedElm?.className === "deleteBtn" && e.target.parentElement.className === "results-grid--row") {
      const rowToDelete = e.target.parentElement;
      rowToDelete.remove();

      const gridRows = document.querySelector(".results-grid--rows");
      const gridHeaderCounter = document.querySelector(".results-grid--header .rowCount");
      gridHeaderCounter.textContent = (gridRows.childElementCount).toString();
    }
  }

  return (
    <div className="results-grid hidden"
         onClick={handleDeleteBtnClicks}
         title="Pour supprimer une ligne cliquer sur son icône de poubelle,
          ou utilisez le raccourci clavier [Ctrl + Enter]."
    >
      <div className="results-grid--header">
        <span className="montant">MONTANT</span>
        <span className="tps">TPS/TVH</span>
        <span className="tvq">TVQ</span>
        <span className="total">TOTAL</span>
        <span className="province">PROVINCE</span>
        <span className="tauxFed">% FED</span>
        <span className="tauxQc">% QC</span>
        <span className="deleteBtn rowCount"/>
      </div>

      <div className="results-grid--rows">
        {/*javascript will populate rows*/}
      </div>
    </div>
  );
}

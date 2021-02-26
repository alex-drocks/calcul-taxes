import {roundNumber} from "./TaxCalculator";

export default function ResultsGrid() {
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

function handleDeleteBtnClicks(e) {
  const clickedElm = e.target;
  if (clickedElm?.className === "deleteBtn" && e.target.parentElement.className === "results-grid--row") {
    const rowToDelete = e.target.parentElement;
    deleteGridRow(rowToDelete);
  }
}

function deleteGridRow(rowToDelete) {
  if (rowToDelete) {
    rowToDelete.remove();
    updateRowCount();
  }
}

function updateRowCount() {
  const gridHeaderCounter = document.querySelector(".results-grid--header .rowCount");
  const gridRows = document.querySelector(".results-grid--rows");
  gridHeaderCounter.textContent = (gridRows.childElementCount).toString();
}

function addNewResultRowToGrid(montant, tps, tvq, total, province, tauxFed, tauxQc) {
  if (!montant || !total) {
    return;
  }

  //The Excel-like grid at the bottom of page
  const resultsGrid = document.querySelector(".results-grid");
  resultsGrid.classList.contains("hidden") && resultsGrid.classList.remove("hidden");

  const gridRows = resultsGrid.querySelector(".results-grid--rows");

  const newRowElm = document.createElement("div");
  newRowElm.className = "results-grid--row";
  newRowElm.id = gridRows.childElementCount.toString();
  newRowElm.innerHTML = `
    <span class="montant">${roundNumber(montant)}</span>
    <span class="tps">${roundNumber(tps)}</span>
    <span class="tvq">${roundNumber(tvq)}</span>
    <span class="total">${roundNumber(total)}</span>
    <span class="province">${province}</span>
    <span class="tauxFed">${formatAsPercentage(tauxFed)}</span>
    <span class="tauxQc">${formatAsPercentage(tauxQc)}</span>
    <span class="deleteBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6v18h18V6H3zm5 14c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22z"/></svg>
    </span>
  `;

  function formatAsPercentage(decimal) {
    return (decimal * 100)
      .toFixed(3)
      .replace(/(\.0+|0\.)$/, '');
  }

  const gridHeaderCounter = resultsGrid.querySelector(".results-grid--header .rowCount");
  gridHeaderCounter.textContent = (gridRows.childElementCount + 1).toString();

  //place it at the top
  gridRows.prepend(newRowElm);
}


function handleRowDeleteWithHotkey() {
  const gridRows = document.querySelector(".results-grid--rows");
  const rowToDelete = gridRows.firstChild;

  deleteGridRow(rowToDelete);
}

//Export for TaxCalculator component to use in its onKeyDown handler
export {addNewResultRowToGrid, handleRowDeleteWithHotkey};
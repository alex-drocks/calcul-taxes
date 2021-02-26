import {roundNumber} from "./TaxCalculator";

export default function ResultsTable() {
  return (<>
    <div className="results-table hidden"
         onClick={handleDeleteBtnClicks}
         title="Pour supprimer une ligne cliquez sur la poubelle, ou utilisez le raccourci clavier [Shift  Ctrl + Moins]."
    >
      {/*<div className="results-table--header">*/}
      {/*  <span className="montant" title="Prix avant taxe / sans taxe">MONTANT</span>*/}
      {/*  <span className="tps" title="Montant de la taxe Fédérale">TPS/TVH</span>*/}
      {/*  <span className="tvq" title="Montant de la taxe provinciale">TVQ</span>*/}
      {/*  <span className="total" title="Somme du MONTANT + taxe fédérale + taxe provinciale = TOTAL">TOTAL</span>*/}
      {/*  <span className="province" title="Province sélectionnée pour le calcul">PROVINCE</span>*/}
      {/*  <span className="tauxFed" title="Pourcentage de taxe Fédérale">%&nbsp;FED</span>*/}
      {/*  <span className="tauxQc" title="Pourcentage de taxe Provinciale">%&nbsp;PRO</span>*/}
      {/*  <span className="deleteBtn rowCount" title="Nombre de lignes calculées dans ce tableau"/>*/}
      {/*</div>*/}
      {/*<div className="results-table--rows">*/}
      {/*  /!*javascript will populate rows*!/*/}
      {/*</div>*/}

      <table>
        <thead className="results-table--header">
        <tr>
          <th className="montant" title="Prix avant taxe / sans taxe">MONTANT</th>
          <th className="tps" title="Montant de la taxe Fédérale">TPS/TVH</th>
          <th className="tvq" title="Montant de la taxe provinciale">TVQ</th>
          <th className="total" title="Somme du MONTANT + taxe fédérale + taxe provinciale = TOTAL">TOTAL</th>
          <th className="province" title="Province sélectionnée pour le calcul">PROVINCE</th>
          <th className="tauxFed" title="Pourcentage de taxe Fédérale">%&nbsp;FED</th>
          <th className="tauxQc" title="Pourcentage de taxe Provinciale">%&nbsp;PRO</th>
          <th className="rowCount deleteBtn" title="Nombre de lignes calculées dans ce tableau"/>
        </tr>
        </thead>
        <tbody className="results-table--rows">
        {/*javascript will populate rows*/}
        </tbody>
      </table>

      <div className="export-btns">
        <button id="printBtn"
                title="Imprimez la liste de vos calculs sur papier ou en fichier PDF"
                onClick={print}
        >
          Imprimer
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M24 5h-4V0H4v5H0v13h4v6h9.519c2.947 0 6.029-3.577 6.434-6H24V5zM6 2h12v3H6V2zm8.691 16.648S16.16 22 12.691 22H6v-8h12v2.648c0 3.594-3.309 2-3.309 2zM21.5 8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zM16 17H8v-1h8v1zm-3 1H8v1h5v-1z"/>
          </svg>
        </button>
        <button id="excelBtn"
                title="Exportez la liste de vos calculs dans un fichier compatible avec Excel"
                onClick={exportToExcel}
        >
          Excel
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path
              d="M28.8125.03125l-28 5.3125c-.472656.089844-.8125.519531-.8125 1v37.3125c0 .480469.339844.910156.8125 1l28 5.3125c.0625.011719.125.03125.1875.03125.230469 0 .445313-.070312.625-.21875.230469-.191406.375-.484375.375-.78125V1c0-.296875-.144531-.589844-.375-.78125-.230469-.191406-.519531-.242188-.8125-.1875zM32 6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.101563 0 2-.898437 2-2V8c0-1.101562-.898437-2-2-2zm4 7h8v2h-8zM6.6875 15.6875h5.125L14.5 21.28125c.210938.441406.398438.984375.5625 1.59375h.03125c.105469-.363281.308594-.933594.59375-1.65625l2.96875-5.53125h4.6875l-5.59375 9.25 5.75 9.4375h-4.96875l-3.25-6.09375c-.121094-.226562-.246094-.644531-.375-1.25H14.875c-.0625.285156-.210937.730469-.4375 1.3125l-3.25 6.03125h-5l5.96875-9.34375zM36 20h8v2h-8zm0 7h8v2h-8zm0 8h8v2h-8z"/>
          </svg>
        </button>
      </div>
    </div>

  </>);
}

function handleDeleteBtnClicks(e) {
  const clickedElm = e.target;
  if (clickedElm?.className === "deleteBtn" && e.target.parentElement.className === "results-table--row") {
    const rowToDelete = e.target.parentElement;
    deleteTableRow(rowToDelete);
  }
}

function deleteTableRow(rowToDelete) {
  if (rowToDelete) {
    rowToDelete.remove();
    updateRowCount();
  }
}

function updateRowCount() {
  const tableHeaderCounter = document.querySelector(".results-table--header .rowCount");
  const tableRows = document.querySelector(".results-table--rows");
  tableHeaderCounter.textContent = (tableRows.childElementCount).toString();
}

function addNewResultRowToTable(montant, tps, tvq, total, province, tauxFed, tauxQc) {
  if (!montant || !total || montant === "0.00" || total === "0.00") {
    //Don't add rows with no $ amounts
    return;
  }

  //The Excel-like table at the bottom of page
  const resultsTable = document.querySelector(".results-table");
  resultsTable.classList.contains("hidden") && resultsTable.classList.remove("hidden");

  const tableRows = resultsTable.querySelector(".results-table--rows");

  const newRowElm = tableRows.insertRow(0);
  updateRowCount();
  newRowElm.className = "results-table--row";
  newRowElm.innerHTML = `
    <td class="montant">${roundNumber(montant)}</td>
    <td class="tps">${roundNumber(tps)}</td>
    <td class="tvq">${roundNumber(tvq)}</td>
    <td class="total">${roundNumber(total)}</td>
    <td class="province">${province}</td>
    <td class="tauxFed">${formatAsPercentage(tauxFed)}</td>
    <td class="tauxQc">${formatAsPercentage(tauxQc)}</td>
    <td class="deleteBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6v18h18V6H3zm5 14c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22z"/></svg>
    </td>
  `;

  function formatAsPercentage(decimal) {
    return (decimal * 100)
      .toFixed(3)
      .replace(/(\.0+|0\.)$/, '');
  }
}


function handleRowDeleteWithHotkey() {
  const tableRows = document.querySelector(".results-table--rows");
  const rowToDelete = tableRows.firstChild;

  deleteTableRow(rowToDelete);
}

function exportToExcel() {
  alert("La fonction exporter vers Excel est en construction :)");
}

function print() {
  window.print();
}

//Export for TaxCalculator component to use in its onKeyDown handler
export {addNewResultRowToTable, handleRowDeleteWithHotkey};
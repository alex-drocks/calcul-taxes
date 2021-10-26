import {useState} from "react";
import {roundNumber} from "../utils/sharedFunctions";

export default function ResultsTable() {
  const [isExportedOnce, setIsExportedOnce] = useState(false);
  let ExcellentExport; // dynamically imported only when clicking Export to Excel <button>
  return (
    <>
      <div className="results-table hidden" onClick={handleDeleteBtnClicks}>
        <table>
          <thead className="results-table--header">
          <tr>
            <th
              id="sumMontant"
              className="montant col-sum"
              title="Prix avant taxe / sans taxe"
            >
            </th>
            <th
              id="sumTps"
              className="tps col-sum"
              title="Montant de la taxe Fédérale">
            </th>
            <th
              id="sumTvq"
              className="tvq col-sum"
              title="Montant de la taxe provinciale"
            >
            </th>
            <th
              id="sumTotal"
              className="total col-sum"
              title="Somme du MONTANT + taxe fédérale + taxe provinciale = TOTAL"
            >
            </th>
            <th
              className="province col-sum"
              title="Province sélectionnée pour le calcul"
            >
            </th>
            <th
              className="rowCount col-sum deleteBtn"
              title="Nombre de lignes calculées dans ce tableau"
            />
          </tr>
          <tr>
            <th className="montant" title="Prix avant taxe / sans taxe">
              MONTANT&nbsp;$
            </th>
            <th className="tps" title="Montant de la taxe Fédérale">
              TPS/TVH&nbsp;$
            </th>
            <th className="tvq" title="Montant de la taxe provinciale">
              TVQ/TVP&nbsp;$
            </th>
            <th
              className="total"
              title="Somme du MONTANT + taxe fédérale + taxe provinciale = TOTAL"
            >
              TOTAL&nbsp;$
            </th>
            <th
              className="province"
              title="Province sélectionnée pour le calcul"
            >
              PROVINCE ET TAUX
            </th>
            <th
              className="rowCount deleteBtn"
              title="Nombre de lignes calculées dans ce tableau"
            />
          </tr>
          </thead>
          <tbody
            className="results-table--rows"
            title="Pour supprimer une ligne cliquez sur la poubelle, ou utilisez le raccourci clavier [Shift] ou [Ctrl] + [Moins (-)]."
          >
          {/*javascript will populate rows*/}
          </tbody>
        </table>
        <div className="export-btns">
          <button
            id="printBtn"
            type="button"
            aria-label="Imprimer"
            title="Imprimez la liste de vos calculs sur papier ou en fichier PDF"
            onClick={print}
          >
            Imprimer
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M24 5h-4V0H4v5H0v13h4v6h9.519c2.947 0 6.029-3.577 6.434-6H24V5zM6 2h12v3H6V2zm8.691 16.648S16.16 22 12.691 22H6v-8h12v2.648c0 3.594-3.309 2-3.309 2zM21.5 8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zM16 17H8v-1h8v1zm-3 1H8v1h5v-1z"/>
            </svg>
          </button>
          {!isExportedOnce ? (
            <button
              id="excelBtn"
              type="button"
              aria-label="Exporter vers un fichier Excel"
              title="Exportez la liste de vos calculs dans un fichier compatible avec Excel"
              onClick={async function dynamicImportExcellentExport(event) {
                // Dynamic import of ExcellentExport module:
                ExcellentExport = await import("excellentexport");
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
                // https://dmitripavlutin.com/javascript-module-import-twice/
                // If a module is imported multiple times, but with the same specifier (i.e. path),
                // the JavaScript specification guarantees that you’ll receive the same module instance.

                //reference the hidden <a> element that will download the excel file blob:
                const excelBtnAnchor = document.getElementById(
                  "excelBtnAnchor",
                );
                excelBtnAnchor.click(); // <-- Trigger the download
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              Excel
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path
                  d="M28.8125.03125l-28 5.3125c-.472656.089844-.8125.519531-.8125 1v37.3125c0 .480469.339844.910156.8125 1l28 5.3125c.0625.011719.125.03125.1875.03125.230469 0 .445313-.070312.625-.21875.230469-.191406.375-.484375.375-.78125V1c0-.296875-.144531-.589844-.375-.78125-.230469-.191406-.519531-.242188-.8125-.1875zM32 6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.101563 0 2-.898437 2-2V8c0-1.101562-.898437-2-2-2zm4 7h8v2h-8zM6.6875 15.6875h5.125L14.5 21.28125c.210938.441406.398438.984375.5625 1.59375h.03125c.105469-.363281.308594-.933594.59375-1.65625l2.96875-5.53125h4.6875l-5.59375 9.25 5.75 9.4375h-4.96875l-3.25-6.09375c-.121094-.226562-.246094-.644531-.375-1.25H14.875c-.0625.285156-.210937.730469-.4375 1.3125l-3.25 6.03125h-5l5.96875-9.34375zM36 20h8v2h-8zm0 7h8v2h-8zm0 8h8v2h-8z"/>
              </svg>
              {/*the <a> tag is wierd but this is what will download the XLSX file blob*/}
              <a
                href="#"
                id="excelBtnAnchor"
                aria-hidden={true}
                style={{display: "none"}}
                download="taxes_finance-d_com.xlsx"
                onClick={event => {
                  event.stopPropagation(); // <-- VERY IMPORTANT (without this infinite download loop)
                  event.bubbles = false;
                  setIsExportedOnce(true);
                  return exportToExcel(ExcellentExport);
                }}
              />
            </button>
          ) : (
            <p>Téléchargé</p>
          )}
        </div>
      </div>
    </>
  );
}

function handleDeleteBtnClicks(e) {
  const clickedElm = e.target;
  if (
    clickedElm?.className === "deleteBtn" &&
    e.target.parentElement.className === "results-table--row"
  ) {
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
  const tableHeaderCounter = document.querySelector(
    ".results-table--header .rowCount:not(.col-sum)",
  );
  const tableRows = document.querySelector(".results-table--rows");
  tableHeaderCounter.textContent = tableRows.childElementCount.toString();
}

function updateColSums(newRoundedRowValues) {
  const sumMontantEl = document.getElementById("sumMontant")
  const sumTpsEl = document.getElementById("sumTps")
  const sumTvqEl = document.getElementById("sumTvq")
  const sumTotalEl = document.getElementById("sumTotal")

  sumMontantEl.textContent = roundNumber((Number(sumMontantEl.textContent) || 0) + newRoundedRowValues.montant);
  sumTpsEl.textContent = roundNumber((Number(sumTpsEl.textContent) || 0) + newRoundedRowValues.tps);
  sumTvqEl.textContent = roundNumber((Number(sumTvqEl.textContent) || 0) + newRoundedRowValues.tvq);
  sumTotalEl.textContent = roundNumber((Number(sumTotalEl.textContent) || 0) + newRoundedRowValues.total);
}

function addNewResultRowToTable(montant, tps, tvq, total, province) {
  if (!montant || !total || montant === "0.00" || total === "0.00") {
    //Don't add rows with no $ amounts
    return;
  }

  //The Excel-like table at the bottom of page
  const resultsTable = document.querySelector(".results-table");
  resultsTable.classList.contains("hidden") &&
  resultsTable.classList.remove("hidden");

  const tableRows = resultsTable.querySelector(".results-table--rows");

  const newRowElm = tableRows.insertRow(0);
  updateRowCount();

  const rounded = {
    montant: roundNumber(montant),
    tps: roundNumber(tps),
    tvq: roundNumber(tvq),
    total: roundNumber(total),
  }

  updateColSums(rounded);

  newRowElm.className = "results-table--row";
  newRowElm.innerHTML = `
    <td class="montant">${rounded.montant}</td>
    <td class="tps">${rounded.tps}</td>
    <td class="tvq">${rounded.tvq}</td>
    <td class="total">${rounded.total}</td>
    <td class="province">${province}</td>
    <td class="deleteBtn" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6v18h18V6H3zm5 14c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22z"/></svg>
    </td>
  `;
}

function handleRowDeleteWithHotkey() {
  const tableRows = document.querySelector(".results-table--rows");
  const rowToDelete = tableRows.firstChild;

  deleteTableRow(rowToDelete);
}

function exportToExcel(ExcellentExport) {
  return ExcellentExport.convert(
    {
      anchor: document.getElementById("excelBtnAnchor"),
      filename: "taxes_finance-d_com",
      format: "xlsx",
    },
    [
      {
        name: "taxes.finance-d.com",
        from: {
          table: document.querySelector(".results-table table"),
        },
        removeColumns: [5],
        // fixValue: function (value, row, column) {
        //   let fixedValue = value;
        //   if (column > 4 && value.includes("&nbsp;")) {
        //     fixedValue = value.replace("&nbsp;", " ");
        //   }
        //   return fixedValue;
        // }
      },
    ],
  );
}

function print() {
  window.print();
}

//Export for TaxCalculator component to use in its onKeyDown handler
export {addNewResultRowToTable, handleRowDeleteWithHotkey};

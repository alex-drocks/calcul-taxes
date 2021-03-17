export default function TaxeInCheckbox({onChangeHandler}) {
  return (
    <div className="field taxeIn">
      <label htmlFor="taxeIn" title="Mode de calcul de taxes inverse / taxes incluses.">
        <h2>Calcul de taxes inversé:</h2>
      </label>
      <input type="checkbox" id="taxeIn"
             title="Cliquez pour activer ou désactiver le mode de calcul taxes inverse."
             onChange={onChangeHandler}
      />
    </div>
  );
}
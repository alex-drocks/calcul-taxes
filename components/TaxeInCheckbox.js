export default function TaxeInCheckbox({onChangeHandler}) {
  return (
    <div className="field taxeIn">
      <label htmlFor="taxeIn">
        <h2>Calcul de taxes inversé:</h2>
      </label>
      <input type="checkbox" value="taxeIn" id="taxeIn"
             onChange={onChangeHandler}/>
    </div>
  );
}
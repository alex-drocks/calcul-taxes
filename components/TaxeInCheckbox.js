export default function TaxeInCheckbox({defaultChecked, onChangeHandler}) {
  return (
    <div className="field taxeIn">
      <label
        htmlFor="taxeIn"
        title="Cliquez sur le carré à droite pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
      >
        <h2>Calcul de taxes inversé:</h2>
      </label>
      <input
        type="checkbox"
        id="taxeIn"
        title="Cliquez pour basculer entre le mode de calcul de taxes inverse (taxes incluses) ou le calcul régulier avant taxes."
        defaultChecked={defaultChecked}
        onChange={onChangeHandler}
      />
    </div>
  );
}

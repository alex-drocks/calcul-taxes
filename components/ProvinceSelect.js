export default function ProvinceSelect({defaultValue, onChangeHandler}) {
  return (
    <div className="field">
      <label
        htmlFor="province"
        title="Sélectionnez le taux de taxes actif pour votre calcul en choisissant la province ou le territoire approprié."
      >
        <h2>Province/territoire du Canada:</h2>
      </label>
      <select
        id="province"
        className="province-select"
        name="province"
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        title="Sélectionnez le taux de taxes actif pour votre calcul en choisissant la province ou le territoire approprié."
      >
        <option value="Alberta (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Alberta (TPS 5%)
        </option>
        <option value="Colombie-Britanique (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Colombie-Britanique (TPS 5%)
        </option>
        <option value="Colombie-Britanique (TPS 5% + TVP 7%)" data-tps={0.05} data-tvp={0.07}>
          Colombie-Britanique (TPS 5% + TVP 7%)
        </option>
        <option value="Île-du-Prince-Édouard (TVH 15%)" data-tps={0.15} data-tvp={0}>
          Île-du-Prince-Édouard (TVH 15%)
        </option>
        <option value="Manitoba (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Manitoba (TPS 5%)
        </option>
        <option value="Manitoba (TPS 5% + TVP 8%)" data-tps={0.05} data-tvp={0.08}>
          Manitoba (TPS 5% + TVP 8%)
        </option>
        <option value="Nouveau-Brunswick (TVH 15%)" data-tps={0.15} data-tvp={0}>
          Nouveau-Brunswick (TVH 15%)
        </option>
        <option value="Nouvelle-Écosse (TVH 15%)" data-tps={0.15} data-tvp={0}>
          Nouvelle-Écosse (TVH 15%)
        </option>
        <option value="Nunavut (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Nunavut (TPS 5%)
        </option>
        <option value="Ontario (TVH 13%)" data-tps={0.13} data-tvp={0}>
          Ontario (TVH 13%)
        </option>
        <option value="Québec (TPS 5% + TVQ 9.975%)" data-tps={0.05} data-tvp={0.09975}>
          Québec (TPS 5% + TVQ 9.975%)
        </option>
        <option value="Saskatchewan (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Saskatchewan (TPS 5%)
        </option>
        <option value="Saskatchewan (TPS 5% + TVP 6%)" data-tps={0.05} data-tvp={0.06}>
          Saskatchewan (TPS 5% + TVP 6%)
        </option>
        <option value="Terre-Neuve-et-Labrador (TVH 15%)" data-tps={0.15} data-tvp={0}>
          Terre-Neuve-et-Labrador (TVH 15%)
        </option>
        <option value="Territoires du Nord-Ouest (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Territoires du Nord-Ouest (TPS 5%)
        </option>
        <option value="Yukon (TPS 5%)" data-tps={0.05} data-tvp={0}>
          Yukon (TPS 5%)
        </option>
      </select>
    </div>
  );
}

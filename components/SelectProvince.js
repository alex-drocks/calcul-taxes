export default function SelectProvince({onChangeHandler}) {
  return (
    <div className="field">
      <label htmlFor="province"><h2>Province/territoire du Canada:</h2></label>
      <select id="province" name="province" defaultValue="Québec"
              onChange={onChangeHandler}>
        <option value="Alberta">Alberta</option>
        <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
        <option value="Manitoba">Manitoba</option>
        <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
        <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
        <option value="Nunavut">Nunavut</option>
        <option value="Ontario">Ontario</option>
        <option value="Québec">Québec</option>
        <option value="Saskatchewan">Saskatchewan</option>
        <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
        <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
        <option value="Yukon">Yukon</option>
      </select>
    </div>
  )
}
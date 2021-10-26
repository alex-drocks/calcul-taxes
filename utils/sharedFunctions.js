function roundNumber(num) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}


function showTheHandIconUnderEditableInput(isTaxeIn) {
  const montantInstructionEl = document.querySelector(".field.montant");
  const totalInstructionEl = document.querySelector(".field.total");
  if (isTaxeIn) {
    montantInstructionEl.classList.remove("isActiveCalculationMode");
    totalInstructionEl.classList.add("isActiveCalculationMode");
  } else {
    montantInstructionEl.classList.add("isActiveCalculationMode");
    totalInstructionEl.classList.remove("isActiveCalculationMode");
  }
}


function autoFocusOnlyEditableInput(isTaxeIn) {
  const editableUserInput = document.getElementById(`${isTaxeIn ? "total" : "montant"}`);
  if (editableUserInput) {
    editableUserInput.focus();
    setTimeout(() => {
      editableUserInput.select();
    }, 20);
  }
  showTheHandIconUnderEditableInput(isTaxeIn);
}


export {roundNumber, showTheHandIconUnderEditableInput, autoFocusOnlyEditableInput}
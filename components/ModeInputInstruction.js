export default function ModeInputInstruction({taxeIn}) {
  return (
    <p className="calculator-instructions no-select" style={{color: "var(--blue)", textAlign: "right"}}>
      {taxeIn ? `Entrez le TOTAL (taxes incluses).` : `Entrez le MONTANT (avant taxes).`}
    </p>
  );
}
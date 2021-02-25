export default function Instructions({taxeIn}) {
  return (
    <p className="calculator-instructions" style={{color: "rgba(0, 8, 27, .59)", textAlign: "right"}}>
      {taxeIn ? `Entrez le TOTAL (taxes incluses).` : `Entrez le MONTANT (avant taxes).`}
    </p>
  );
}
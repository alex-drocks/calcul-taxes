export default function Instructions({taxeIn}) {
  return (
    <p className="calculator-instructions" style={{color: "rgba(0, 8, 27, 0.6)"}}>
      {taxeIn ?
        `Puisque le mode de calcul inversé est actif,
        entrez le total incluant les taxes pour calculer les taxes incluses
        dans ce montant et pour obtenir le montant net avant taxes.`
        :
        `Entrez le montant sans taxes pour obtenir le calcul des taxes selon le taux en vigueur
        et pour obtenir le total incluant les taxes.`
      }
    </p>
  )
}
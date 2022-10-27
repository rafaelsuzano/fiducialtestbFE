export default {

    avoirWarning: () => {
        return {
            documentType: 'avoir',
            amount: '500',
            expectedWarningMessage: "Le montant TTC de l'avoir ne peut être supérieur au montant restant dû de la facture sélectionnée !"
        }
    }
}
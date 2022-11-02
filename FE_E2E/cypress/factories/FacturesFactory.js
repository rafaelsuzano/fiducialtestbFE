export default {

    invoices: () => {
        return {
            warning: {
                documentType: 'avoir',
                amount: '500',
                expectedWarningMessage: "Le montant TTC de l'avoir ne peut être supérieur au montant restant dû de la facture sélectionnée !"
            },
            inv: {
                documentType: 'avoir',
                goal: 'E2E Test',
            }
        }
    }
}
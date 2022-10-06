describe('Teste Login', () => {
  it('Login com Sucesso', () => {
    cy.visit('https://qa.yesaccount.com/login')
    
    cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[1]/fiducial-input/div/input')
        .type('fiducial@fiducial.net');
 


    cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/fiducial-input/div/input')
        .type('1234') ;

    cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[2]/button')
    .click();

    
    cy.wait(5000)
    cy.visit("https://qa.yesaccount.com/sales/companies/1/receipts")

  })
})
 

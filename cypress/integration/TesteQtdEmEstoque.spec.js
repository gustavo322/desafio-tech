describe('Testa as validações de estoque', ()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });

    beforeEach(()=>{
        cy.visit('https://meucomercio.com.br/lojaqualificacao') 
            
    })

    it('TesteLimiteQtdEmEstoque', ()=>{

        cy.get(':nth-child(2) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type(12)
        cy.get('span > p').should('have.text', 'Quantidade indisponível. Apenas 11 unidades em estoque')
        cy.get('.nex-confirm-modal__footer > .ui').click()
        cy.get(':nth-child(2) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type(1)
        cy.reload()
        cy.get('.list-product__items__wrapper > .ui > .row > :nth-child(2)').click()
        cy.get('.secondary > .nex-icon').click()
        cy.get('span > p').should('have.text', 'Quantidade indisponível. Apenas 11 unidades em estoque')
        cy.get('.nex-confirm-modal__footer > .ui').click()
    })
})
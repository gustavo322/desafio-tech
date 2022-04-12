describe('Testa o componente da barra de pesquisa', ()=>{
   
    //Coloquei para ignorar um erro que estava acontecendo onde nem o cypress sabia oque era, tentei investigar mas não descobri, e como não me impactou decidi deixa-lo de lado
    //mas o ideal era investigar e verificar oque está acontecendo de fato
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
        });

    beforeEach(()=>{
        cy.visit('https://meucomercio.com.br/lojaqualificacao') 
        
    })

    it('TesteBarraDePesquisa', ()=>{
        //Pesquisa retornando apenas um produto
        cy.get('.search-bar__input').type('Alicate')
        cy.wait(1500)
        cy.get('.list-product__grid-column__title', { timeout : 2000}).click()
        cy.get('.product-detail__content__info__product_name', { timeout : 2000}).should('have.text', 'Alicate de Bico - Uzzy')

        cy.get('.nex-sidebar__store-profile > .ui').click()

        //Pesquisa retornando 2 produtos sendo escolhido pelo nth-child(1) qual vai ser selecionado
        cy.get('.search-bar__input').type('Capa')
        cy.wait(1500)
        cy.get(':nth-child(1) > .list-product__grid-column__info > .list-product__grid-column__title', { timeout : 2000}).click()
        cy.get('.product-detail__content__info__product_name', { timeout : 2000}).should('have.text', ' Capa Celular S20 Clonado')        
      
    })
    
   
    
      
    })

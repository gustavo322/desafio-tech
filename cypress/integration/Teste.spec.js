describe('Work with basic elements', ()=>{
   
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
    it('TesteNaoAcharEnderecoPeloCep', ()=>{
        cy.get(':nth-child(1) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('3')
        cy.get(':nth-child(2) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('3')
        cy.get(':nth-child(3) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('3')
        cy.get('.checkout-button').click()
        cy.get('footer > .ui').click()
        cy.get('.switch-box').click()
        cy.get('.form > .sixteen > .ui').type('SC')
        cy.get('.form > :nth-child(2) > .ui').type('Blumenau')
        cy.wait(1000)
        cy.get(':nth-child(3) > .icon > input').type('Itoupavazinha')
        cy.get(':nth-child(4) > .icon > input').type('89066304')
        cy.get(':nth-child(5) > .icon > input').type('Frederico Jensen')
        cy.get('.five > .icon > input').type('2440')
        cy.get('.ten > .icon > input').type('Bl 1, AP 908')
        cy.get('footer > .ui').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .icon > input').type('Gustavo Wesley Tose da Silva')
        cy.get('.form > :nth-child(2) > .icon > input').type('Gustavo.Wesleyy@gmail.com')
        cy.get('.country-selector > .input > input').type('47984731582')
        cy.get('.flex-col > .flex > .ui').click()
        cy.get('footer > .ui').click()
        
        //Validação valor total do pedido
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .summary-header > .flex > :nth-child(2)', {timeout: 10000})
        .should('have.text', 'Total: R$ 335,25')

        //Validação Dados de contato
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > [style="text-transform: capitalize;"]')
        .should('have.text', 'Nome: Gustavo Wesley Tose da Silva')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(2)')
        .should('have.text', 'Email: Gustavo.Wesleyy@gmail.com')
        
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(3)')
        .should('have.text', 'Celular/Whatsapp: 47984731582')

        //Validação Endereço de entrega

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(2)')
        .should('have.text', '\n            Frederico Jensen,\n            2440\n            Bl 1, AP 908\n            ')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(3)')
        .should('have.text', '\n              Itoupavazinha,\n              Blumenau - SC,\n              Brasil\n              ')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(4)')
        .should('have.text', 'CEP 89066304')

    })

    it('TesteAcharEnderecoPeloCep', ()=>{
        cy.get(':nth-child(1) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('1')
        cy.get(':nth-child(2) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('2')
        cy.get(':nth-child(3) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('3')
        cy.get('.checkout-button').click()
        cy.get('footer > .ui').click()
        cy.get('.eight > .icon > input').type('89066304')
        cy.get('.five > .icon > input').type('2440')
        cy.get('.ten > .icon > input').type('Casa Verde')
        cy.get('footer > .ui').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .icon > input').type('Gustavo Wesley Tose da Silva')
        cy.get('.form > :nth-child(2) > .icon > input').type('Gustavo.Wesleyy@gmail.com')
        cy.get('.country-selector > .input > input').type('47984731582')
        cy.get('.flex-col > .flex > .ui').click()
        cy.get('footer > .ui').click()
        
        //Validação valor total do pedido
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .summary-header > .flex > :nth-child(2)', {timeout: 10000})
        .should('have.text', 'Total: R$ 200,25')

        //Validação Dados de contato
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > [style="text-transform: capitalize;"]')
        .should('have.text', 'Nome: Gustavo Wesley Tose da Silva')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(2)')
        .should('have.text', 'Email: Gustavo.Wesleyy@gmail.com')
        
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(3)')
        .should('have.text', 'Celular/Whatsapp: 47984731582')

        //Validação Endereço de entrega

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(2)')
        .should('have.text', '\n            Rua Frederico Jensen,\n            2440\n            Casa Verde\n            ')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(3)')
        .should('have.text', '\n              Itoupavazinha,\n              Blumenau - SC,\n              Brasil\n              ')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .order-dispatched__content__data__delivery__address > :nth-child(4)')
        .should('have.text', 'CEP 89066304')
    })

    it('TesteRetirarPedidoNaLoja', ()=>{
        cy.get(':nth-child(1) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('5')
        cy.get(':nth-child(2) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('4')
        cy.get(':nth-child(3) > .list-product__grid-column__info > .list-product__grid-column__div-section > :nth-child(2) > .amount-input > .amount-input__value').type('3')
        cy.get('.checkout-button').click()
        cy.get('footer > .ui').click()
        cy.get('.withdraw__options > :nth-child(1) > input').click()
        cy.get('footer > .ui').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .icon > input').type('Gustavo Wesley Tose da Silva')
        cy.get('.form > :nth-child(2) > .icon > input').type('Gustavo.Wesleyy@gmail.com')
        cy.get('.country-selector > .input > input').type('47984731582')
        cy.get('.flex-col > .flex > .ui').click()
        cy.get('footer > .ui').click()

        //Validação valor total do pedido
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__products > .summary-header > .flex > :nth-child(2)', {timeout: 10000})
        .should('have.text', 'Total: R$ 470,25')

        //Validação Dados de contato
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > [style="text-transform: capitalize;"]')
        .should('have.text', 'Nome: Gustavo Wesley Tose da Silva')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(2)')
        .should('have.text', 'Email: Gustavo.Wesleyy@gmail.com')
        
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > :nth-child(2) > .content > :nth-child(3)')
        .should('have.text', 'Celular/Whatsapp: 47984731582')

        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .flex-justify-between > .order-dispatched__content__data__delivery__address > .header')
        .should('have.text', 'Retirada em Loja Qualificacao')
        
        cy.get('.order-dispatched__content > .order-dispatched__content-section > .order-dispatched__content__data > .order-dispatched__content__data__list > .order-dispatched__content__data__delivery > .flex-justify-between > .order-dispatched__content__data__delivery__address > span')
        .should('have.text', '\n    R. José de Oliveira Franco, 54321 99 -\n    Bairro Alto, Curitiba - PR, BR\n  ')

    })
    
      
    })

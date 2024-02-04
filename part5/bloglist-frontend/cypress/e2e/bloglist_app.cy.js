describe('Blog app', function () {

  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    // cy.visit('http://localhost:5173')
    cy.contains('Blog List App')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('Login')
  })
 
})

describe('Blog app', function () {
  const user = {
    username: 'testingUser',
    name: 'Mr tester',
    password: 'TestingE2E'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/users/testing/reset', user)
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
  describe('Login functionality', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginButton').click()

      cy.contains(`👋 Welcome ${user.name}`)
    })
    it('fails with incorrect credentials', function () {
      cy.get('#username').type('wrong user')
      cy.get('#password').type('wrong pass')
      cy.get('#loginButton').click()

      cy.contains('❌ Wrong username or password. Details: AxiosError: Request failed with status code 401')
    })
    it('when fails shows red notification', function () {
      cy.get('#username').type('wrong user')
      cy.get('#password').type('wrong pass')
      cy.get('#loginButton').click()

      cy.get('.toast').should('have.css', 'background-color', 'rgb(255, 173, 173)') // cypress doesn't understand hex
    })
  })
})

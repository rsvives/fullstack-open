import { initialBlogs } from '../../../../part4/blogListsApp/tests/test_helper'
describe('Blog app', function () {
  const user = {
    username: 'testingUser',
    name: 'Mr tester',
    password: 'TestingE2E'
  }
  const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)

  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset', user)
  })

  beforeEach(function () {
    // reset db
    cy.request('POST', 'http://localhost:3003/api/testing/reset', user)
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
  describe('When logged in', function () {
    const newBlog = {
      title: 'New blog',
      author: 'myself',
      url: 'https://myblog.me'
    }
    beforeEach(function () {
      // await cy.request('POST', 'http://localhost:3003/api/testing/reset', user)

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#blogTitle').type(newBlog.title)
      cy.get('#blogAuthor').type(newBlog.author)
      cy.get('#blogUrl').type(newBlog.url)
      cy.get('#newBlogForm').submit()

      cy.get('.blogList > div').last().contains(`${newBlog.title} | ${newBlog.author}`)
    })
    it('A blog can be liked', function () {
      const firstElement = cy.get('.blogList > div').first().contains('show')
      firstElement.click()

      const likeButton = cy.get('.likeButton')
      cy.contains('12 likes')
      likeButton.click()
      cy.contains('13 likes')
    })
    it('A blog can be deleted by its owner', function () {
      cy.contains('New Blog').click()
      cy.get('#blogTitle').type(newBlog.title)
      cy.get('#blogAuthor').type(newBlog.author)
      cy.get('#blogUrl').type(newBlog.url)

      cy.intercept('POST', '/api/blogs').as('newBlog')
      cy.get('#newBlogForm').submit()

      cy.wait('@newBlog')

      const addedBlog = cy.get('.blog').last()
      addedBlog.contains('show').click()

      cy.intercept('DELETE', '/api/blogs').as('deleteBlog')
      cy.contains('delete').click()

      // cy.wait('@deleteBlog')

      cy.contains(`${newBlog.title} | ${newBlog.author}`).should('not.exist')
    })
    it('Delete button only shown in owned blogs', function () {
      cy.contains('New Blog').click()
      cy.get('#blogTitle').type(newBlog.title)
      cy.get('#blogAuthor').type(newBlog.author)
      cy.get('#blogUrl').type(newBlog.url)
      // cy.intercept('POST', '/api/blogs').as('newBlog')
      cy.get('#newBlogForm').submit()

      // cy.wait('@newBlog')

      // const addedBlog = cy.get('.blog').last()
      cy.contains(`${newBlog.title} | ${newBlog.author}`)
      cy.get('.blog').last().as('lastBlog')
      cy.get('@lastBlog').contains('show').click()

      cy.get('.blog').first().as('firstBlog')
      cy.get('@firstBlog').contains('show').click()
      cy.get('@firstBlog').contains('delete').should('not.exist')
      cy.get('@lastBlog').contains('delete')
    })
    it('Blogs are sorted by likes', function () {
      cy.get('.blog').as('blog')
      cy.get('@blog').eq(0).as('firstBlog')
      cy.get('@blog').eq(1).as('secondBlog')

      cy.get('@firstBlog').should('contain', sortedBlogs[0].title)
      cy.get('@secondBlog').contains('show').click()
      cy.intercept('PUT', `/api/blogs/${sortedBlogs[1]._id}`).as('update')
      cy.get('@secondBlog').get('.likeButton').click()
      cy.wait('@update')
      cy.get('@secondBlog').get('.likeButton').click()
      cy.wait('@update')
      cy.get('@firstBlog').should('contain', sortedBlogs[1].title)
    })
  })
})

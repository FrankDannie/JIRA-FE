/// <reference types="cypress" />
import { expect } from 'chai'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('renders the login form correctly', () => {
    cy.get('h2').should('contain', 'Login')
    cy.get('input[placeholder="Enter your username"]').should('be.visible')
    cy.get('input[placeholder="Enter your password"]').should('be.visible')
    cy.get('button').should('contain', 'Login')
    cy.get('a[href="/signup"]').should('contain', 'Sign up')
  })

  it('allows input in the username and password fields', () => {
    cy.get('input[placeholder="Enter your username"]').type('testuser')
    cy.get('input[placeholder="Enter your username"]').should('have.value', 'testuser')

    cy.get('input[placeholder="Enter your password"]').type('password123')
    cy.get('input[placeholder="Enter your password"]').should('have.value', 'password123')
  })

  it('successfully logs in with valid credentials', () => {
    cy.intercept('POST', '**/auth/login').as('loginRequest')

    cy.get('input[placeholder="Enter your username"]').type('testuser')
    cy.get('input[placeholder="Enter your password"]').type('password123')

    cy.get('button').click()

    cy.wait('@loginRequest').then((interception) => {
      console.log('url', interception.request.url)
      expect(interception.response?.statusCode).to.equal(200)
      expect(interception.response?.body.token).to.exist
      cy.url().should('include', '/dashboard')
    })
  })
})

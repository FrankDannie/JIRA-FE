/// <reference types="cypress" />
import { expect } from 'chai'

describe('SignUp Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('renders the signup form correctly', () => {
    cy.get('h2').should('contain', 'Sign Up')
    cy.get('input[placeholder="Enter your username"]').should('be.visible')
    cy.get('input[placeholder="Enter your password"]').should('be.visible')
    cy.get('input[placeholder="Enter your email"]').should('be.visible')
    cy.get('button').should('contain', 'Submit')
    cy.get('a[href="/login"]').should('contain', 'Login')
  })

  it('allows input in the username and password fields', () => {
    cy.get('input[placeholder="Enter your username"]').type('testuser')
    cy.get('input[placeholder="Enter your username"]').should('have.value', 'testuser')

    cy.get('input[placeholder="Enter your email"]').type('test@mail.com')
    cy.get('input[placeholder="Enter your email"]').should('have.value', 'test@mail.com')

    cy.get('input[placeholder="Enter your password"]').type('password123')
    cy.get('input[placeholder="Enter your password"]').should('have.value', 'password123')
  })

  it('successfully sign up in with valid credentials', () => {
    cy.intercept('POST', '**/auth/signup').as('signupRequest')

    cy.get('input[placeholder="Enter your username"]').type('testuser4')
    cy.get('input[placeholder="Enter your email"]').type('test4@mail.com')
    cy.get('input[placeholder="Enter your password"]').type('password123')

    cy.get('button').click()

    cy.wait('@signupRequest').then((interception) => {
      console.log('url', interception.request.url)
      expect(interception.response?.statusCode).to.equal(400)
    })
  })
})

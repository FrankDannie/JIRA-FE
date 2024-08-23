describe('ProjectForm Component', () => {
  const projectData = {
    name: 'Test Project',
    description: 'This is a test project',
    start_date: '2024-08-20',
    end_date: '2024-08-30',
  }

  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard')
    cy.intercept('GET', '**/projects', { fixture: 'projects.json' }).as('fetchProjects')
  })

  it('creates a new project', () => {
    cy.get('button').contains('Project').click()
    cy.get('input[placeholder="Enter project name"]').type(projectData.name)
    cy.get('textarea[placeholder="Enter project description"]').type(projectData.description)
    cy.get('input[placeholder="Enter start date"]').type(projectData.start_date)
    cy.get('input[placeholder="Enter end date"]').type(projectData.end_date)

    cy.intercept('POST', '**/projects', { statusCode: 201, body: {} }).as('createProject')
    cy.get('button').contains('Create Project').click()
    cy.wait('@createProject').its('response.statusCode').should('eq', 201)
  })

  // it('edits an existing project', () => {
  //   cy.intercept('GET', '**/projects/1', { fixture: 'projects.json' }).as('fetchProject')
  //   cy.get('svg.MuiIconButton-root').click({force: true})
  //   cy.get('.MuiMenuItem-root').contains('Edit').click()
  //   cy.wait('@fetchProject')

  //   cy.get('input[placeholder="Enter project name"]').clear().type('Updated Project Name')
  //   cy.get('button').contains('Update Project').click()

  //   cy.intercept('PUT', '**/projects/1', { statusCode: 200, body: {} }).as('updateProject')
  //   cy.wait('@updateProject').its('response.statusCode').should('eq', 200)
  // })
})

Feature: Dashboard Page

  Scenario: Display list of projects
    Given I am on the Dashboard page
    When the page loads
    Then I should see a list of project cards
    And Each project card should display the project name and description

  Scenario: Navigate to Project Details Page
    Given I am on the Dashboard page
    And I see a list of project cards
    When I click on a project card
    Then I should be redirected to the Project Details page for that project
    And The URL should include the project ID

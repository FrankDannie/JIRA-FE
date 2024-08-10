Feature: Project Details Page

  Scenario: Display project overview and stats
    Given I am on the Project Details page for a project with ID "1"
    When the page loads
    Then I should see the project overview card with project details
    And I should see quick stats for the project including total tasks, completed tasks, and pending tasks

  Scenario: Handle errors while fetching project data
    Given I am on the Project Details page for a project with ID "1"
    And There is an error fetching project data
    When the page loads
    Then I should see an error message indicating the failure to load project data

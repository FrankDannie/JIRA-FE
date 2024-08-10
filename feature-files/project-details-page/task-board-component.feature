Feature: Task Management on Project Details Page

  Scenario: Display tasks in different columns
    Given I am on the Project Details page for a project with ID "1"
    When the page loads
    Then I should see a "To Start" column with tasks that have a status of "to_start"
    And I should see an "In Progress" column with tasks that have a status of "in_progress"
    And I should see a "Completed" column with tasks that have a status of "completed"

  Scenario: Move task from "To Start" to "In Progress"
    Given I am on the Project Details page for a project with ID "1"
    And there is a task titled "Task 1" in the "To Start" column
    When I drag "Task 1" to the "In Progress" column
    Then "Task 1" should be removed from the "To Start" column
    And "Task 1" should appear in the "In Progress" column
    And the task status for "Task 1" should be updated to "in_progress"

  Scenario: Move task from "In Progress" to "Completed"
    Given I am on the Project Details page for a project with ID "1"
    And there is a task titled "Task 2" in the "In Progress" column
    When I drag "Task 2" to the "Completed" column
    Then "Task 2" should be removed from the "In Progress" column
    And "Task 2" should appear in the "Completed" column
    And the task status for "Task 2" should be updated to "completed"

  Scenario: Reorder tasks within the same column
    Given I am on the Project Details page for a project with ID "1"
    And there are two tasks titled "Task 3" and "Task 4" in the "To Start" column
    When I drag "Task 4" to a position above "Task 3" in the "To Start" column
    Then "Task 4" should appear above "Task 3" in the "To Start" column
    And the task order in the "To Start" column should be updated accordingly

  Scenario: Handle errors while updating task status
    Given I am on the Project Details page for a project with ID "1"
    And there is a task titled "Task 5" in the "To Start" column
    When I drag "Task 5" to the "In Progress" column
    And there is an error updating the task status
    Then "Task 5" should be reverted to its original position in the "To Start" column
    And I should see an error message indicating the failure to update the task status

  Scenario: Handle errors while fetching tasks data
    Given I am on the Project Details page for a project with ID "1"
    And there is an error fetching tasks data for the project
    When the page loads
    Then I should see an error message indicating the failure to load tasks
    And the columns "To Start", "In Progress", and "Completed" should not display any tasks

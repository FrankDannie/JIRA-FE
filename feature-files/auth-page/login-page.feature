Feature: Login to the Application

  As a registered user,
  I want to log in to the application,
  So that I can access my account and use the services.

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and password
    And clicks the "Login" button
    Then the user should be redirected to the dashboard page

  Scenario: Unsuccessful login with invalid credentials
    Given the user is on the login page
    When the user enters an invalid username or password
    And clicks the "Login" button
    Then an error message should be displayed
    And the user should remain on the login page

  Scenario: Unsuccessful login with empty fields
    Given the user is on the login page
    When the user clicks the "Login" button without entering any credentials
    Then an error message should be displayed
    And the user should remain on the login page

  Scenario: Unsuccessful login with only username filled
    Given the user is on the login page
    When the user enters a valid username and leaves the password field empty
    And clicks the "Login" button
    Then an error message should be displayed
    And the user should remain on the login page

  Scenario: Unsuccessful login with only password filled
    Given the user is on the login page
    When the user enters a valid password and leaves the username field empty
    And clicks the "Login" button
    Then an error message should be displayed
    And the user should remain on the login page

  Scenario: Successful logout
    Given the user is logged in
    When the user clicks the "Logout" button
    Then the user should be redirected to the login page
    And a logout confirmation message should be displayed

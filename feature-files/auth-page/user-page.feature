Feature: User Signup

  As a new user,
  I want to sign up for the application,
  So that I can create an account and access the services.

  Scenario: Successful signup with valid credentials
    Given the user is on the signup page
    When the user enters a valid username
    And the user enters a valid password
    And the user enters a valid email address
    And the user clicks the "Sign Up" button
    Then the user should be redirected to the dashboard page

  Scenario: Unsuccessful signup with an already taken username
    Given the user is on the signup page
    When the user enters a username that is already taken
    And the user enters a valid password
    And the user enters a valid email address
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating the username is already taken
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with an invalid email address
    Given the user is on the signup page
    When the user enters a valid username
    And the user enters a valid password
    And the user enters an invalid email address
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating the email is invalid
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with a weak password
    Given the user is on the signup page
    When the user enters a valid username
    And the user enters a weak password
    And the user enters a valid email address
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating the password is too weak
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with empty fields
    Given the user is on the signup page
    When the user leaves the username field empty
    And the user leaves the password field empty
    And the user leaves the email field empty
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating that all fields are required
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with only the username filled
    Given the user is on the signup page
    When the user enters a valid username
    And the user leaves the password field empty
    And the user leaves the email field empty
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating that all fields are required
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with only the password filled
    Given the user is on the signup page
    When the user leaves the username field empty
    And the user enters a valid password
    And the user leaves the email field empty
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating that all fields are required
    And the user should remain on the signup page

  Scenario: Unsuccessful signup with only the email filled
    Given the user is on the signup page
    When the user leaves the username field empty
    And the user leaves the password field empty
    And the user enters a valid email address
    And the user clicks the "Sign Up" button
    Then an error message should be displayed indicating that all fields are required
    And the user should remain on the signup page

  Scenario: Successful signup with validation on password strength
    Given the user is on the signup page
    When the user enters a valid username
    And the user enters a strong password meeting all requirements
    And the user enters a valid email address
    And the user clicks the "Sign Up" button
    Then the user should be redirected to the welcome page
    And a confirmation message should be displayed

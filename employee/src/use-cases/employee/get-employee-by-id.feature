Feature: Get Employee by id.

  Scenario Outline: Try to get employee with invalid details, then it will throw error.
    Given Employee details employee id: "<empid>"
    When Try to get employee
    Then It will throw error: "<error>" with message: "<message>" while getting employee
    
    Examples:
        | empid  | error           | message                                   | 
        |        | ValidationError | '"empid" is required'      |
  
  Scenario Outline: Try to create new employee with valid details, then it will create new employee.
    Given Employee details name: "<empname>", email: "<email>" , designation: "<designation>" , companyname: "<cname>" to create new employee
    When Try to create new employee
    Then It will create new employee with details: "<newEmployeeDetails>"

    Examples:
      | empname  | designation  | email             | cname     | newEmployeeDetails    | message               | 
      | karnav   | SE           | karnav@gmail.com  | Rapidops  | '{"id": 1}'           | 'employee is created' |

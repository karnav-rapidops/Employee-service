Feature: Create New Employee.

  Scenario Outline: Try to create new employee with invalid details, then it will throw error.
    Given Employee details name: "<empname>", email: "<email>" , designation: "<designation>" , companyname: "<cname>" to create new employee
    When Try to create new employee
    Then It will throw error: "<error>" with message: "<message>" while creating new employee
    
    Examples:
      | empname  | designation  | email             | cname         | error           | message                     | 
      |          | SE           | karnav@gmail.com  | Rapidops      | ValidationError | '"empname" is required'     |
      | karnav   |              | karnav@gmail.com  | Rapidops      | ValidationError | '"designation" is required' |
      | karnav   | SE           |                   | Rapidops      | ValidationError | '"email" is required'       |
      | karnav   | k            | karnav@gmail.com  |               | ValidationError | '"cname" is required'       |

  
  Scenario Outline: Try to create new employee with valid details, then it will create new employee.
    Given Employee details name: "<empname>", email: "<email>" , designation: "<designation>" , companyname: "<cname>" to create new employee
    When Try to create new employee
    Then It will create new employee with details: "<newEmployeeDetails>"

    Examples:
      | empname  | designation  | email             | cname     | newEmployeeDetails    | message               | 
      | karnav   | SE           | karnav@gmail.com  | Rapidops  | '{"id": 1}'           | 'employee is created' |

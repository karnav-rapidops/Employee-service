Feature: Create New Employee.

  Scenario Outline: Try to create new employee with invalid details, then it will throw error.
    Given Employee details name: "<name>", email: "<email>" , designation: "<designation>" , companyname: "<companyName>" , password: "<password>" to create new employee
    When Try to create new employee
    Then It will throw error: "<error>" with message: "<message>" while creating new employee
    
    Examples:
      | name  | designation  | email             | companyName | password | error           | message                      | 
      |          | SE           | karnav@gmail.com  | Rapidops    | 123456   | ValidationError | '"name" is required'         |
      | karnav   |              | karnav@gmail.com  | Rapidops    | 123456   | ValidationError | '"designation" is required'  |
      | karnav   | SE           |                   | Rapidops    | 123456   | ValidationError | '"email" is required'        |
      | karnav   | k            | karnav@gmail.com  |             | 123456   | ValidationError | '"companyName" is required'  |
      | karnav   | SE           | karnav@gmail.com  | Rapidops    |          | ValidationError | '"password" is required'  |
  
  Scenario Outline: Try to create new employee with valid details, then it will create new employee.
    Given Employee details name: "<name>", email: "<email>" , designation: "<designation>" , companyname: "<companyName>" , password: "<password>" to create new employee
    When Try to create new employee
    Then It will create new employee with details: "<newEmployeeDetails>"

    Examples:
      | name    | designation  | email             | companyName  | newEmployeeDetails | password  | message               | 
      | karnav  | SE           | karnav@gmail.com  | Rapidops     | '{"id": 1}'        | 123456    | 'employee is created' |

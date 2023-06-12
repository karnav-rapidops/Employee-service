Feature: Update employee designation.

  Scenario Outline: Try to update new employee with invalid details, then it will throw error.
    Given Employee details name: "<empid>", designation: "<designation>"
    When Try to update employee designation
    Then It will throw error: "<error>" with message: "<message>" while updating employee designation
    
    Examples:
      | empid    | designation  | error           | message                                     |    
      | 1        |              | ValidationError | '"designation" is not allowed to be empty'  |
  
  Scenario Outline: Try to update new employee with valid details, then it will update new employee.
    Given Employee details name: "<empid>", designation: "<designation>"
    When Try to update employee designation
    Then It will update new employee with message: "<message>"

    Examples:
      | empid    | designation  | message               |     
      | 1        | PM           | 'employee is updated' |
  
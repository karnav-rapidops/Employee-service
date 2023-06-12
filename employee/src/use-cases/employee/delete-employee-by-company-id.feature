Feature: Delete Employee.

    Scenario Outline: Try to delete employee with invalid details, then it will throw error.
        Given Company id: "<cid>"
        When Try to delete employee
        Then It will throw error: "<error>" with message: "<message>" while deleting employee
        
        Examples:
        | cid     | error             | message             |
        |         | ValidationError   | '"cid" is required' |


    Scenario Outline: Try to delete employee with valid details.
        Given Company id: "<cid>"
        When Try to delete employee
        Then It will delete employee with message: "<message>"
        
        Examples:
        | cid     | message             |
        | 1       | 'Employee deleted!' |
    

  
  
Feature: Delete employee by employee id.

    Scenario Outline: Try to delete employee with invalid details
        Given Employee id: "<id>"
        When Try to delete employee by employee id 
        Then It will throw error: "<error>" with message: "<message>" while deleting employee with employee id
        
        Examples:
            | id | error           | message                           | 
            |    | ValidationError | '"id" is not allowed to be empty' |

    Scenario Outline: Try to delete employee with valid details
        Given Employee id: "<id>"
        When Try to delete employee by employee id 
        Then It will delete employee using employee id and gives deleted employee id: "<id>"
        
        Examples:
            | id | 
            | 1  |



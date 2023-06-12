Feature: Update employee name.

    Scenario Outline: Try to update employee name with invalid details, then it will throw error.
        Given Employee details name: "<empname>", employeeid: "<empid>"
        When Try to update employee name
        Then It will throw error: "<error>" with message: "<message>" while updating employee name
        
        Examples:
        | empid    | empname   | error           | message                                   | 
        |          | karnav    | ValidationError | '"empid" is not allowed to be empty'      |
        | 123      |           | ValidationError | '"empname" is not allowed to be empty'    |



    Scenario Outline: Try to update employee name with valid details, then it will update employee name.
        Given Employee details name: "<empname>", employeeid: "<empid>"
        When Try to update employee name
        Then It will update employee name with details : "<updatedEmployeeDetail>"
        
        Examples:
        | empid    | empname   | updatedEmployeeDetail    | 
        | 123      | karnav    | '123'                    |



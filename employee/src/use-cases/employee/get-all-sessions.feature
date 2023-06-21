Feature: Get all active sessions of employee 

     Scenario Outline: Try to get all active sessions with invalid details
        Given Employee id: "<id>" , sorting order: "<sortingOrder>" , column to sort: "<columnToSort>"
        When Try to get all sessions 
        Then It will throw error: "<error>" with message: "<message>"
        
        Examples:
            | id | sortingOrder | columnToSort | sessionDetails |  error          | message                          | 
            |    | xyz          | abc          | '[{"id":123}]' | ValidationError | '"id" is not allowed to be empty' |


    Scenario Outline: Try to get all active sessions with valid details
        Given Employee id: "<id>" , sorting order: "<sortingOrder>" , column to sort: "<columnToSort>"
        When Try to get all sessions 
        Then It will give all session details: "<sessionDetails>"
        
        Examples:
            | id | sortingOrder | columnToSort | sessionDetails |  
            | 1  | xyz          | abc          | '[{"id":123}]' |

        

Feature: Search session.

    Scenario Outline: Try to get sessions with valid details
        Given Employee id: "<id>" , search column: "<searchColumn>" , search value: "<searchValue>" , sorting order: "<sortingOrder>"
        When Try to get sessions 
        Then It will give sessionsDetails: "<sessionsDetails>"
        
        Examples:
            | id    | searchColumn | searchValue | sortingOrder | sessionsDetails   | 
            | 1     | abc          | xyz         | ASC          | '[{"id":123}]'    |



    Scenario Outline: Try to get sessions with invalid details
    Given Employee id: "<id>" , search column: "<searchColumn>" , search value: "<searchValue>" , sorting order: "<sortingOrder>"
    When Try to get sessions 
    Then It will give error: "<error>" with message: "<message>"
    
    Examples:
        | id   | searchColumn | searchValue | sortingOrder | error             | message                                     | 
        |      | abc          | xyz         | ASC          | ValidationError   | '"id" is not allowed to be empty'           |
        | 1    |              | xyz         | ASC          | ValidationError   | '"searchField" is not allowed to be empty' |
        | 1     | abc         |             | ASC          | ValidationError   | '"searchValue" is not allowed to be empty'  |
        | 1     | abc         | xyz         |              | ValidationError   | '"sortingOrder" is not allowed to be empty' |
  
    
Feature: Get emloyee location

    Scenario Outline: Try to get employee location with valid details
        Given Employee ip: "<ip>"
        When Try to get location 
        Then It will give location: "<location>"
        
        Examples:
            | ip                | location | 
            | 202.131.125.122   | abc      |

    
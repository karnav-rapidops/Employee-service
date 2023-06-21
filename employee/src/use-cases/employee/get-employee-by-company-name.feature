Feature: Get employee by company name

    Scenario Outline: Try to get employees by company with valid details
        Given company name: "<companyName>"
        When Try to get employee by company name 
        Then It will give employeesDetail: "<employeesDetail>"
        
        Examples:
            | companyName   | employeesDetail |
            | abc           | '[{"id": 123}]' | 


    Scenario Outline: Try to get employees by company with invalid details
        Given company name: "<companyName>"
        When Try to get employee by company name 
        Then It will give error: "<error>" with message: "<message>" while giving employee details
        
        Examples:
            | companyName   | error             | message                                    |
            |               | ValidationError   | '"companyName" is not allowed to be empty' |
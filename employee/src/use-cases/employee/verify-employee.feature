Feature: Verify employee

    Scenario Outline: Try to verify employee with valid details.
        Given Employee token: "<token>"
        When Try to verify employee 
        Then It will verify employee with message: "<message>"
        
        Examples:
        | token                                                                                                                           | message          |
        |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0Ijoia2FybmF2IiwiaWF0IjoxNjg3MzM4MzQ2fQ.yQ9vP03vNdbJe63hfj81Sp2MEH3YcvpNv4zsvFOSg6M  | employee is verified |  




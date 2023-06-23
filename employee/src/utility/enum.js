const permissions = {
    
    // Employee routes
    'GET:/employee/verify/:verificationToken' : 'verifyEmployee',
    
    'GET:/employee/login/v1' : 'loginEmployee',
    
    'POST:/employee' : 'createEmployee',
    
    'GET:/employee/:id' : 'getEmployee', 

    'GET:/employee/company/:companyname' : 'getEmployeeByCompanyName',
    
    'DELETE:/employee/:id' : 'deleteEmployee',
    
    'DELETE:/employee/company/:id' : 'deleteEmployeeByCompanyName',
    
    'PATCH:/employee/name/:id': 'updateEmployeeName',
    
    'PATCH:/employee/designation/:id' : 'updateEmployeeDesignation', 
    
    'GET:/employee/sessions/:id': 'getSessions',
    
    'GET:/employee/search/:empid/:searchField/:searchValue' : 'searchSessions',

    'POST:/employee/sessions/DELETE': 'deleteSessions',

    // Files routes
    'POST:/employee/file/upload' : 'uploadFile',

    'GET:/employee/file/download/:fileName' : 'downloadFile',

    // Roles routes
    'POST:/employee/role/create' : 'createRole',
    
    'POST:/employee/role/assign': 'assignRole',

    'DELETE:/employee/role/DELETE/:id': 'deleteRole',

}

module.exports = permissions

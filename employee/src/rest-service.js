const express = require('express');
const router = express.Router();
const upload = require('./middleware/file-upload');
const controllers = require('./controller');

// middlewares
const { verifyAccessToken } = require('./middleware');
const { checkPermission } = require('./middleware')

// Initializing routes
initEmployeeRoutes();
initFileRoutes();
initRoleRoutes();

function initEmployeeRoutes()
{
    router.get('/employee/:id', verifyAccessToken, checkPermission , controllers.employee.getEmployeeByIdAction)

    router.get('/employee/company/:companyname',  verifyAccessToken, checkPermission  , controllers.employee.getEmployeeByCompanyNameAction)
    
    router.get('/employee/verify/:verificationToken', controllers.employee.verifyEmployeeAction);

    router.get('/employee/login/v1', controllers.employee.loginEmployeeAction)

    router.get('/employee/sessions/:id', verifyAccessToken, checkPermission ,controllers.employee.getAllSessionsAction)
    
    router.get('/employee/search/:empid/:searchField/:searchValue', verifyAccessToken, checkPermission, controllers.employee.searchSessionsAction)

    router.post('/employee', verifyAccessToken , checkPermission, controllers.employee.insertEmployeeAction);

    router.patch('/employee/name/:id', verifyAccessToken, checkPermission , controllers.employee.updateEmployeeNameAction);
    
    router.patch('/employee/designation/:id', verifyAccessToken, checkPermission , controllers.employee.getUpdateEmployeeDesignationAction)
    
    router.post('/employee/sessions/delete', verifyAccessToken, checkPermission , controllers.employee.deleteSessionsAction)
    
    router.delete('/employee/:id', verifyAccessToken, checkPermission, controllers.employee.deleteEmployeeByIdAction)
    
    router.delete('/employee/company/:id', verifyAccessToken, checkPermission, controllers.employee.deleteEmployeeByCompanyIdAction);

}

function initFileRoutes()
{
    router.post('/employee/file/upload', verifyAccessToken, checkPermission, upload.single('file') , controllers.file.uploadFileAction);
    router.get('/employee/file/download/:fileName', verifyAccessToken, checkPermission, controllers.file.downloadFileAction);
}

function initRoleRoutes()
{
    router.post('/employee/role/create', verifyAccessToken ,checkPermission , controllers.role.addRoleAction);
    router.post('/employee/role/assign', verifyAccessToken , checkPermission , controllers.role.assignRoleAction);
    router.delete('/employee/role/delete/:id', verifyAccessToken , checkPermission , controllers.role.deleteRoleAction);
}

module.exports = router
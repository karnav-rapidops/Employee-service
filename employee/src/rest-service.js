const express = require('express');
const router = express.Router();
const middeleware = require('./middleware');
const controllers = require('./controller');

initEmployeeRoutes();

function initEmployeeRoutes()
{
    router.get('/employee/:id', middeleware.verifyAccessToken , (req, res)=>{
        controllers.employee.getEmployeeByIdAction(req, res);
    })
    router.get('/employee/company/:companyname', (req, res)=>{
        controllers.employee.getEmployeeByCompanyNameAction(req, res);
    })
    router.get('/employee/verify/:verificationToken', (req, res)=>{
        controllers.employee.verifyEmployeeAction(req, res);
    })
    router.get('/employee/login/v1', (req, res)=>{
        controllers.employee.loginEmployeeAction(req, res);
    })
    router.get('/employee/sessions/:id', middeleware.verifyAccessToken, (req, res)=>{
        controllers.employee.getAllSessionsAction(req, res);
    })
    router.get('/employee/search/:empid/:searchField/:searchValue', middeleware.verifyAccessToken ,(req, res)=>{
        controllers.employee.searchSessionsAction(req , res);
    })
    router.post('/employee', (req, res)=>{
        controllers.employee.insertEmployeeAction(req, res);
    })
    router.patch('/employee/name/:id', middeleware.verifyAccessToken ,(req, res)=>{
        controllers.employee.updateEmployeeNameAction(req, res);
    })
    router.patch('/employee/designation/:id', middeleware.verifyAccessToken , (req, res)=>{
        controllers.employee.getUpdateEmployeeDesignationAction(req, res);
    })
    router.post('/employee/sessions/delete', (req, res)=>{
        controllers.employee.deleteSessionsAction(req, res);
    })
    router.delete('/employee/:id', middeleware.verifyAccessToken , (req, res)=>{
        controllers.employee.deleteEmployeeByIdAction(req, res);
    })
    router.delete('/employee/company/:id', middeleware.verifyAccessToken, (req, res)=>{
        controllers.employee.deleteEmployeeByCompanyIdAction(req, res);
    })
}


module.exports = router
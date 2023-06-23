module.exports = function makeGetEmployeeByCompanyNameAction({
    getEmployeeByCompanyName,
    Joi,
})
{
    return async function getEmployeeByCompanyNameAction(req, res)
    {
        try {

            let companyName = req.params.companyName;
            let employeeList = await getEmployeeByCompanyName({ companyName });

            res.status(200).send(employeeList);
        }
        catch(error) {
            res.status(error.httpstatusCode).send(error.message);
        }
    }
}
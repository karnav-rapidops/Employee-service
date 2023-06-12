module.exports = function makeUpdateEmployeeDesignation({
    updateEmployeeDesignationDb,
    validationError,
    Joi,
})
{
    return async function updateEmployeeDesignation({ empid, designation })
    {   

        console.log("\nUPDATE-EMPLOYEE-DESIGNATION-USECASE")
        console.log("empid: ", empid);
        console.log("designation: ", designation);

        const {error} = validateUpdateEmployeeDesignation({ empid, designation })

        if(error)
        {
            console.log(error.message);
            throw new validationError(error.message);
            
        }

        let updatedEmpId = await updateEmployeeDesignationDb({ empid, designation });
        return updatedEmpId;
    }
    function validateUpdateEmployeeDesignation({ empid, designation } )
    {
        const schema = Joi.object({
            empid: Joi.string().required(),
            designation: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ empid, designation })
    }
}
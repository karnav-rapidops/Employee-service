module.exports = function makeGetAllSessions({
    getAllSessionsDb,
    validationError,
    Joi,
})

{
    return async function getAllSessions({ id, columnToSort, sortingOrder })
    {
        validateInput({ id, columnToSort, sortingOrder })
        
        let sessionsList = await getAllSessionsDb({ id, columnToSort, sortingOrder });
        
        return sessionsList;
    }   

    function validateInput({ id, columnToSort, sortingOrder })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
            columnToSort: Joi.string().required(),
            sortingOrder: Joi.string().required(),
        })
        const { error } = schema.validate({ id, columnToSort, sortingOrder });
        if(error) {
            console.log(error.message);
            throw new validationError(error.message)
        }

    }
}
module.exports = function makeSearchSessions({
    searchSessionsDb,   
    validationError,
    Joi,
})
{
    return async function searchSessions({ searchField, searchValue, id, sortingOrder })
    {
        validateInput({ searchField, searchValue, id, sortingOrder });
        return await searchSessionsDb({ searchField, searchValue, id, sortingOrder });
    }   

    function validateInput({ searchField, searchValue, id, sortingOrder })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
            searchField: Joi.string().required(),
            searchValue: Joi.string().required(),
            sortingOrder: Joi.string().required(),
        })

        const { error } = schema.validate({ searchField, searchValue, id, sortingOrder })

        if(error) {
            throw new validationError(error.message);
        }
    }
}
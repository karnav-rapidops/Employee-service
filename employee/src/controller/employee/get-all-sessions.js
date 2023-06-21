module.exports = function makeGetAllSessionsAction({
    getAllSessions,
    Joi,
})
{
    return async function getAllSessionsAction(req, res)
    {
        try {
            let id = req.params.id;
            let columnToSort = req.body.columnToSort;
            let sortingOrder = req.body.sortingOrder;

            validateInput({ id, columnToSort, sortingOrder })

            let sessionsList = await getAllSessions({ id, columnToSort, sortingOrder });

            res.send(sessionsList);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateInput({ id, columnToSort, sortingOrder })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
            columnToSort: Joi.string().required(),
            sortingOrder: Joi.string().required(),
        })
        const {error} = schema.validate({ id, columnToSort, sortingOrder })
        if(error)
            return res.status(400).send({"validation error": error.details[0].message})    }
}
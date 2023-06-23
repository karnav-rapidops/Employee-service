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

            res.status(200).send(sessionsList);
        }
        catch(error) {
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}
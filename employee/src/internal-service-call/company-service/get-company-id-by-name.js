module.exports = function makeGetCompanyIdByName({
    objectNotFound,
    axios,
    Joi,
})
{
    return async function getCompanyIdByName({ name })
    {
        let companyId;

        const axiosRes = await axios.get(`http://localhost:3000/company/byname/${name}`);

        if(!axiosRes.data.length)
        {
            throw new objectNotFound(`company with name ${name} does not exist!`)
        }
        else
        {
            companyId = axiosRes.data;
        }
        return companyId;
    }           
}
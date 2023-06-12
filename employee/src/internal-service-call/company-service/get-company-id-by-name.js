module.exports = function makeGetCompanyIdByName({
    objectNotFound,
    axios,
    Joi,
})
{
    return async function getCompanyIdByName({ cname })
    {
        let companyid;

        const axiosRes = await axios.get(`http://localhost:3000/company/byname/${cname}`);

        console.log("Axios Result: ", axiosRes.data);

        if(!axiosRes.data.length)
        {
            throw new objectNotFound(`company with name ${cname} does not exist!`)
        }
        else
        {
            companyid = axiosRes.data[0].cid;
        }
        return companyid;
    }           
}
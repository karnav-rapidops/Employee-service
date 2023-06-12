module.exports = function makeGetEmployeeLocation({
    ipinfo,
})
{
    return async function getEmployeeLocation({ clientIp })
    {    
        try {
          const data = await getIPInfo(clientIp);
          return data;
        } 
        catch (err) {
          console.error(err);
        }   
    }
    function getIPInfo(ip) {
        return new Promise((resolve, reject) => {
          ipinfo(ip, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
    }
}
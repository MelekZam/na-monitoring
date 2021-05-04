import { zabbixURL }  from './Config'
const GetProblems1 = async (token, host, recent) => {
    const url = new URL(zabbixURL)
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json-rpc'
        },
        body: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            "jsonrpc": "2.0",
            "method": "problem.get",
            "params": {
                "output":["name","severity","acknowledged","clock","eventid","acknowledges"],
                "hostids": [host.id],
                "recent": recent,
                "selectAcknowledges": "extend"
            },
            "auth": token,
            "id": 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        })
    })
    const response = await rawResponse.json()
    const l = response.result.length
    for (let i=0;i<l;i++)
        response.result[i].host = host
    return response.result
}

const GetProblems = async (token, hosts, recent) => {
    const problems = {
        warning: [],
        average: [],
        high: [],
        disaster: [],
        all: []
    }
    const l = hosts.length
    const promises = []
    for (var i = 0; i<l;i++){
        const host = hosts[i]
        promises.push( GetProblems1(token, host, recent) )
    }
    return Promise.all(promises)
    .then(results => {
        const l = results.length
        for (var i = 0; i<l;i++){
            results[i].forEach(item => {
                switch (item.severity){
                    case "2": problems.warning.push(item);break
                    case "3": problems.average.push(item);break;
                    case "4": problems.high.push(item);break;
                    case "5": problems.disaster.push(item);break;
                }
            });
            problems.all.push(...results[i])
        }
        if (!recent)
            return problems
        return problems.all 
    })
    .catch(e => console.log(e))
}

export default GetProblems;
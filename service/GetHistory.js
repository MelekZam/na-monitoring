import { zabbixURL }  from './Config'
const GetHistory = async (token, id,value) => {
    const url = new URL(zabbixURL)
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json-rpc'
        },
        body: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            "jsonrpc": "2.0",
            "method": "history.get",
            "params": {
                "output": ["value","clock"],
                "history": value,
                "itemids": id,
                "sortfield": "clock",
                "limit": 20
            },
            "auth": token,
            "id": 1  
                                             
        })
    })
    const response = await rawResponse.json();  
    
    return response.result
    
}
export default GetHistory;
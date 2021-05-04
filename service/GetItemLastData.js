import { zabbixURL }  from './Config'
const GetItemLastData = async (token, id,value) => {
    const url = new URL(zabbixURL)
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json-rpc'
        },
        body: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "itemids":id,
                "output": ["lastclock","lastvalue"]                
            },
            "auth": token,
            "id": 1  
                                             
        })
    })
    const response = await rawResponse.json();  
    
    return response.result
    
}
export default GetItemLastData;
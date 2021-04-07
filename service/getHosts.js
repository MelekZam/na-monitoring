import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import { zabbixURL }  from './Config'
var hostsArray={
    available : [],
    unknown:[],
    unavailable:[],
    system:[],
    network:[]

}
const getHosts = async (token) => {
    const url = new URL(zabbixURL)
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json-rpc'
        },
        body: JSON.stringify({                                                                                                                                                                                                                                                                           
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "selectInterfaces":["type"],
                "output": ["hostid","available", "name", "snmp_available","jmx_available","ipmi_available"]
                
                
            },
            "auth": token,
            "id":1,                                                                                                                                                                                                                                                       
                  })
    })
    
    const response = await rawResponse.json()
      
    
    
    
        response.result.forEach(item=>{
            let host = { name: item.name, id: item.hostid }
            if (item.interfaces[0].type == 1 ){
                hostsArray.system.push(host)
                switch (item.available){
                    case "0": hostsArray.unknown.push(host)
                    case "1": hostsArray.available.push(host)
                    case "2": hostsArray.unavailable.push(host)
                }
            } else if (item.interfaces[0].type == 2){
                hostsArray.network.push(host)
                switch (item.snmp_available){
                    case "0": hostsArray.unknown.push(host)
                    case "1": hostsArray.available.push(host)
                    case "2": hostsArray.unavailable.push(host)
                }
                
            }
            else if (item.interfaces[0].type == 3){
                hostsArray.network.push(host)
                switch (item.ipmi_available){
                    case "0": hostsArray.unknown.push(host)
                    case "1": hostsArray.available.push(host)
                    case "2": hostsArray.unavailable.push(host)
                }

            }
            else if(item.interfaces[0].type == 4){
                hostsArray.network.push(host)
                switch (item.jmx_available){
                case "0": hostsArray.unknown.push(host)
                case "1": hostsArray.available.push(host)
                case "2": hostsArray.unavailable.push(host)
            }}
        })
    
    console.log(hostsArray)
    return hostsArray
    
}


export default getHosts

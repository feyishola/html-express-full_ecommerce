const nodeFetch = require('node-fetch')

class NodeFetch{

    constructor(){}


microServiceConnection(path,method="GET",body){
        return new Promise(async(resolve,reject)=>{
            let result = await nodeFetch(path,{method:method,body:!body? null:JSON.stringify(body),headers:{'Content-Type':'application/json'}})
            let response = await result.json()
            if(!response){
                reject("err occured in connecting to other microservice")
            }{
                resolve(response)
            }
        })
        
    }
}

module.exports = new NodeFetch()
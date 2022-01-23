const fileSystem = require('fs');


function getData(dataFileName){
    if(fileSystem.existsSync('src/database/'+dataFileName)){
        const result = fileSystem.readFileSync('src/database/'+ dataFileName, 'utf8');
        if(result.length > 0){
            return JSON.parse(result);
        }else{
            return [] 
        }
    }
    else{
        return []
    }        
}

function createOrUpdateData(data, dataFileName){
    fileSystem.writeFileSync('src/database/'+dataFileName, JSON.stringify(data));
}

function getNextAvailableId(listOfObjects){
    let nextId = 0
    console.log(listOfObjects)
    for (let i = 0; i < listOfObjects.length; i++) {
        if(listOfObjects[i].id > nextId){
            nextId = listOfObjects[i].id
        }
    }
    return (nextId+1)
}


module.exports = {
    getData,
    createOrUpdateData,
    getNextAvailableId
}
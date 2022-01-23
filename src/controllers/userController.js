const DataAccess = require("../utils/functions.js")
const res = require("express/lib/response")
const Constants = require("../constants")
const dataFileName = Constants.userDataFileName

module.exports ={
    async index(req,res){
        users = DataAccess.getData(dataFileName)

        return res.status(200).send({users: users})
    },

    async indexOne(req,res){
        const { id } = req.params

        if(id == undefined){
            return res.status(200).send({message: "Especifique o Id do usuário que deseja buscar."})
        }

        const users = DataAccess.getData(dataFileName)
        console.log(users)
        const user = users.filter((item)=>item.id === Number(id))

        if(user == undefined){
            return res.status(200).send({message: "Nenhum usuário com o Id " + id+ " encontrado"})
        }

        return res.status(200).send({users: user})
    },

    async create(req, res){
        const {name, email} = req.body
        if(name == undefined){
            return res.status(400).send({message: "Informe o nome do usuário."})
        }else if(email == undefined){
            return res.status(400).send({message: "Informe o email do usuário."})
        }
        const users = DataAccess.getData(dataFileName)
        const id = Number(DataAccess.getNextAvailableId(users))
        const createNewUser = [...users, {
            id,
            name,
            email
        }]

        DataAccess.createOrUpdateData(createNewUser, dataFileName)
        return res.status(200).send({message: "Usuário salvo com sucesso!"})
    },
    async updateOne(req, res){
        const id = Number(req.params.id)

        if(id == undefined){
            res.status(400).send({message: "Especifique o Id do usuário que deseja alterar."})
        }

        const { name, email} = req.body
        const users = DataAccess.getData(dataFileName)
        const updateUsersList = users.map((item)=>{
            if(Number(item.id) === Number(id)){
                return {
                    id: id !== undefined ? id: item.id,
                    name: name !== undefined ? name : item.name,
                    email: email !== undefined ? email : item.email
                }
            }
            else{
                return{... item}
            }
        })
        DataAccess.createOrUpdateData(updateUsersList, dataFileName)
        return res.status(200).send({message: "Usuário atualizado com sucesso!"})
    },
    async deleteOne(req, res){
        const { id } = req.params
        const users = DataAccess.getData(dataFileName)
        const removeOneUserFromUsers = users.filter((item) => item.id !== Number(id))
        DataAccess.createOrUpdateData(removeOneUserFromUsers, dataFileName)
        return res.status(200).send({message: "Usuário deletado com sucesso!"});
    },
}
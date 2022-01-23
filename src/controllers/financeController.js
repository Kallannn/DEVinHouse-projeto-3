const DataAccess = require("../utils/functions.js")
const Excel = require("xlsx-populate")
const res = require("express/lib/response")
const req = require("express/lib/request")
const Constants = require("../constants")
const financeDataFileName = Constants.financeDataFileName
const userDataFileName = Constants.userDataFileName

module.exports ={
    async create(req,res){
        const { userId } = req.params
        const xlsxBuffer = req.file.buffer
        const xlsxData = await Excel.fromDataAsync(xlsxBuffer)
        const rows = xlsxData.sheet(0).usedRange().value()

        const[ firstRow ] = rows
        const keys = ["price", "typesOfExpenses", "date", "name"]
        const existAllKeys = firstRow.every((item, index)=>{
            return keys[index]===item
        })
        if(!existAllKeys || firstRow.length !== 4){
            return res.status(400).send({message: "É nescessário enviar todos os campos escritos corretamente"})
        }

        const filterRows = rows.filter((_, index) => index!==0 )

        const financeObjectList = DataAccess.getData(financeDataFileName) 
        filterRows.map((row)=>{
            const result = row.map((cell, index)=>{
                return{
                    [firstRow[index]]:cell
                }
            })
            const objectFinance = Object.assign({}, ... result)
            objectFinance.userId = Number(userId)
            objectFinance.id = DataAccess.getNextAvailableId(financeObjectList)
            console.log(objectFinance.date)
            objectFinance.date = new Date(objectFinance.date).toUTCString()
            
            financeObjectList.push(objectFinance)
        })

        DataAccess.createOrUpdateData(financeObjectList, financeDataFileName)
        return res.status(200).send({message: "Finanças salvas com sucesso!"})
    },
    async delete(req,res){
        const { userId,financeId } = req.params
        console.log("userId " + userId)
        console.log("financeId " + financeId)
        const finances = DataAccess.getData(financeDataFileName)
        const removeOneFinanceFromFinance = finances.filter((item) => {
            if(Number(item.id) !== Number(financeId) && Number(item.userId) !== userId){
                return item
            }
        })
        DataAccess.createOrUpdateData(removeOneFinanceFromFinance, financeDataFileName)
        return res.status(200).send({message: "Dados financeiros deletados com sucesso!"});
    },
    async getTotalExpenses_CurrentMonthAndYear(req,res){
        const { userId } = req.params
        const finances = DataAccess.getData(financeDataFileName)
        const userFinances = finances.filter((item) => {
            if(Number(item.userId) == Number(userId)){
                return item
            }
        })

        if(userFinances == 0){
            return res.status(200).send({message: "Usuário não possui dados financeiros registrados",})
        }
        
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        console.log("Current Month "+ currentMonth)
        console.log("Current Year "+ currentYear)
        let expensesCurrentYear = 0.00
        let expensesCurrentMonth = 0.00
        
        
        for (let i = 0; i < userFinances.length; i++) {
             let financeDate = new Date(userFinances[i].date)
             console.log(financeDate)
             console.log(financeDate.getFullYear())
             console.log(financeDate.getMonth())
             
            if(financeDate.getFullYear() == currentYear){
                expensesCurrentYear = expensesCurrentYear + Number(userFinances[i].price)
            }
            if(financeDate.getFullYear() == currentYear && financeDate.getMonth() == currentMonth){
                expensesCurrentMonth = expensesCurrentMonth + Number(userFinances[i].price)
            }
        }
        return res.status(200).send({
            message: "Dados financeiros coletados com sucesso",
            gastosDesteMes: expensesCurrentMonth,
            gastosDesteAno: expensesCurrentYear,
            despesas: userFinances
        })
    }

}
# FinanceAPI
A Node.js API where you can register users and registers their daily expenses by uploading a xlsx file and have a monthly and yearly expenses report <br /> <br />
Uma API Node.js onde você consegue registrar usuários, registrar as despesas diárias deles fazendo upload de um arquivo xlsx e obter um relatório das despesas totais mensais e anuais. <br />

## Third parties dependencies / Dependências de terceiros
express <br />
multer <br />
xlsx-populate <br />

## How to use / Como Usar
There's probably a better way to do it that I'm not aware of but this is how I've been doing it. <br />
Download the repository, open the DEVinHouse-projeto-3 folder in Visual Studio Code, open it in the Integrated Terminal and use the command 'npm start' <br /><br />
Deve ter um jeito melhor de fazer isso mas esse é o jeito que eu tenho feito. <br />
Faça o download do repositório, abra a pasta DEVinHouse-projeto-3 com Visual Studio Code. abra a apasta no console integrado e use o commando 'npm start' <br />

## endpoints
This will be a mess if I keep on translating so I'll only use english from now on <br />
Vai ficar Bagunçado de eu continuar traduzindo então será apenas inglês de agora em diante <br /><br />

### User

#### /users GET
##### Result
###### A list of all the registered users
##### Requirements 
###### None
<br /><br />

#### /user/:id GET
##### Result
###### Will return the user with the specified id
##### Requirements
###### Path
###### id : the ID of the user you want to look for (replace :id in the URL with the user id)
<br /><br />


#### /users POST
##### Result
###### Will register a new user
##### Requirements
###### Body
###### A JSON object containing the name and email of the user.
###### Body Example
###### {"name":"username", "email":"username@email.test"}
<br /><br />

#### /user/:id PATCH
##### Result
###### Will update an already registered user
##### Requirements
###### Path
###### id : the ID of the user you want to update (replace :id in the URL with the user id)
###### Body
###### A JSON object containing the name and email of the user.
###### Body Example
###### {"name":"username", "email":"username@email.test"}
<br /><br />

#### /user/:id DELETE
##### Result
###### Will delete a registered user
##### Requirements
###### Path
###### id : the ID of the user you want to delete (replace :id in the URL with the user id)
<br /><br />

### Finance

#### /user/:userId/finance GET
##### Result
###### Will return the registered financial data of the specified user
##### Requirements
###### Path
###### id : the ID of the user you want to get the financial data from (replace :id in the URL with the user id)
<br /><br />

#### /user/:userId/finance POST
##### Result
###### Will register a single or multiple expenses according to the uploaded xlsx sheet.
##### Requirements
###### Path
###### id : the ID of the user you want to register the financial data in (replace :id in the URL with the user id)
###### File
###### file: a xlsx file containg the columns:<br />
price : The price of the expense <br />
typesOfExpenses : A descriptiong of the expense <br />
date : The date of the expense <br />
name : A name to be related to the expense <br />
If one of these columns is missing in the file or the file has columns other than these, it will fail to be registered. <br />
The expense date must be written in YYYY-MM-DD format.
<br /><br />

#### /user/:userId/finance/:financeId DELETE
##### Result
###### Will delete a registered expense
##### Requirements
###### Path
###### userId : the ID of the user you want to get the financial data from (replace :userId in the URL with the user id) <br />
financeId : the ID of the expense you want to delete (replace :financeId in the URL with the user id)
<br /><br />

#### /user/:userId/finance GET
##### Result
###### Will return the total expenses of the current month, the total expenses of the curent year and the list of registered expenses
##### Requirements
###### Path
###### userId : the ID of the user you want to get the financial data from (replace :userId in the URL with the user id)
<br /><br />





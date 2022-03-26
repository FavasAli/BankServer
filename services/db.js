// this file for to give db connection details

//mongoose import
const mongoose=require('mongoose')

//to state connection string
mongoose.connect('mongodb://localhost:27017/bankApp',{ //if bankApp not defined in the mongoDb here will add the curresponding collectiona
                                                        //automatically
    useNewUrlParser:true
})

//model creation
const User = mongoose.model('User',{
    acno: Number, 
    uname: String, 
    password: String, 
    balance: Number, 
    transaction: [] 
})

//export model {MODEL here known as collection}

module.exports={
    User
}
//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import db
const db=require('./db')

// database = {
//   1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
//   1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
//   1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
// }

//register

const register = (acno, password, uname) => {
  //asynchronous

  return db.User.findOne({acno})
  .then(user=>{
    if(user)
    {
      return {
        statuCode: 422,
        status: false,
        message: "Already Exist ..PLease Login again..."
  
      }
    }
    else
    {
      const newUser= new db.User({
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        statuCode: 200,
        status: true,
        message: "Regisetrd Successfully!!!!"
  
      }
    }
  })

  
}

//login 
const login = (acno, password) => {
  //asynchronous
  return db.User.findOne({
     acno,
     password
    })
  .then(user=>{
    if(user)
    {
      currentAcno = acno
      currentUser = user.uname

      //token generation
      const token =jwt.sign({
        currentAcno:acno
      },'supersecretkey123')


      return {
        statuCode: 200,
        status: true,
        message: "Log in Successfully!!!!",
        currentAcno, currentUser,
        token
      }
    }
    else{
      return {
        statuCode: 422,
        status: false,
        message: "Invalid Account Number/Password"

      }
    }


  }
  )

}

//deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)

 //asynchronous
 return db.User.findOne({acno,password})
 .then(user=>{
   if(user)
   {
    user.balance += amount
    user.transaction.push({
      amount: amount,
      type: "CREDIT"
    })
    user.save()
    return {
      statuCode: 200,
      status: true,
      message: amt + " Successfully Deposited...Current Balance is.." + user.balance
    }

   }
   else
   {
    return {
      statuCode: 422,
      status: false,
      message: "Invalid Account Number/Password"

    }
   }
 })
}


//withdraw definition
const withdraw = (req,acno, password, amt) => {

  var currentAcno = req.currentAcno
  var amount = parseInt(amt)

  return db.User.findOne({acno,password})
  .then(user=>{
    if(user)
    {
      if(currentAcno!= acno)
      {
        return {
          statuCode: 422,
          status: false,
          message: "Operation Deniesd.!!"

        }
      }
      if(user.balance > amount)
      {
        user.balance -= amount
        user.transaction.push({
        amount: amount,
        type: "DEBIT",
        balance: user.balance
      })
      user.save()
      return {
        statuCode: 200,
        status: true,
        message: amt + " Successfully Debitted...Current Balance is.." + user.balance
      }

      }
      else
      {
        return {
          statuCode: 422,
          status: false,
          message: "Insufficient Balance..!"

        }
      }

    }
    else
    {
      return {
        statuCode: 422,
        status: false,
        message: "Invalid Account Number/Password"
  
      }
    }
  })
  // if (acno in database) {
  //   if (password == database[acno]["password"]) {
  //     if(currentAcno == acno)
  //     { 
        
  //     if (database[acno]["balance"] > amount) {
       
  //       database[acno]["balance"] -= amount
  //       database[acno]["transaction"].push({
  //         amount: amount,
  //         type: "DEBIT"
  //       })

  //       return {
  //         statuCode: 200,
  //         status: true,
  //         message: amt + " Successfully Debitted...Current Balance is.." + database[acno]["balance"]

  //       }
  //     }
  //     else {
  //       return {
  //         statuCode: 422,
  //         status: false,
  //         message: "Insufficient Balance..!"

  //       }
  //     }
        
  //     }
  //     else
  //     {
  //       return {
  //         statuCode: 422,
  //         status: false,
  //         message: "Operation Deniesd.!!"

  //       }
  //     }

  //   }
  //   else {
  //     return {
  //       statuCode: 422,
  //       status: false,
  //       message: "Incorrect Password..!"

  //     }
  //   }
  // }
  // else {
  //   return {
  //     statuCode: 422,
  //     status: false,
  //     message: "User Doesn't Exist...!!"

  //   }
  // }
}



//Transaction Definition
const getTransaction = (acno) => {
  return db.User.findOne({acno})
  .then(user=>{
    if(user)
    {
      return {
        statuCode: 200,
        status: true,
        balance: user.balance,
        transaction: user.transaction
  
      }
    }
    else
    {
      return {
        statuCode: 422,
        status: false,
        message: "User Doesn't Exist...!!"
  
      }
  
    }
  })

  // if (acno in database) {
  //   return {
  //     statuCode: 200,
  //     status: true,
  //     transaction: database[acno]["transaction"]

  //   }
  // }
  // else {
  //   return {
  //     statuCode: 422,
  //     status: false,
  //     message: "User Doesn't Exist...!!"

  //   }
  // }
}


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}
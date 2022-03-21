//import jsonwebtoken
const jwt = require('jsonwebtoken')

database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
}

//register

const register = (acno, password, uname) => {
  if (acno in database) {
    return {
      statuCode: 422,
      status: false,
      message: "Already Exist ..PLease Login again..."

    }
  }
  else {
    database[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []
    }
    console.log(database);
    return {
      statuCode: 200,
      status: true,
      message: "Regisetrd Successfully!!!!"

    }
  }
}

//login 
const login = (acno, password) => {
  if (acno in database) {
    if (password == database[acno]["password"]) {
      currentAcno = acno
      currentUser = database[acno]["uname"]

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
    else {
      return {
        statuCode: 422,
        status: false,
        message: "Invalid Password"

      }
    }
  }
  else {
    return {
      statuCode: 422,
      status: false,
      message: "Invaid User"

    }
  }
}

//deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)
  if (acno in database) {
    if (password == database[acno]["password"]) {
      database[acno]["balance"] += amount
      database[acno]["transaction"].push({
        amount: amount,
        type: "CREDIT"
      })

      return {
        statuCode: 200,
        status: true,
        message: amt + " Successfully Deposited...Current Balance is.." + database[acno]["balance"]

      }

    }
    else {
      return {
        statuCode: 422,
        status: false,
        message: "Invalid Password"

      }
    }
  }
  else {
    return {
      statuCode: 422,
      status: false,
      message: "User Doesn't Exist...!!"

    }
  }
}


//withdraw definition
const withdraw = (req,acno, password, amt) => {

  var currentAcno = req.currentAcno
  var amount = parseInt(amt)
  if (acno in database) {
    if (password == database[acno]["password"]) {
      if(currentAcno == acno)
      { 
        
      if (database[acno]["balance"] > amount) {
       
        database[acno]["balance"] -= amount
        database[acno]["transaction"].push({
          amount: amount,
          type: "DEBIT"
        })

        return {
          statuCode: 200,
          status: true,
          message: amt + " Successfully Debitted...Current Balance is.." + database[acno]["balance"]

        }
      }
      else {
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
          message: "Operation Deniesd.!!"

        }
      }

    }
    else {
      return {
        statuCode: 422,
        status: false,
        message: "Incorrect Password..!"

      }
    }
  }
  else {
    return {
      statuCode: 422,
      status: false,
      message: "User Doesn't Exist...!!"

    }
  }
}

//Transaction Definition
const getTransaction = (acno) => {

  if (acno in database) {
    return {
      statuCode: 200,
      status: true,
      transaction: database[acno]["transaction"]

    }
  }
  else {
    return {
      statuCode: 422,
      status: false,
      message: "User Doesn't Exist...!!"

    }
  }
}


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}
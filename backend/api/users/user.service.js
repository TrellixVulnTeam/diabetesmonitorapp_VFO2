const mysql=require("../../database/conn").con;
module.exports={

  usernameValidation:(callBack)=>
  {
      mysql.query("select * from usersignup",(err,results)=>
      {
     
          if(err)
          {
         return callBack(err)
          } else
           return callBack(null,results)
  })},

create:(data,callBack)=>
{
   //create method definition


//query runnning after registartion validated for unique username to exist or create
   mysql.query("INSERT INTO usersignup (name,age,weight,gender,email,password,cpassword) VALUES(?,?,?,?,?,?,?)",
   [data.username,data.age, data.weight,data.gender,data.email,data.password,data.cpassword],
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
    //    res.send("Registration Successful");

    //    let createTable = `create table if not exists ${username}_table(
    //        id int primary key auto_increment,
    //        sugar_level varchar(255)not null,
    //        morning_meal varchar(255)not null,
    //        launch varchar(255)not null,
    //        dinner varchar(255)not null,
    //        exercise_time varchar(255)not null
    //    )`;
    //    mysql.query(createTable, (err, results, fields)=> {
    //        if (err) {
    //        console.log(err.message);
    //        }
    //        // res.send("User Table created successfully");
    //        })
   })
},

login:(data,callBack)=>
{
    mysql.query("select * from usersignup where email=? && password=?",[data.email,data.password],(err,results)=>
    {

        if(err)
        {
       return callBack(err)
        } else
         return callBack(null,results[0])
})},

userDetails:(data,callBack)=>
    {
        let createTable = `create table if not exists ${data.username}_table(
            id int primary key auto_increment,
            sugar_level varchar(255)not null,
            morning_meal varchar(255)not null,
            launch varchar(255)not null,
            dinner varchar(255)not null,
            exercise_time varchar(255)not null
        )`;
        mysql.query(createTable, (err, results, fields)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },

    getUsername:(email,callBack)=>
    {

        let getUser = `select name from usersignup where email=?`;
        mysql.query(getUser,[email], (err, results, fields)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },
    getUserid:(email,callBack)=>
    {
        
        let getUserid = `select id from usersignup where email=?`;
        mysql.query(getUserid,[email], (err, results)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },

    //API for providing user details to front end for displaying in widget dropdown....
    getUserdetails:(user_id,callBack)=>
    {
        
        let getDetails = `select * from usersignup where id=?`;
        mysql.query(getDetails,[user_id], (err, results)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    }
  getuser:(id,callBack)=>
  {
    let getUser = `select * from usersignup where id=?`;
    mysql.query(getUser,[id], (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }
      else
      {
        return callBack(null,results)
      }
    })
  },
  // get user by email
  getuserByemail:(email,callBack)=>
  {
    let getUser = `select * from usersignup where email=?`;
    mysql.query(getUser,[email], (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }
      else
      {
        return callBack(null,results)
      }
    })
  },
  // Update user with profile image  for image upload we use multer library
  update_user:(data,callBack)=>
  {
    let update_query = `UPDATE usersignup SET name=?, age=?, weight=?, email=?, image=? WHERE id=?`;
    mysql.query(update_query,[data.username, data.age,data.weight, data.email, data.image, data.id],
      (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }
      else
      {
        return callBack(null,results)
      }
    })
  }

}




const user = require('../model/userSchema');

//create data 
const newData = async(req,res)=>{

    const {username,phone,brand}= req.body

    try{
        const finduser =  await user.findOne({username:username})
        if(finduser){
            return res.status(400).json({message: "user already exist"})
        }
        const createuser = await user.create({username:username, phone:phone});
        
        res.status(200).json(createuser);
    }catch(err){
        console.log(err);
        res.status(400).json({message : err.message});
    };
};

module.exports = { newData }
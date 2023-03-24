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

//updateOne user
const updateoneuser = async (req, res) => {
    const {username,phone,brand}= req.body
  
    try {
      const updateuser = await user.updateOne({username:username}, {phone:phone});
  
      console.log(updateuser);
      res.status(200).json(updateuser);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };

  //updateMany user
const updatemanyuser = async (req, res) => {
    const {username,phone,brand}= req.body

    try {
      const updatemanyuser = await user.updateOne(
        { username:username },
        {$set:{ phone:phone}}
      );
  
      console.log(updatemanyuser);
      res.status(200).json({ message: "User data are Updated" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
};

//deleteOne user
const deleteoneuser = async (req, res) => {
    const {username,phone,brand}= req.body
  
    try {
      const delOne = await user.deleteOne({username:username});
      console.log(delOne);
      res.status(200).json({ message: "data deleted " });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };

//find and update
const modify = async (req, res) => {
    const { username, email, phone } = req.body;
    try {
      const modified = await user.findOneAndUpdate(
        { username:username},
        { phone: phone },
        { new: true }
      );
  
      console.log(modified);
      res.status(200).json(modified);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };

module.exports = { newData ,updateoneuser,updatemanyuser,deleteoneuser,modify}
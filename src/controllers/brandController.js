const brand = require("../model/brandSchema");
const user = require("../model/userSchema");

//create data
const newComp = async (req, res) => {
  const { username, company, brandname, origin } = req.body;
  try {
    const founduser = await user.findOne({ username: username });
    console.log("username : ", username);

    const foundbrand = await brand.findOne({ brandname: brandname });
    console.log(foundbrand);
    if (foundbrand) {
      founduser.company.push(foundbrand._id);
      const brandidExist = await user.find({ company: company });
      if (!foundbrand._id) {
        return res.status(400).json({ message: "Id already Exist" });
      }
    } else {
      const createbrand = await brand({ brandname: brandname, origin: origin });
      // founduser.company.push(foundbrand._id);
      await createbrand.save();
    }

    await founduser.save();
    res.status(200).json(founduser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};


// find by id
const useID = async(req,res)=>{
  const { _id} = req.body

  try {
    const obId = await brand.find({_id:_id}).populate({path:"cars"})
    console.log("use ObjectID and get data", obId);

    res.status(200).json(obId);
  }catch(err){
    res.status(400).json({message:err.message})
  }
}

module.exports = { newComp , useID};
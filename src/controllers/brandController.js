const brand = require("../model/brandSchema");
const user = require("../model/userSchema");

//create data
const newComp = async (req, res) => {
    const {username,company,brandname,origin} = req.body
    try{
        const founduser = await user.findOne({username:username});
        console.log("username : ",username);

        const foundbrand = await brand.findOne({brandname:brandname});
        console.log((foundbrand));
        if(foundbrand){
            founduser.company.push(foundbrand._id);
            const brandidExist = await user.find({company:company});
            if(!foundbrand._id){
                return res.status(400).json({ message: "Id already Exist"});
            }
        }else{
            const createbrand  = await brand({brandname:brandname,origin:origin});
            // founduser.company.push(foundbrand._id);
            await createbrand.save();
            };
           
            await founduser.save();
        res.status(200).json(founduser)
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    };
}
module.exports = { newComp };


// main code by sir
// code dor auto insert data through linking schema
// const newComp = async(req,res)=>{
//     const {username,company,brandname,origin} = req.body
//     try{
//         const founduser = await user.findOne({username:username});
//         console.log("founduser",founduser);
//         console.log(username);

//         const compCreate = await brand({brandname:brandname,origin:origin});
//         console.log("compCreate",compCreate);
//         console.log("id",compCreate._id);
//         console.log("reached 1");
//         await compCreate.save();

//         founduser.company.push(compCreate._id);
//         console.log("reached 2");

//         await founduser.save();
//         console.log(founduser);
//         console.log("reached 3");

//         res.status(200).json(founduser);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({message: err.message});
//     };
// };



           // second code 
// const { username, company, brandname, origin } = req.body;
// try {
//   const founduser = await user.findOne({ username: username });
//   console.log("founduser", founduser, username);
// //finding brand
//   const findbrand = await brand.findOne({ brandname: brandname });
//   console.log(findbrand);
//   if (findbrand) {
//     const brandExist = await user.findOne({ company: company });
//     if (brandExist) {
//     }
//     founduser.company.push(findbrand._id);
//     await founduser.save();
//     res.status(200).json(findbrand)
//   }

// else{
//   const brandCreate = await brand({ brandname: brandname, origin: origin });
//   await brandCreate.save();

//   // founduser.company.push(compCreate._id);
//   await founduser.save().;
//   res.status(200).json(founduser);}
// } catch (err) {
//   console.log(err);
//   res.status(400).json({ message: err.message });
// }
// };

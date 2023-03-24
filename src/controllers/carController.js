const car = require('../model/carSchema');
const user = require('../model/userSchema');
const brand = require('../model/brandSchema');

//car and brand link
const carData = async(req,res)=>{
    const {username, brandname, cars, carname,type,price} = req.body
    try{
        const foundbrand = await brand.findOne({brandname:brandname});
        console.log("foundbrand", foundbrand);
        console.log(brandname);

        const finduser = await user.findOne({username:username});
        console.log(('finduser', finduser));
        console.log(username);

        const carCreate = await car({carname:carname,type:type,price:price});
        console.log(carCreate);
        console.log(carCreate._id);
        console.log("reached 1");
        await carCreate.save();

        foundbrand.cars.push(carCreate._id);
        console.log("reached 2");

        finduser.cars.push(carCreate._id);
        console.log("reached in user also");
        await finduser.save();
        console.log("saved car data in user");


        await foundbrand.save();
        console.log(foundbrand);
        console.log("reached 3");

        res.status(200).json(carCreate);
    }catch(err){
        res.status(400).json({message: err.message});
    };
};


//get all the detail by using only username
const getDetail = async(req,res)=>{
    // const {username,brandname} = req.body
    try{
        
        const getdetail = await user.find({})
        .populate('company')
        .populate({path: 'cars', options:{ sort: {price : -1 }, limit: 2} });
        // .populate({path: 'company'}).populate({ path: 'cars'})
        // .sort({price:1}).limit(5);

        res.status(200).json(getdetail);
    }catch(err){
        res.status(400).json({message: err.message});
    };
};

// get data using query populating three schema
const getData = async(req,res)=>{
    const {username, carname,  model, price, type} = req.query
    try {
        const gdata = await user.findOne({username:username}).populate({path: "company"}).populate({path:"cars"});
        console.log("successfully getting data");

        res.status(200).json(gdata)
    }catch(err){
        res.status(400).json({message: err.message})
    }
};


//match 
const match = async(req,res)=>{
    const {username, carname , brandname ,company ,cars} = req.body
    try{    
        const mat = await user.find({},{username:1}).populate("company","brandname" ,{_id:0}).populate({path:"cars", match:{carname:carname}})
        res.status(200).json(mat)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports ={carData, getDetail , getData, match};
// carDetail,getCar , add in module.export if needed for only add data of car
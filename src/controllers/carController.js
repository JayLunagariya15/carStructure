const car = require('../model/carSchema');
const user = require('../model/userSchema');
const brand = require('../model/brandSchema');


//create car data
// const carDetail = async(req,res)=>{
//     const {carname, model, type,price} = req.body

//     try{
//         const carData = await car.create(req.body);

//         res.status(200).json(carData);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({message: err.message});
//     };
// };


//getall car with highest price
// const getCar = async(req,res)=>{
//     const {brand, carname, model, type,price} = req.body

//     try{
//         const hPrice = await car.find({},{price:1,carname:1,_id:0}).sort({price:-1}).limit(20);

//         // const hPrice = await car.find({})
//         //                         .populate({path: 'brand', option: {sort: {'price':-1}}});

//         // .find({})
//         // .populate({path: 'Members', options: { sort: { 'created_at': -1 } } })

// console.log(hPrice, "hPrice");
//         res.status(200).json(hPrice);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({message: err.message});
//     };
// };


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
    const {username,brandname} = req.body
    try{
        
        const getdetail = await user.find({username:username},{username:1,_id:0})
        .populate('company')
        .populate({path: 'cars', options:{ sort: {price : -1 }, limit: 2} });
        // .populate({path: 'company'}).populate({ path: 'cars'})
        // .sort({price:1}).limit(5);

        res.status(200).json(getdetail);
    }catch(err){
        res.status(400).json({message: err.message});
    };
};


module.exports ={carData, getDetail};
// carDetail,getCar , add in module.export if needed for only add data of car
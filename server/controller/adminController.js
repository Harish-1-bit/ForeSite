import Property from "../model/propertiesModel.js"
import User from "../model/userModel.js"

const getAllUsers = async (req,res) => {
    const users = await User.find().select('-password')
    if(!users || users.length===0){
        res.status(404)
        throw new Error("No user Found")
    }
    console.log("object")
    res.status(200)
    .json(users)
}

const updateUser = async (req,res) => {
    const {uid} = req.params
    let updateUser

        updateUser = await User.findByIdAndUpdate(uid,{isActive:req.body.isActive},{new:true})
    
    if(req.body.role){
        updateUser = await User.findByIdAndUpdate(uid,{role:req.body.role},{new:true})
        if(!updateUser){
            res.status(400)
            throw new Error("User is not Updated")
        }
        res.status(200).json(updateUser)}
    if(!updateUser){
            res.status(400)
            throw new Error("User is not Updated")
        }
res.status(200).json(updateUser)
}

const adminController = {getAllUsers,updateUser}

export default adminController
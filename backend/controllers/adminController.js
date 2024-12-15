import asyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import generateToken from "../utils/generateToken.js";

const authAdmin = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user.isAdmin) {
        res.status(401)
        throw new Error('wrong admin address')
    }

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('invalid email or password');
    }
});


const getUsers = asyncHandler(async(req, res) => {
    try {
     const users = await User.find({ isAdmin: { $ne: true } });
     res.status(201).json({
        users: users
     });

    } catch (error) {
      console.log(error)  
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId; 
    try {
      const user = await User.findByIdAndDelete(userId); 
  
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500);
      throw new Error("Error deleting the user");
    }
  });
  
const getSingleUser = asyncHandler(async(req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({_id : userId});
    if(!user) {
      res.status(404).json({message:'User not foundA'})
    }
    res.status(201).json({
      user: user
    });
  } catch (error) {
    console.log(error)
  }
});

const editSingleUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.body._id);
  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    if(req.body.image) {
      user.image = req.body.image
    } else {
      user.image = image
    }


    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const addSingleUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body;

  const userExist = await User.findOne({email: email})

  if(userExist) {
      res.status(400);
      throw new Error('user already exists');
  }
  
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const user = await User.create({
      name,
      email,
      image,
      password
  });

  if(user) {
      generateToken(res, user._id);
      res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
      });
  } else {
      res.status(400);
      throw new Error('invalid user data');
  }

  res.status(200).json({message: 'added user successfully'})
});

const adminLogout = asyncHandler(async(req, res) => {
   res.status(200).json({message: 'Admin logouted'})
})

export {
    authAdmin,
    getUsers,
    deleteUser,
    getSingleUser,
    editSingleUser,
    addSingleUser,
    adminLogout
}
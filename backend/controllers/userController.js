import asyncHandler from "express-async-handler"
import User from '../models/userModal.js'
import generateToken from "../utils/generateToken.js";

//  auth user/set token
//  route post /api/users/auth
//  access public

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        });
    } else {
        res.status(401);
        throw new Error('invalid email or password');
    }

});

//  register user
//  route post /api/users/auth
//  access public

const registerUser = asyncHandler(async (req,res) => {

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

    res.status(200).json({message: 'Register user'})
});

//  logout user
//  route post /api/users/auth
//  access public

const logoutUser = asyncHandler(async (req,res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User Logout user'})
});

//  profile get user
//  route post /api/users/auth
//  access private

const getUserProfile = asyncHandler(async (req,res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
});

//  update user profile 
//  route post /api/users/auth
//  access private

const updateUserPrfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
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


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserPrfile
}
const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");
const jwt = require("jsonwebtoken")
const cookie = require("cookie")
const bcrypt = require("bcrypt")
const connection = require("../config/connection")

require("dotenv").config()



module.exports = {

  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({}).populate({
        path: "thoughts",
        populate: {
          path: "reactions",
          model: "Reaction"
        }
      }).populate('friends')
      if (!users) {
        return res.status(404).json({ message: 'No users in db.' })
      }
      res.status(200).json(users)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async getFriends(req, res) {
    try {
      const friends = await User.find({ _id: User.friends._id }).populate({
        path: "thoughts",
        populate: {
          path: "reactions",
          model: "Reaction"
        }
      }).populate('friends')
      if (!friends) {
        return res.status(404).json({ message: 'No friends in db.' })
      }
      res.status(200).json(friends)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },


  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: "thoughts",
        populate: {
          path: "reactions",
          model: "Reaction"
        }
      }).populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No users in db with that ID' })
      }
      res.status(200).json(user)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async createUser(req, res) {
    try {
      const data = User.create(req.body)
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }

  },

  async updateUser(req, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body })
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },


  async removeFriend(req, res) {

    try {

      const userId = req.body.currentid
      const friendId = req.body.removeid

      /** 
       * We want to overwrite user.friends with
       * user.friends.filter(f => f.id !=== friendId)
       */
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { "friends": friendId } }
      )
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async addFriend(req, res) {

    try {

      const userId = req.body.currentid
      const friendId = req.body.addid

      /** 
       * We want to overwrite user.friends with
       * user.friends.filter(f => f.id !=== friendId)
       */
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { "friends": friendId } }
      )
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },


  async deleteUser(req, res) {
    try {
      const data = await User.findOneAndRemove(
        { _id: req.params.userId })

      if (!data) {
        res.status(404).json({ message: 'No such user exists' })
      }

      const removeThought = await Thought.deleteMany({ username: req.params.userId })

      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async authenticateLogin(req, res) {
    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) return res.status(401).json({ message: "Login failed." })

    const isValid = await bcrypt.compare(req.body.password, foundUser.password)
    if (!isValid) return res.status(401).json({ message: "Login failed." })

    const { password, ...modifiedUser } = foundUser
    const token = jwt.sign({ _id: foundUser._id, email: foundUser.email }, process.env.JWT_SECRET)

    res
      .status(200)
      .set({ "auth-token": token })
      .json({ result: "success", user: modifiedUser, token: token })
  },

  async lookupUserByToken(req, res) {
    if (!req.headers || !req.headers.cookie) return res.status(401).json({ msg: "un-authorized" })

    const cookies = cookie.parse(req.headers.cookie)
    const token = cookies["auth-token"]  //cookies.authToken
    if (!token) return res.status(401).json({ msg: "un-authorized" })

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if (!isVerified) return res.status(401).json({ msg: "un-authorized" })

    const user = await User.findById(isVerified._id)
    if (!user) return res.status(401).json({ msg: "un-authorized" })

    return res.status(200).json({ result: "success", payload: user })
  },







};
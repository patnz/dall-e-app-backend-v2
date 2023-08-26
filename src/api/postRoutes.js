const express = require('express')
const cloudinary = require('cloudinary').v2
const Post = require('../mongodb/models/post')

require('dotenv').config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// BUG FIX: ROUTER.ROUTE NOT ROUTER.GET !

router.route('/').get(async (req, res) => {
  try {
    console.log('hello')
    const posts = await Post.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Fetching posts failed, please try again',
    })
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body
    const uploadOptions = {
      quality: 'eco', // Adjusted for economy!
    }
    const photoUrl = await cloudinary.uploader.upload(photo, uploadOptions)

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url.replace('image/upload/', 'image/upload/q_25/'),
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to create a post, please try again',
    })
  }
})

module.exports = router

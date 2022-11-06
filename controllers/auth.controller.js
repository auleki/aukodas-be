import User from '../models/user.model.js'

export const register = async (req, res) => {
    try {
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        res.status(201).json({ msg: 'user created', savedUser })
    } catch (error) {
        res.status(400).json({ msg: 'error while registering user', error })
    }
}

export const allUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({})
        res.status(200).json({ msg: 'fetched all users', users: foundUsers })
    } catch (error) {
        res.status(400).json({ msg: 'error while fetching users', error })
    }
}
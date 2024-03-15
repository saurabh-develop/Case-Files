import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signingup the user' })
    }


};

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });

        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}


export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}


////user profile control
export const getAllUsers = async (request, response) => {
    try {

        const users = await User.find({});
        if (!users) {
            return response.status(404).json({ msg: 'No data found' });
        }

        return response.status(200).json({ data: users });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while getting all users' });
    }
}

export const getUser = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });

        if (!user) {
            return response.status(404).json({ msg: 'User not found' });
        }

        return response.status(200).json({ data: user });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while getting user information' });
    }
}

export const followUser = async (request, response) => {
    try {
        const self = await User.findOne({ username: request.body.account });
        const user = await User.findOne({ username: request.body.user });
        
        await User.findByIdAndUpdate(self._id, { $set: { 'following': [...self.following, user] } })
        await User.findByIdAndUpdate(user._id, { $set: { 'followers': [...user.followers, self] } })

        return response.status(200).json({ msg: `you are now following ${request.body.user}` });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ msg: 'Something went wrong' });
    }
}


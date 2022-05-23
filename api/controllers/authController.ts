import { createError } from '../utils/error';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import User from '../models/User';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send('User has been created!');
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User does not exist!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong Password or username!'));

    const { username, email, _id, ...otherDetails } = user;

    const token = sign(
      { id: user._id, isAdmin: user.isAdmin },
      `${process.env.JWT_SECRET}`
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        _id,
        username,
        email,
      });
  } catch (error) {
    next(error);
  }
};

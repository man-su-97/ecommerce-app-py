import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { INewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, INewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await User.findById(_id);

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome , ${user.name}`,
      });

    if (!name || !email || !gender || !_id || !dob || !photo) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `New user , ${user.name}`,
    });
  }
);

export const getAllUser = TryCatch(async (req, res, next) => {
  const allUsers = await User.find({});

  return res.status(200).json({
    success: true,
    allUsers,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("Invalid Id", 400));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});

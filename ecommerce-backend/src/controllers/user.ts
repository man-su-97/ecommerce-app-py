import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models.js";
import { INewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, INewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { name, email, photo, gender, _id, dob } = req.body;

    if (!name || !email || !gender || !_id || !dob) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome , ${user.name}`,
    });
  } catch (error) {
    console.error("User creation failed", error);
    return res.status(500).json({
      success: false,
      message: `Failed to create user: ${error}`,
    });
  }
};

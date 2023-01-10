import { AuthorsSchema } from "../schemas/Authors.schemas.js";
import jwt from "jsonwebtoken";
import axios from "axios";
export const authController = {
  //Function
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  //LOGIN
  register: async (req, res) => {
    const emailInput = req.body.Email;
    AuthorsSchema.findOne({ Email: emailInput })
    .then((user)=>{
      if (user) {
        res.status(409).json({
          statusCode: "409",
          message: "Email address already exists!",
          success: false,
        });
      } else {
        const data = {
          Email: emailInput,
          Password: req.body.Password,
          Name: req.body.Name,
          RoleId: 1,
          Avatar: '',
        };
        const url = process.env.URL_API+'/authors'
        axios.post(url, data)
        const accessToken = authController.generateAccessToken(data);
        return res.status(200).json({
          statusCode: "200",
          message: "Create account Success",
          data: {
            accessToken: accessToken,
            user: {
              id: data?.id,
              Email: data?.Email,
              Name: data?.Name,
              Avatar: data?.Avatar,
              RoleId: data?.RoleId,
              Password: data?.Password
            },
          },
          success: true,
        });
      }
    })
  },
  loginUser: async (req, res) => {
    const passwordInput = req.body.Password;
    AuthorsSchema.findOne({ Email: req.body.Email })
      .then((user) => {
        const validPassword = user?.Password;
        if (!user || passwordInput !== validPassword) {
          return res.status(400).json({
            statusCode: "400",
            message: "Email or Password is incorrect",
            data: null,
            success: false,
          });
        } else {
          const accessToken = authController.generateAccessToken(user);
          return res.status(200).json({
            statusCode: "200",
            message: "Login Success",
            data: {
              accessToken: accessToken,
              user: {
                id: user.id,
                Email: user.Email,
                Name: user.Name,
                Avatar: user.Avatar,
                RoleId: user.RoleId,
                Password: user.Password
              },
            },
            success: true,
          });
        }
      })

  },

  //log out
  userLogout: async (req, res) => {
    res.clearCookie("accessToken");
    return res.status(200).json("logOut!")
  },


};





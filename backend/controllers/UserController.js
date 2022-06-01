import User from "../models/UserModel.js";
//new jwt
import Admins from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//try catch block untuk errorhandler
export const getUsers = async(req, res)=>{
    try {
        const response = await User.findAll();  //user dari file model   //findAll fungsi dari sequelize
        res.status(200).json(response); //parsing responnya dgn json
    } catch (error) {
        console.log(error.message);
    }
}

//method untuk buat single data
export const getUsersById = async(req, res)=>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id               //cari data berdasarkan id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//method untuk create data
export const createUser = async(req, res)=>{
    try {
        await User.create(req.body);             //ambil datanya dengan req.body
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

//method untuk update
export const updateUser = async(req, res)=>{
    try {
        await User.update(req.body,{
            where:{
                id: req.params.id   //update berdasarkan parameter id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

//method untuk update
export const deleteUser = async(req, res)=>{
    try {
        await User.destroy({    //hapus tidak membutuhkan data
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}




//new jwt
export const getAdmins = async(req, res) => {
    try {
        const admins = await Admins.findAll({
            attributes:['id', 'name', 'email']
        });
        res.json(admins)
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if ( password !== confPassword ) return res.status(400).json({msg: "Password dan confirm password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Admins.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "register berhasil"})
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const admin = await Admins.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, admin[0].password);
        if(!match) return res.status(400).json({msg: "wrong password"});
        const adminId = admin[0].id;
        const name = admin[0].name;
        const email = admin[0].email;
        const accessToken = jwt.sign({adminId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        });
        const refreshToken = jwt.sign({adminId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });
        await Admins.update({refresh_Token: refreshToken}, {
            where: {
                id: adminId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"email tidak ditemukan"});
    }
}
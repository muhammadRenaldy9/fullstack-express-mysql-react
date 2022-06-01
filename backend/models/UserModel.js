import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize; //fungsi dari sequelize

const User = db.define('users',{    //struktur table .parm1=namatable, parm2=field, parm3=opsi
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
},{
    freezeTableName:true    //opsi sequelize akan menggantikan jika nama table tidak bisa dipakai
});

export default User;

// (async()=>{
//     await db.sync()
// })();    //function, jika tidak ada tabel di database dengan asynch  //running jika file UserModel di panggil  //matikan jika sudah terbuat tablenya

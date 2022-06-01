import {Sequelize} from "sequelize";

const db = new Sequelize('crud_db','root','',{    //parm1=namadatabase, parm2=username, parm3=password, parm4=host&dialect
    host: 'localhost',
    dialect: 'mysql'
})

export default db;
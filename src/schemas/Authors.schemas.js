import mongoose from "mongoose"
import { softDeletePlugin } from "soft-delete-plugin-mongoose";


mongoose.Promise = global.Promise;

const DropSchemaUser = new mongoose.Schema({
    RoleId:{
        type:String,
        require: true,
    },
    Avatar: {
        type:String,
        require: true,
    },
    Name: {
        type:String,
        require: true,
    },
    Email: {
        type:String,
        require: true,
    },
    Password: {
        type:String,
        require: true,
    },
}, {timestamps:true});

DropSchemaUser.plugin(softDeletePlugin);
export const AuthorsSchema = mongoose.model('authors', DropSchemaUser);
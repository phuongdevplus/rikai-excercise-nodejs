import mongoose from "mongoose"
import { softDeletePlugin } from "soft-delete-plugin-mongoose";


mongoose.Promise = global.Promise;

const Articles = new mongoose.Schema({
    Title:{
        type:String,
        require: true,
    },
    Images:{
        type:String,
        require: true,
    },
    Content:{
        type:String,
        require: true,
    },
    UserId:{
        type:String,
        require: true,
    }
}, {timestamps:true});

Articles.plugin(softDeletePlugin);
export const ArticlesSchema = mongoose.model('articles', Articles);
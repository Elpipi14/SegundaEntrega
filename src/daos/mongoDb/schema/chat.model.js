import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    email: { type: String, required: true }, 
    message: { type: String, required: true }, 
});

export const ChatModel = model("Chat", chatSchema);

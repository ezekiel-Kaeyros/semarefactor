import mongoose, { Schema } from "mongoose";
import { ChatDoc } from "../../modeles/chat.model";

const chatSchema = new Schema<ChatDoc>(
    {
        is_read: { type: Boolean, default: false},
        text: { type: String, required: false},
        origin: { type: String, enum: ['bot', 'admin', 'user'], required: true },
        conversation_id: { type: Schema.Types.ObjectId, ref: "conversations", required: true },
        url: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const Chat = mongoose.models.Chat as mongoose.Model<ChatDoc> || mongoose.model<ChatDoc>('chats', chatSchema);
export default Chat;
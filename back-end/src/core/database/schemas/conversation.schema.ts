import mongoose, { Schema } from "mongoose";
import { ConversationDoc } from "../../modeles/conversation.model";

const conversationSchema = new Schema<ConversationDoc>(
    {
        phone_number: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
        chat_ids: {
            type: [{ type: Schema.Types.ObjectId, ref: 'chats' }],
            required: true,
            default: []
        },
        credential_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Cette option ajoute les champs createdAt et updatedAt
    }
);

// Créer et exporter le modèle Mongoose
const Conversation = mongoose.models.Conversation as mongoose.Model<ConversationDoc> || mongoose.model<ConversationDoc>('conversations', conversationSchema);

export default Conversation;
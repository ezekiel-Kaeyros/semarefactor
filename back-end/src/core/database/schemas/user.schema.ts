import mongoose, { Schema } from "mongoose";
import { UserDoc } from "../../modeles/user.model";

const userSchema = new Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    scenario_not_allowed: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

const User = mongoose.model<UserDoc>('users', userSchema);

export default User;
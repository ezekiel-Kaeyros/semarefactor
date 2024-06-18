import mongoose, { Schema } from "mongoose";
import { UserSemaDoc } from "../../modeles/userSema.model";
import bcrypt from "bcryptjs";

const userSemaSchema = new Schema<UserSemaDoc>(
  {
    company: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);
userSemaSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  userSemaSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
const UserSema = mongoose.model<UserSemaDoc>('usersema', userSemaSchema);

export default UserSema;
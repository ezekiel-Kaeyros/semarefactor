import mongoose, { Schema } from "mongoose";
import { CredentialsDoc } from "../../modeles/credential.model";

const credentialsSchema = new Schema<CredentialsDoc>(
    {
      company: {
        type: String,
        required: true,
      },
      phone_number_id: {
        type: String,
        required: true,
        unique: true,
      },
      verify_token: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
);

const Credentials = mongoose.model<CredentialsDoc>('credentials', credentialsSchema);
export default Credentials;
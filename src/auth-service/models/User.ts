import { Schema, model } from "mongoose";
import { authConnection } from "../db/mongoose.js";

export type UserDoc = {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true }
  },
  { timestamps: true }
);

// helpful JSON shape for APIs
UserSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  }
});

export function UserModel() {
  // bind model to the auth connection
  return authConnection().model<UserDoc>("User", UserSchema);
}

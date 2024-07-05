import mongoose, { mongo } from "mongoose";

export type medicoType = {
  _id: string;
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
  especialidad: string[];
};

const medicoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exits!"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: [6, "The password must have at least 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exits!"],
  },
  nombre: {
    type: String,
    required: [true, "Nombre is required"],
  },
  apellido:{
    type: String,
    required: [true, "Apellido is required"],
  },
  especialidad:{
    type: String,
    required: [true, "Especialidad is required"],
  }
},
{
    timestamps: true
});


const Medico = mongoose.model<medicoType & mongoose.Document>("Medico",medicoSchema);

export default Medico;

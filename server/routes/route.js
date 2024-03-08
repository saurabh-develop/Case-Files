import  express  from "express";
import {signupUser2} from "/Projects/Case-Files/server/controller/usercontol.js";
import { signupUser } from "../controller/usercontol.js";

const router = express.Router();

router.post('/signup', signupUser);

export default router;
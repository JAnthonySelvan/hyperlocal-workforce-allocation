import express from "express";
import { register } from "../controllers/auth.controller.mjs";
import { registerValidation } from "../validations/auth.validation.mjs";

const router = express.Router();

router.post("/register", registerValidation, register);

export default router;

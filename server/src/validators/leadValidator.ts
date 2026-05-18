import { body } from "express-validator";

export const leadValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("status")
    .isIn(["New", "Contacted", "Qualified", "Lost"])
    .withMessage("Invalid status"),

  body("source")
    .isIn(["Website", "Instagram", "Referral"])
    .withMessage("Invalid source"),
];
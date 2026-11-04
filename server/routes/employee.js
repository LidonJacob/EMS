import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee } from "../controllers/employeeController.js";
//creating an instance of express router
const router = express.Router();

router.get("/", authMiddleware,getEmployees);
router.post(
  "/add",
  authMiddleware,
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error) {
        console.error("Multer upload error:", error);
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      next();
    });
  },
  addEmployee,
);
router.get("/:id", authMiddleware,getEmployee);
router.put("/:id", authMiddleware,updateEmployee);
//router.delete("/:id", authMiddleware,deleteDepartment);

export default router;

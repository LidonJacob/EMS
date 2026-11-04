import multer from "multer";
import Employee from "../models/employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import Department from "../models/department.js";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(_dirname, "..", "public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    //1 check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    // 2 if no email then save user, start by encrypting password
    const hashPassword = await bcrypt.hash(password, 10);
    //3 save user details
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res.status(201).json({
      success: true,
      employee: newEmployee,
      message: "Employee added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error in add employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log("getEmployees failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch employees" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log("getEmployee failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name },
    );
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department,
        salary,
      },
    );

    if(!updatedEmployee || !updateUser) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    } 

    return res.status(200).json({
      success: true,
      employee: updatedEmployee,
      message: "Employee updated successfully",
    });

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error in update employee" });
  }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee };

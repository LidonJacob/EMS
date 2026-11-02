import Department from "../models/department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    return res.status(201).json({
      success: true,
      department: newDep,
      message: "Department added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({ _id: id });

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch department" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      },
    );
    return res.status(200).json({
      success: true,
      department: updatedDepartment,
      message: "Department updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to update department" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedep = await Department.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      deletedep,
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete department" });
  }
};
export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};

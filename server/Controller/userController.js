const UserModel = require("../Model/userModel")

exports.AddUser = async (req, res) => {
    const { name, email, phone_number } = req.body
    if (!name || !email || !phone_number) res.status(404).json({ message: "Missing data" })
    else {
        try {
            const user = await UserModel.create()
            res.status(200).json({
                message: "User aded successfully",
                data: user
            })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}


exports.GetUser = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).jsoon({ message: "Missing data" })
    try {
        const user = await UserModel.findById(id)
        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

exports.UpdateUser = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).jsoon({ message: "Missing data" })
    try {
        const updatedData = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            message: "User updated successfully",
            status: "success",
            data: updatedData
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
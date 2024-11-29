const AddressModel = require("../Model/addressModel")

exports.AddAddress = async (req, res) => {
    const { label, street, city, state, pinCode, userId } = req.body
    if (!label || !street || !city || !state || !pinCode || !userId) return res.status(404).json({
        message: "Missing Data"
    })
    try {
        const result = await AddressModel.create(req.body)
        if (result) {
            res.status(200).json({
                message: "Address added successfully",
                data: result,
                success: true
            })
        }
    }
    catch (error) {

        res.status(500).json({ mesage: error.message })
    }
}

exports.GetUserAddress = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing Data" })
    try {
        const result = await AddressModel.find({ userId: id })
        if (result) {
            res.status(200).json({
                message: "Fetch user's addresses successfully",
                data: result,
                success: true
            })
        }
    }
    catch (error) {
        res.status(500).json({ mesage: error.message })
    }
}
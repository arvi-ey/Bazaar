const categoryModel = require('../Model/categoryModel')

exports.AddCategory = async (req, res) => {
    const { categoryName, bannerImage } = req.body
    if (!categoryName || !bannerImage) res.status(404).json({
        message: "Missing data"
    })
    else {
        try {
            const category = await categoryModel.create(req.body)
            res.status(200).json({
                message: "Category added successfully",
                data: category
            })
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

exports.UpdateCategory = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing data" })
    else {
        try {
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
            res.status(200).json({
                message: "Category updated successfully",
                data: updatedCategory
            })
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

exports.GetAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find()
        res.status(200).json({
            message: "Fetch all category succefull",
            data: categories
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const ProductModel = require("../Model/productModel")

exports.AddProduct = async (req, res) => {
    const { title, description, price, category, stock, images, deliveryTime } = req.body
    if (!title || !price || !category || !stock || !images || !deliveryTime) {
        res.status(404).json({ mesage: "Missing Data" })
    }
    else {
        try {
            const Product = await ProductModel.create(req.body)
            res.status(200).json({
                message: "Product successfully added",
                status: "success",
                data: Product
            })

        }
        catch (error) {
            res.status(500).json({
                mesage: error.mesage,
                status: "Unsuccessfull"
            })
        }
    }
}

exports.UpdateProduct = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing product id" })
    else {
        try {
            const newProduct = await ProductModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
            res.status(200).json({
                message: "Product update successfull",
                status: "success",
                data: newProduct
            })
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

exports.DeleteProduct = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing data" })
    try {
        const DeletedProduct = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Product deleted successfully", data: DeletedProduct })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.GetAllProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const skip = (page - 1) * limit
    const sortquery = req.query.sort || "dsc"
    const sortOption = sortquery === "dsc" ? -1 : 1
    try {
        const Product = await ProductModel.find().sort({ price: sortOption }).skip(skip).limit(limit)
        res.status(200).json({
            message: "Fetch all product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}

exports.GetAllProductAdmin = async (req, res) => {
    try {
        const Product = await ProductModel.find().sort({ price: - 1 })
        res.status(200).json({
            message: "Fetch all product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}


exports.GetSingleProduct = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing product id" })
    try {
        const Product = await ProductModel.findById(id)
        res.status(200).json({
            message: "Fetch product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}

exports.GetAllProductByCategory = async (req, res) => {
    const { category } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    if (!category) res.status(404).json({ message: "Missing product category" })
    try {
        const Product = await ProductModel.find({ category: category }).skip(skip).limit(limit)
        res.status(200).json({
            message: "Fetch product by category successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}

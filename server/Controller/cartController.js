const CartModel = require("../Model/cartModel")

exports.AddToCart = async (req, res) => {
    const { title, description, price, category, stock, image, userId, size } = req.body
    if (!title || !description || !price || !category || !stock || !image || !userId || !size) {
        return res.status(404).json({
            message: "Missing Data"
        })
    }
    try {
        const result = await CartModel.create(req.body)
        if (result) {
            res.status(200).json({
                success: true,
                item: result,
                message: "Product added to cart"
            })
        }

    }
    catch (error) {
        return res.statu(500).json({ message: error })
    }
}


exports.RemoveFromCart = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing params data" })
    try {
        const result = await CartModel.findByIdAndDelete(id)
        if (result) {
            res.status(200).json({
                message: "Product removed from cart",
                item: result,
                success: true
            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
}


exports.UpdateCartItems = async (req, res) => {
    const { id } = req.params
    const updateData = req.body.body
    try {
        const result = await CartModel.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({
            message: "Cart upated successfully",
            success: true,
            item: result
        })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }

}
exports.GetCartItems = async (req, res) => {
    const { userId } = req.params
    if (!userId) return res.status(404).json({ message: "Missing Data" })

    try {
        const data = await CartModel.find({ userId })
        res.status(200).json({
            success: true,
            mesage: "Cart Item fetched succesfully",
            data
        })
    }
    catch (error) {
        return res.status(500).json(error)
    }
}
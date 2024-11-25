const CartModel = require("../Model/cartModel")

exports.AddToCart = async (req, res) => {
    const { title, description, price, category, stock, image, userId } = req.body
    if (!title || !description || !price || !category || !stock || !image || !userId) {
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
const BannerModel = require("../Model/bannerModel")

exports.AddBanner = async (req, res) => {
    const { image, title } = req.body
    if (!image || !title) return res.status(404).json({ message: "Missing Data" })
    try {
        const data = await BannerModel.create(req.body)
        res.status(200).json({
            message: "Banner added successfully",
            data: data
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.UpdateBanner = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing Data" })
    try {
        const updatedBanner = await BannerModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            message: "Banner Updated successfully",
            data: updatedBanner
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.DeleteBanner = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: "Missing Data" })
    try {
        const DeletedBanner = await BannerModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Banner Deleted successfully",
            data: DeletedBanner
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.GettAllBanners = async (req, res) => {
    try {
        const banners = await BannerModel.find()
        res.status(200).json({
            message: "Fetch all banners successfull",
            data: banners
        })
    }
    catch (error) {
        res.status(500).json({
            message: error
        })
    }
}
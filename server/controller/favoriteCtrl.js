const { Favorite } = require("../models");

exports.postFavorite = async (req, res, next) => {
    const { id, webformatURL, views, likes } = req.body;
    
    try {
        const newFav = await Favorite.create({
            pixabayId: id,
            imageUrl: webformatURL,
            views,
            likes
        });

        res.status(201).json({
            message: "Favorite created successfully",
            data: newFav
        });
    } catch (err) {
        console.log("🚀 ~ exports.postFavorite= ~ err:", err);
        next(err);
    }
};


exports.deleteFav = async (req, res, next) => {
    const { id } = req.params
    try {
        const favorite = await Favorite.findByPk(id)
        if (!favorite) {
            throw { name: "badRequest", message: "Data not found" }
        }

        await favorite.destroy()
        res.status(200).json({ message: "Favorite deleted successfully" })
    } catch (err) {
        console.log("🚀 ~ exports.deleteFav ~ err:", err)
        next(err)
    }
}

exports.listFav = async (req, res, next) => {
    try {
        const list = await Favorite.findAll()

        res.status(200).json({ data: list })
    } catch (err) {
        console.log("🚀 ~ exports.listFav= ~ err:", err)
        next(err)
    }
}
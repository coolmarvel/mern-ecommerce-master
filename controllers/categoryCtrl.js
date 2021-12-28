const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            // if user have role = 1 ---> admin
            // only admin can CRUD category
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "이미 존재하는 카테고리입니다." })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "카테고리가 생성되었습니다." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "카테고리가 삭제되었습니다." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "카테고리가 업데이트되었습니다." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = categoryCtrl
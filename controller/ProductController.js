const ProductSchema = require('../model/ProductSchema');

const create = (req, resp) => {
    const product = new ProductSchema({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        qtyOnHand: req.body.qtyOnHand
    });
    product.save().then(reponse=>{
        resp.status(201).json({'message':'Product Saved!'})
    }).catch(error=>{
        return resp.status(500).json(error)
    })
}

const findById = (req, resp) => {
    ProductSchema.findOne({ '_id': req.params.id }).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json({ 'data': selectedObj });
        }
        return resp.status(404).json({'message':'Product Not Found!'})
    });

}

const update = async (req, resp) => {
    const updateDate = await ProductSchema.findOneAndUpdate({ '_id': req.params.id }, {
        $set: {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            qtyOnHand: req.body.qtyOnHand
        }
    }, { new: true });
    if (updateData) {
        resp.status(200).json({ 'message': 'Updated!' })
    } else {
        return resp.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const deleteById = async (req, resp) => {
    const deleteData = await ProductSchema.findOneAndDelete({ '_id': req.params.id });

    if (deletedData) {
        resp.status(204).json({ 'message': 'Deleted!' })
    } else {
        return resp.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const findAll = (req, resp) => {
    try {
        const { searchText, page = 1, size = 10 } = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = { $search: searchText }
        }

        const skip = (pageNumber - 1) * pageSize;

        const data = ProductSchema.find(query).limit(pageSize).skip(skip);
        return resp.status(200).json(data);
    } catch (error) {
        return resp.status(500).json({ 'message': 'Internal Server Error' });
    }
}

module.exports = {
    create, findById, update, deleteById, findAll
}

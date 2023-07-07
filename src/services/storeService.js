import StoreModel from '../models/StoreModel.js';
import ApiError from '../error/apiError.js';

class StoreService {
    async getAll() {
        const storeItems = await StoreModel.find().sort({ position: 1 });
        if (!storeItems) throw ApiError.notFound("Can't find any item");

        return storeItems;
    }

    async getOne(_id) {
        const storeItem = await StoreModel.findOne({ _id });
        if (!storeItem) throw ApiError.notFound("Can't find item");

        return storeItem;
    }
}

export default new StoreService;
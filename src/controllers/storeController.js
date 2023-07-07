import storeService from "../services/storeService.js";

class StoreController {
    async getAll(req, res, next) {
        try {
            const storeData = await storeService.getAll();

            res.json(storeData);

        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const storeItem = await storeService.getOne(req.params.id);

            res.json(storeItem);

        } catch (error) {
            next(error)
        }
    }
}

export default new StoreController;
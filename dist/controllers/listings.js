import { createListing } from '../db/listings.js';
export const newListing = async (req, res) => {
    try {
        const { car, owner, price } = req.body;
        if (!car || !owner || !price) {
            return res.sendStatus(400);
        }
        const listing = await createListing(car, owner, price);
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

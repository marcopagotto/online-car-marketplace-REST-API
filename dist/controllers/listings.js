import { createListing } from '../db/listings.js';
import { getUserById, getCarOwnerByCarId } from '../db/users.js';
import { getListings } from '../db/listings.js';
export const newListing = async (req, res) => {
    try {
        const { carId, owner, price } = req.body;
        if (!carId || !owner || !price) {
            return res.sendStatus(400);
        }
        const user = await getUserById(owner.toString());
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedUser = await getCarOwnerByCarId(carId.toString());
        if (JSON.stringify(user) !== JSON.stringify(expectedUser)) {
            return res.sendStatus(401);
        }
        const car = user.cars.find((car) => car?._id?.toString() === carId.toString());
        if (!car) {
            return res.sendStatus(400);
        }
        const listing = await createListing(car, owner, price);
        console.log(listing);
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const findListings = async (req, res) => {
    try {
        const listings = await getListings();
        return res.status(200).json(listings).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

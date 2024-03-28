import { createListing, deleteListingById, getListingById as findListingById, getListingByCarId, } from '../db/listings.js';
import { getUserById, getCarOwnerByCarId } from '../db/users.js';
import { getListings } from '../db/listings.js';
export const newListing = async (req, res) => {
    try {
        const { carId, owner, price } = req.body;
        if (!carId || !owner || !price) {
            return res.sendStatus(400);
        }
        if (await getListingByCarId(carId.toString())) {
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
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const findListings = async (req, res) => {
    try {
        const { results } = req.query;
        if (!results) {
            const listings = await getListings();
            return res.status(200).json(listings).end();
        }
        const docAmount = parseInt(results);
        if (isNaN(docAmount) || docAmount < 1) {
            return res.sendStatus(400);
        }
        else {
            const listings = await getListings(docAmount);
            return res.status(200).json(listings).end();
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendStatus(400);
        }
        const listing = await findListingById(id);
        if (!listing) {
            return res.sendStatus(400);
        }
        await deleteListingById(id);
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendStatus(400);
        }
        const listing = await findListingById(id);
        if (!listing) {
            return res.sendStatus(400);
        }
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const editListingById = async (req, res) => {
    try {
        const { id: listingId } = req.params;
        if (!listingId) {
            return res.sendStatus(400);
        }
        const { carId, price } = req.body;
        if (!carId && !price) {
            return res.sendStatus(400);
        }
        if (await getListingByCarId(carId)) {
            return res.sendStatus(400);
        }
        const currentId = req.identity[0]._id.toString();
        if (!currentId) {
            return res.sendStatus(400);
        }
        if (carId) {
            const carOwner = await getCarOwnerByCarId(carId);
            if (!carOwner) {
                return res.sendStatus(400);
            }
            if (currentId !== carOwner._id.toString()) {
                return res.sendStatus(400);
            }
        }
        const car = req.identity[0].cars.find((car) => car._id.toString() === carId);
        const listing = await findListingById(listingId);
        if (!listing) {
            return res.sendStatus(400);
        }
        listing.price = price || listing.price;
        listing.car = car || listing.car;
        await listing.save();
        return res.status(200).json(listing).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

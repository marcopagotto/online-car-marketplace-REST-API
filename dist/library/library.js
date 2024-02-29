import crypto from 'crypto';
import config from '../config/config.js';
const random = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt, password) => {
    return crypto
        .createHmac(config.crypto.hashingAlgorithm, [salt, password].join('/'))
        .update(config.crypto.secretKey)
        .digest('hex');
};

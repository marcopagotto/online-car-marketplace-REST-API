import crypto from 'crypto';
import config from '../config/config.ts';
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt, password) => {
    return crypto
        .createHmac(config.crypto.hashingAlgorithm, [salt, password].join('/'))
        .update(config.crypto.secretKey)
        .digest('hex');
};

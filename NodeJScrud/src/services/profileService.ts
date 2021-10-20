/** Service Function */

import Profile from "../models/Profile";
const logger = require('../logger');

export function findQuery<T>() {
    try {
        let users: any;
        users = Profile.find();
        return users;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneUserQuery<T>(value:string) {
    try {
        let user: any;
        user = Profile.findOne({ user: value });
        return user;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findByIdAndUpdateOrCreate<T>(fieldId: string,fields:object) {
    try {
        let updateProfile: any;
        updateProfile = Profile.findByIdAndUpdate({ user: fieldId},{ $set: fields },{ new: true });
        return updateProfile;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneAndRemoveQuery<T>(fieldId: string) {
    try {
        let deleteProfile: any;
        deleteProfile = Profile.findOneAndRemove({ user: fieldId});
        return deleteProfile;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}                                                                                                                       
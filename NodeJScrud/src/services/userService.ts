/** Service Function */

import User from "../models/User";
const logger = require('../logger');

export function findByIdQuery<T>(field: string) {
    try {
        let userById: any;
        userById = User.findById( field );
        return userById;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneQuery<T>(field: string) {
    try {
        let user: any;
        user = User.findOne({ email: field });
        return user;    
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneIdQuery<T>(value:string) {
    try {
        let user: any;
        user = User.findOne({ _id: value });
        return user;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneAndRemoveUserQuery<T>(fieldId: string) {
    try {
        let deleteUser: any;
        deleteUser = User.findOneAndRemove({ _id: fieldId});
        return deleteUser; 
    } catch(err) {
        logger.error('Error in find method', err)
    }
}
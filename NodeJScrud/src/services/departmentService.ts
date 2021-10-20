/** Service Function */

import Department from "../models/Department";
const logger = require('../logger');

export function findQuery<T>() {
    try {
        let departments: any;
        departments = Department.find();
        return departments;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}   

export function findOne<T>(field: string) {
    try {
        let department: any;
        department =  Department.findOne({ field });
        return department;
    } catch(err) {
        logger.error('Error in findOne method', err)
    }
}

export function findOneQuery<T>(value: string) {
    try {
        let departmentByName: any;
        departmentByName = Department.findOne({ departmentName: value });
        return departmentByName;
    } catch(err) {
        logger.error('Error in findOne method', err)
    }
}

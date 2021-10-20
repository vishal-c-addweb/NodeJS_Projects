/** Service Function */

import Employee from "../models/Employee";
const logger = require('../logger');

export function findQuery<T>() {
    try {
        let students: any;
        students = Employee.find();
        return students;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}  

export function findOneQuery<T>(field: number) {
    try {
        let student: any;
        student =  Employee.findOne({ employeeId: field });
        return student;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneIdQuery<T>(value:string) {
    try {
        let studentById: any;
        studentById = Employee.findOne({ _id: value });
        return studentById;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findByIdAndUpdateQuery<T>(fieldId: string,fields:object) {
    try {
        let updateStudent: any;
        updateStudent = Employee.findByIdAndUpdate(fieldId,fields);
        return updateStudent;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findInQuery<T>(field:string[]) {
    try {
        let studentByMultpleId: any;
        studentByMultpleId = Employee.find({ '_id': {$in: field}});
        return studentByMultpleId;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function findOneAndRemoveQuery<T>(fieldId: string) {
    try {
        let deleteStudent: any;
        deleteStudent = Employee.findOneAndRemove({ _id: fieldId});
        return deleteStudent;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function searchQuery<T>(field: string) {
    try {
        let searchStudent: any;
        searchStudent = Employee.find({ $text :{ $search: field }});
        return searchStudent;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}

export function paginationQuery<T>(skip: number,limit: number) {
    try {
        let pagination: any;
        pagination = Employee.find().skip(skip).limit(limit);
        return pagination;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}


export function searchAndPaginationQuery<T>(field: string,skip: number,limit: number) {
    try {
        let searchPagination: any;
        searchPagination = Employee.aggregate([{$match:{$text :{ $search:field }}},{$skip:skip},{$limit:limit}]);
        return searchPagination;
    } catch(err) {
        logger.error('Error in find method', err)
    }
}
//export service Query function

export function findQuery<T>(modelName: any) {
    return modelName.find();
}

export function findOneQuery<T>(modelName: any,field: String) {
    return modelName.findOne({ field });
}


export function findOneUserQuery<T>(modelName: any,value:String) {
    return modelName.findOne({ user: value });
}

export function findOneIdQuery<T>(modelName: any,value:String) {
    return modelName.findOne({ _id: value });
}

export function findByIdQuery<T>(modelName: any,field: String) {
    return modelName.findById( field );
}

export function findInQuery<T>(modelName: any,field:string[]) {
    return modelName.find({ '_id': {$in: field}});
}

export function findByIdAndUpdateQuery<T>(modelName: any,fieldId: String,fields:Object) {
    return modelName.findByIdAndUpdate(fieldId,fields);
}

export function findByIdAndUpdateOrCreate<T>(modelName: any,fieldId: String,fields:Object) {
    return modelName.findByIdAndUpdate({ user: fieldId},{ $set: fields },{ new: true });
}

export function findOneAndRemoveQuery<T>(modelName: any,fieldId: String) {
    return modelName.findOneAndRemove({ _id: fieldId});
}

export function findOneAndRemoveUserQuery<T>(modelName: any,fieldId: String) {
    return modelName.findOneAndRemove({ user: fieldId});
}

export function searchQuery<T>(modelName: any,field: String) {
    return modelName.find({ $text :{ $search: field }});
}

export function paginationQuery<T>(modelName: any,skip: Number,limit: Number) {
    return modelName.find().skip(skip).limit(limit);
}

export function searchAndPaginationQuery<T>(modelName: any,field: String,skip: Number,limit: Number) {
    return modelName.aggregate([{$match:{$text :{ $search:field }}},{$skip:skip},{$limit:limit}]);
}
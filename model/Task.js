var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var TasksSchema = new Schema({
 user: String,
 task: String,
 updatedAt: { type: Date, default: Date.now },
 createdAt: { type: Date, default: Date.now },
 dueDate: { type: Date },
 isCompleted: Boolean
});
//export our module to use in server.js
module.exports = mongoose.model('Task', TasksSchema);

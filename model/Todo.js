var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var TodoSchema = new Schema({
 user: String,
 updatedAt: { type: Date, default: Date.now },
 createdAt: { type: Date, default: Date.now },
 dueDate: { type: Date , unique : true},
 totalItems: { type: Number, default: 0 },
 completedItems: { type: Number, default: 0 }
});
//export our module to use in server.js
module.exports = mongoose.model('Todo', TodoSchema);

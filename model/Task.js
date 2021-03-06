var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var TasksSchema = new Schema({ 
 task: String,
 updatedAt: { type: Date, default: Date.now },
 createdAt: { type: Date, default: Date.now },
 isCompleted: Boolean,
 _todoId: Schema.Types.ObjectId
});
//export our module to use in server.js
module.exports = mongoose.model('Task', TasksSchema);

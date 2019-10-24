const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SubjectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
      type: String,
      trim: true
    }
});
    
SubjectSchema.plugin(mongoosePaginate);

var Subject = mongoose.model('Subject', SubjectSchema);

console.log("Prueba previa");
Subject.create({id: 0, name: 'Análisis'}, function(err, doc) {
    console.log("Prueba");
});

module.exports = mongoose.model('Subject', SubjectSchema);
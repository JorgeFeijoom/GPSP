const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SubjectSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
        type: String
    },
    titulacion: {
        type: String,
        default: 'Grado en Ingeniería Informática'
    }, 
    especialidad: {
        type: String,
        default: 'Sin especificar',
        enum: ['Sin especificar', 'Ingeniería del Software', 'Ingeniería de Computadores', 'Computación', 'Sistemas de Información', 'Tecnologías de la Información']
    }, 
    centro: {
        type: String,
        default: 'Escuela de Ingeniería Informática'
    }, 
    departamento: {
        type: String,
        default: 'Informática y sistemas'
    },
    tipo: {
        type: String,
        default: 'Obligatoria',
        enum: ['Obligatoria', 'Optativa', 'Básica de Rama']
    }, 
    caracter: {
        type: String,
        default: 'Normal'
    },
    duracion: {
        type: String,
        enum: ['Primer semestre', 'Segundo semestre', 'Anual']
    },
    creditos: {
        type: Number,
        required: true,
        min: 1
    },
    curso: {
        type: Number,
        required: true
    },
    proyectoDocente: {
        type: String
    },
    updated: { 
        type: Date, 
        default: Date.now 
    },
});
    
SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subject', SubjectSchema);
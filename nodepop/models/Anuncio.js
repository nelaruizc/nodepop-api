

'use strict';

const mongoose = require('mongoose');

// se define el esquema de los anuncios
const anuncioSchema = mongoose.Schema ({
    nombre: {type: String, required: true},
    venta: {type: Boolean, required: true},
    precio: {type: Number, required: true},
    foto: {type: String, required: true},
    tags: {type: [String],required: true}
});

anuncioSchema.statics.lista = function(filtro, skip, limit, campos, sort) {
  const query = Agente.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(campos);
  query.sort(sort);
  return query.exec()
}

// se crea el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// se exporta el modelo
module.exports = Anuncio;
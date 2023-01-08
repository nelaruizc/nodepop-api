'use strict';

const express = require('express');
const createError = require('http-errors');
const Anuncio = require('../../models/Anuncio');
const router = express.Router();

// CRUD

// Devuelve una lista de agentes
router.get('/', async (req, res, next) => {
  try {

    // filtros
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    // selección de campos
    const fields = req.query.fields; 
    // ordenación
    const sort = req.query.sort; 

    const filtro = {};

    if (nombre) { 
      filtro.nombre = nombre;
    }

    if (venta) { 
      filtro.venta = venta;
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
    res.json({ results: anuncios });
  } catch(err) {
    next(err);
  }
});

// Devuelve un agente
router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    // buscar un agente en la BD
    const anuncio = await Anuncio.findById(id);

    res.json({ result: anuncio });

  } catch (err) {
    next(err);
  }
});

// Actualizar un agente
router.put('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    const anuncioData = req.body;

    const anuncioActualizado = await Agente.findOneAndUpdate({ _id: id}, anuncioData, {
      new: true 
    });

    res.json({ result: anuncioActualizado });

  } catch (err) {
    next(err);
  }
});

// Crear un agente
router.post('/', async (req, res, next) => {
  try {

    const anuncioData = req.body;

    // instanciar un nuevo agente en memoria
    const anuncio = new Anuncio(anuncioData);

    // lo guardo en la base de datos
    const anuncioGuardado = await anuncio.save();

    res.json({ result: anuncioGuardado });

  } catch (err) {
    next(err);
  }
});

// Eliminar un agente
router.delete('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);

    if (!anuncio) {
      // const err = new Error('not found');
      // err.status = 404;
      return next(createError(404));
    }

    await Anuncio.deleteOne({ _id: id });

    res.json();

  } catch (err) {
    next(err);
  }
});

module.exports = router;
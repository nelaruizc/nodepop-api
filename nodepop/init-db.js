// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const Anuncio = require('./models/Anuncio');

async function main() {

  // preguntar al usuario si está seguro
  const continuar = await preguntaSiNo('¿Estás seguro que quieres borrar la base de datos? [n]')
  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializar la colección de agentes
  await initAnuncios();

  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncios() {
  // borrar todos los documentos de la colección de agentes
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crear agentes iniciales
  const nuevoAnuncio = require('./anuncios.json');
  const inserted = await Anuncio.insertMany(nuevoAnuncio.anuncios);
  console.log(`Creados ${inserted.length} anuncios.`)
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(texto, respuesta => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}
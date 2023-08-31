const { writeFileSync, mkdirSync } = require('fs');

// Para poder hacer esto es necesario tener el archivo .env creado y con su key
require('dotenv').config();

// Ahora creamos el archivo con la variable de entorno que tenemos en el archivo .env
const targetPath = './src/environments/environment.ts'; // con esta linea definimos donde vamos a crear el archivo

const envFileContent = `
export const environment = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }",
  otra: "PROPIEDAD",
};
`;

//Creamos el directorio si no existe
mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );

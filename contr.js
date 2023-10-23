/* const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal (10 es un valor común)

// Función para hashear una contraseña
async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
}

// Función para verificar una contraseña con su hash
async function comparePassword(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error al comparar las contraseñas');
  }
}

// Ejemplo de uso
async function main() {
  const plainPassword = 'contraseña123'; // Contraseña sin hashear

  // Hashear la contraseña
  const hashedPassword = await hashPassword(plainPassword);
  console.log('Contraseña hasheada:', hashedPassword);

  // Verificar la contraseña
  const isMatch = await comparePassword(plainPassword, hashedPassword);
  console.log('La contraseña coincide:', isMatch); // Debería ser true

  // Intentar verificar con una contraseña incorrecta
  const wrongPassword = 'contraseñaIncorrecta';
  const isWrongMatch = await comparePassword(wrongPassword, hashedPassword);
  console.log('La contraseña incorrecta coincide:', isWrongMatch); // Debería ser false
}

main();
 */
/* const md5 = require('md5');

// Simulación de una base de datos con usuarios y contraseñas hasheadas
const usersDatabase = [
  { username: 'usuario1', passwordHash: md5('contraseña1') },
  { username: 'usuario2', passwordHash: md5('contraseña2') },
  // Agrega más usuarios y contraseñas hasheadas según sea necesario
];

// Función para verificar la contraseña proporcionada por el usuario
function verifyPassword(username, providedPassword) {
  const user = usersDatabase.find((user) => user.username === username);

  if (!user) {
    return 'El usuario no existe';
  }

  const providedPasswordHash = md5(providedPassword);

  if (providedPasswordHash === user.passwordHash) {
    return 'Contraseña correcta';
  } else {
    return 'Contraseña incorrecta';
  }
}

// Prueba de verificación de contraseña
const username = 'usuario1';
const passwordToCheck = 'contraseña1';

const result = verifyPassword(username, passwordToCheck);
console.log(result); */

/* const readline = require('readline');
const md5 = require('md5');

// Simulación de una base de datos con usuarios y contraseñas hasheadas
const usersDatabase = [
  { username: 'usuario1', passwordHash: md5('708090') },
  { username: 'usuario2', passwordHash: md5('708090') },
  // Agrega más usuarios y contraseñas hasheadas según sea necesario
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function verifyPassword(username, providedPassword) {
  const user = usersDatabase.find((user) => user.username === username);

  if (!user) {
    return 'El usuario no existe';
  }

  const providedPasswordHash = md5(providedPassword);

  console.log('Hash de la contraseña proporcionada:', providedPasswordHash);

  if (providedPasswordHash === user.passwordHash) {
    return 'Contraseña correcta';
  } else {
    return 'Contraseña incorrecta';
  }
}

function getUserInput() {
  rl.question('Ingresa el nombre de usuario: ', (username) => {
    rl.question('Ingresa la contraseña: ', (password) => {
      const result = verifyPassword(username, password);
      console.log(result);
      rl.close();
    });
  });
}

getUserInput(); */
/* function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// Ejemplo de uso
const todayDate = getTodayDate();
console.log(todayDate); // 20231017 */
/* function obtenerIniciales(nombreCompleto) {
  const palabras = nombreCompleto.split(' '); // Dividir el nombre en palabras
  let iniciales = '';

  // Recorrer cada palabra y obtener la inicial en mayúsculas
  for (const palabra of palabras) {
    iniciales += palabra[0].toUpperCase();
  }

  return iniciales;
}

const nombreCompleto = 'i';
const iniciales = obtenerIniciales(nombreCompleto);
console.log(iniciales); // Debería imprimir 'IACC' */

/* const crypto = require('crypto');

// Datos que deseas encriptar
const data = '708090';

// Crear un objeto hash con el algoritmo SHA-256
const sha256Hash = crypto.createHash('sha256');

// Actualizar el hash con los datos que deseas encriptar
sha256Hash.update(data);

// Calcular el hash en formato hexadecimal
const hashedData = sha256Hash.digest('hex');

console.log('Texto original:', data);
console.log('Texto encriptado (SHA-256):', hashedData); */
const crypto = require('crypto');

// Datos que deseas encriptar
const data = '708090';
const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

// Crear un objeto hash con el algoritmo SHA-256
const sha256Hash = crypto.createHmac('sha256', secretKey);

// Actualizar el hash con los datos que deseas encriptar
sha256Hash.update(data);

// Calcular el hash en formato hexadecimal
const hashedData = sha256Hash.digest('hex');

console.log('Texto original:', data);
console.log('Clave secreta:', secretKey);
console.log('Texto encriptado (SHA-256):', hashedData);


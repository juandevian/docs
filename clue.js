/**
 * Diseñaremos un juego de adivinanzas
 * sencillo en el que el usuario tenga que
 * adivinar una palabra secreta basada en
 * pistas progresivas y estará desarrollado
 * en Javascript, toda la interacción de
 * entradas y salidas serán por consola
 */

/**
 * The above JavaScript code implements a word guessing game where the player has to guess a secret
 * word by inputting letters or attempting to guess the whole word within a limited number of attempts.
 * @returns The `jugar()` function is being called at the end of the script, which initiates the game
 * of guessing the secret word. The function `jugar()` contains the game logic where the user interacts
 * with the program to guess letters or the entire word. The function will continue running until the
 * user either guesses the word correctly, runs out of attempts, or chooses to guess the entire word
 * and either
 */
const readlineSync = require('readline-sync');

// Creamos una función para elegir la palabra secreta
function elegirPalabraSecreta() {
    // Array con las palabras secretas
    var palabras = ["javascript", "programacion", "tecnologia", "desarrollo", "php"];
    // Elegimos una palabra aleatoria
    var indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

// Creamos una función para mostrar las pistas
function mostrarPistas(palabraUsuario) {
    // Se une el arreglo con espacios para una mejor visualización
    console.log(palabraUsuario.join(' '));
}

// Creamos una función para jugar
function jugar() {
    var palabraSecreta = elegirPalabraSecreta();
    // Inicializamos palabraUsuario con guiones bajos para cada letra
    var palabraUsuario = [];
    for (var i = 0; i < palabraSecreta.length; i++) {
        palabraUsuario.push('_');
    }
    
    // Definimos el número de intentos: mínimo 5 o la longitud de la palabra, lo que sea mayor
    var maxIntentos = Math.max(5, palabraSecreta.length);
    var intentos = 0;
    
    console.log("Bienvenido al juego de adivinanzas.");
    console.log("Tienes " + maxIntentos + " intentos para adivinar la palabra secreta.\n");
    
    while (intentos < maxIntentos) {
        console.log("Intento " + (intentos + 1) + " de " + maxIntentos + ":");
        mostrarPistas(palabraUsuario);
        // Pedimos una letra al usuario y la convertimos a minúsculas
        var letra = readlineSync.question("Introduce una letra: ").toLowerCase();
        
        // Verificamos si la letra está en la palabra secreta
        if (palabraSecreta.includes(letra)) {
            console.log("¡Bien! La letra '" + letra + "' está en la palabra.\n");
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraUsuario[i] = letra;
                }
            }
        } else {
            console.log("Lo siento, la letra '" + letra + "' no se encuentra en la palabra.\n");
        }
        
        // Mostramos cómo quedó la palabra después de la actualización
        mostrarPistas(palabraUsuario);
        
        // Verificamos si ya se adivinó la palabra
        if (palabraUsuario.join('') === palabraSecreta) {
            console.log("¡Felicidades! Has adivinado la palabra: " + palabraSecreta);
            return;
        }
        
        // Solo preguntar si se han adivinado al menos 3 letras correctamente
        var letrasAdivinadas = palabraUsuario.filter(function(c) {
            return c !== '_';
        }).length;
        
        if (letrasAdivinadas >= 3) {
            var opcion = readlineSync.question("¿Quieres intentar adivinar la palabra completa? (s/n): ");
            if (opcion.toLowerCase() === 's') {
                // Se convierte la respuesta a minúsculas
                var intentoPalabra = readlineSync.question("Escribe tu palabra: ").toLowerCase();
                if (intentoPalabra === palabraSecreta) {
                    console.log("¡Felicidades! Has adivinado la palabra secreta: " + palabraSecreta);
                    return;
                } else {
                    console.log("La palabra '" + intentoPalabra + "' es incorrecta.\n");
                }
            }
        }
        
        intentos++;
    }
    console.log("Has agotado tus intentos. La palabra secreta era: " + palabraSecreta);
}

jugar();

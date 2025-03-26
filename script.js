// Variables globales.
let procesos = []; // Lista de procesos creados.
let colaList = []; // Cola de procesos listos para ejecutarse.
let finalizados = []; // Lista de procesos que ya han finalizado.
let procesoActual = null; // Proceso que se está ejecutando actualmente.
let simulacionActiva = false; // Indica si la simulación está activa.
let timerAging = null; // Temporizador para aplicar aging.
let timerProceso = null; // Temporizador para la ejecución de un proceso.

// Esta función genera códigos de colores aleatorios.
// Retorna un string con un color en formato hexadecimal.
function colorAleatorio() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // El método Math.floor() redondea el número hacia abajo al entero más cercano.
  // El método Math.random() devuelve un número aleatorio entre 0 y 1.
  // El número 16777215 es el número más grande que se puede representar con 6 dígitos hexadecimales.
  // El método toString(16) convierte el número a hexadecimal.
}

// Esta función genera un proceso con sus parámetros.
// Retorna un objeto con los atributos id, nombre, rafaga, tiempoRestante, tiempoEspera y color.
function crearProceso(id, rafaga) {
  return {
    id: id, // Identificador único del proceso.
    nombre: `P${id.toString().padStart(2, "0")}`,
    // padStart(2, "0"): Asegura que la cadena tenga al menos 2 caracteres.
    // Si tiene menos, añade ceros a la izquierda. Por ejemplo, si id es 1, se convierte en "01".
    rafaga: rafaga, // Tiempo total de ráfaga del proceso.
    tiempoRestante: rafaga, // Tiempo restante para completar la ejecución.
    tiempoEspera: 0, // Tiempo acumulado en espera (para aplicar aging).
    color: colorAleatorio(), // Color aleatorio asignado al proceso.
  };
}

// Función para actualizar la lista de procesos entrantes.
// Actualiza dinámicamente el contenido del elemento HTML con id "lista".
function actualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; // Limpia el contenido actual de la lista.
  colaList.forEach((proc) => {
    const li = document.createElement("li"); // Crea un nuevo elemento <li>.
    li.textContent = `${proc.nombre} - ${proc.tiempoRestante}ms`;
    // Muestra el nombre del proceso y su tiempo restante.
    li.className = "proceso"; // Asigna la clase CSS "proceso".
    li.style.backgroundColor = proc.color; // Aplica el color del proceso como fondo.
    lista.appendChild(li); // Añade el elemento <li> a la lista.
  });
}

// Función para actualizar la lista de finalizados.
// Actualiza dinámicamente el contenido del elemento HTML con id "finalizados".
function actualizarFinalizados() {
  const lista = document.getElementById("finalizados");
  lista.innerHTML = ""; // Limpia el contenido actual de la lista.
  finalizados.forEach((proc) => {
    const li = document.createElement("li"); // Crea un nuevo elemento <li>.
    li.textContent = `${proc.nombre} (Ráfaga: ${proc.rafaga}ms)`;
    // Muestra el nombre del proceso y su tiempo de ráfaga.
    li.className = "proceso"; // Asigna la clase CSS "proceso".
    li.style.backgroundColor = proc.color; // Aplica el color del proceso como fondo.
    lista.appendChild(li); // Añade el elemento <li> a la lista.
  });
}

// Actualizar el panel de proceso en ejecución.
// Actualiza dinámicamente el contenido del elemento HTML con id "nombreProceso" y "barraProgreso".
function actualizarEjecucion(nombre, porcentaje) {
  document.getElementById("nombreProceso").textContent = nombre; // Muestra el nombre del proceso en ejecución.
  const barra = document.getElementById("barraProgreso");
  barra.style.width = porcentaje + "%"; // Actualiza el ancho de la barra de progreso.
  barra.textContent = porcentaje + "%"; // Muestra el porcentaje de progreso.
}

// Seleccionar el siguiente proceso según SJF (con o sin aging).
// Retorna el proceso con el menor tiempo de ráfaga (o tiempo efectivo si aging está activo).
function seleccionarProceso() {
  if (colaList.length === 0) return null; // Si no hay procesos en la cola, retorna null.
  // Si aging está activo, se incrementa el tiempo de espera y se ajusta la prioridad.
  let listaTemporal = colaList.map((proc) => {
    let valorEfectivo = proc.tiempoRestante;
    if (document.getElementById("aging").checked) {
      // Reducimos el tiempo efectivo en función del tiempo de espera acumulado (ejemplo: 1ms cada 50ms esperando).
      valorEfectivo = Math.max(
        proc.tiempoRestante - Math.floor(proc.tiempoEspera / 50),
        1
      );
    }
    return { proc, valorEfectivo };
  });
  // Ordenamos de menor a mayor valorEfectivo.
  listaTemporal.sort((a, b) => a.valorEfectivo - b.valorEfectivo);
  return listaTemporal[0].proc;
  /* Retorna el proceso con el menor valorEfectivo.
  proc: el objeto proceso.
valorEfectivo: un valor numérico que representa el tiempo de ráfaga restante, ajustado en caso de que se active el aging (o, de forma predeterminada, es simplemente el tiempo de ráfaga).
La función .sort() organiza los elementos del arreglo en un orden específico. En este caso, la función de comparación es una funcion flecha.
Si a.valorEfectivo es menor que b.valorEfectivo, la resta dará un número negativo y a se ubicará antes que b.
Si a.valorEfectivo es mayor, el resultado será positivo y a se ubicará después de b.
Si ambos son iguales, la función retorna 0, dejando el orden de esos dos elementos sin cambios.
El resultado es que el arreglo queda ordenado en orden ascendente, es decir, el proceso con el menor valor de valorEfectivo (que corresponde al menor tiempo de ejecución restante o ajustado) quedará en la primera posición del arreglo.
  */
}

// Ejecutar el proceso actual y actualizar la barra de progreso.
// Actualiza dinámicamente el contenido del elemento HTML con id "nombreProceso" y "barraProgreso".
function ejecutarProceso(proceso) {
  procesoActual = proceso; // Asigna el proceso actual.
  actualizarEjecucion(proceso.nombre, 0); // Inicializa la barra de progreso.
  const inicio = Date.now(); // Registra el tiempo de inicio.
  const rafaga = proceso.tiempoRestante; // Tiempo de ráfaga del proceso.
  timerProceso = setInterval(() => {
    const transcurrido = Date.now() - inicio; // Calcula el tiempo transcurrido.
    let porcentaje = Math.min(Math.floor((transcurrido / rafaga) * 100), 100); // Calcula el porcentaje de progreso.
    actualizarEjecucion(proceso.nombre, porcentaje); // Actualiza la barra de progreso.
    if (transcurrido >= rafaga) {
      clearInterval(timerProceso); // Detiene el temporizador.
      // Al finalizar, removemos de cola y agregamos a finalizados.
      colaList = colaList.filter((p) => p.id !== proceso.id); // Remueve el proceso de la cola.
      finalizados.push(proceso); // Añade el proceso a la lista de finalizados.
      actualizarLista(); // Actualiza la lista de procesos entrantes.
      actualizarFinalizados(); // Actualiza la lista de procesos finalizados.
      actualizarEjecucion("--", 0); // Resetea la barra de progreso.
      procesoActual = null; // Resetea el proceso actual.
      // Programamos el siguiente proceso.
      programarSiguiente(); // Programa el siguiente proceso.
    }
  }, 20); // Intervalo de actualización de 20ms.
}

// Función para actualizar el tiempo de espera de cada proceso en la cola (para aging).
// Incrementa el tiempo de espera de cada proceso en la cola.
function aplicarAging() {
  colaList.forEach((proc) => {
    proc.tiempoEspera += 20; // Cada 20ms aumenta el tiempo de espera.
  });
  actualizarLista(); // Actualiza la lista de procesos entrantes.
}

// Programar el siguiente proceso si hay alguno.
// Selecciona y ejecuta el siguiente proceso en la cola.
function programarSiguiente() {
  if (colaList.length === 0 && procesos.length === 0) {
    clearInterval(timerAging); // Detiene el temporizador de aging si no hay procesos.
    return;
  }
  if (procesoActual) return; // Si ya hay un proceso en ejecución, no hace nada.
  let siguiente = seleccionarProceso(); // Selecciona el siguiente proceso.
  if (siguiente) {
    ejecutarProceso(siguiente); // Ejecuta el siguiente proceso.
  }
}

// Simulación de llegada de procesos (uno cada cierto intervalo).
// Genera procesos y los añade a la cola en intervalos regulares.
function simularLlegadas(totalProcesos, minR, maxR) {
  let contador = 0; // Contador de procesos generados.
  const intervaloLlegadas = setInterval(() => {
    if (contador >= totalProcesos) {
      clearInterval(intervaloLlegadas); // Detiene la generación de procesos cuando se alcanza el total.
      return;
    }
    // Generar ráfaga aleatoria.
    const rafaga = Math.floor(Math.random() * (maxR - minR + 1)) + minR; // Genera un tiempo de ráfaga aleatorio entre minR y maxR.
    const proc = crearProceso(contador, rafaga); // Crea un nuevo proceso.
    procesos.push(proc); // Añade el proceso a la lista de procesos creados.
    colaList.push(proc); // Añade el proceso a la cola de procesos listos.
    actualizarLista(); // Actualiza la lista de procesos entrantes.
    // Si no hay proceso en ejecución, lo programa.
    if (!procesoActual) {
      programarSiguiente(); // Programa el siguiente proceso.
    }
    contador++; // Incrementa el contador de procesos generados.
  }, 800); // Intervalo de generación de procesos de 800ms.
}

// Evento del botón de iniciar.
// Inicia la simulación de llegada de procesos y el temporizador de aging.
document.getElementById("btnIniciar").addEventListener("click", () => {
  // Limpiar mensaje de error.
  const errorMsg = document.getElementById("errorMensaje");
  errorMsg.textContent = ""; // Borra el mensaje de error.
  errorMsg.style.color = ""; // Resetea el color del texto.

  // Resetear variables.
  procesos = []; // Resetea la lista de procesos creados.
  colaList = []; // Resetea la cola de procesos listos.
  finalizados = []; // Resetea la lista de procesos finalizados.
  procesoActual = null; // Resetea el proceso actual.
  actualizarLista(); // Actualiza la lista de procesos entrantes.
  actualizarFinalizados(); // Actualiza la lista de procesos finalizados.
  actualizarEjecucion("--", 0); // Resetea la barra de progreso.

  const totalProcesos = parseInt(document.getElementById("numProcesos").value); // Obtiene el número total de procesos.
  const minR = parseInt(document.getElementById("minRafaga").value); // Obtiene el tiempo mínimo de ráfaga.
  const maxR = parseInt(document.getElementById("maxRafaga").value); // Obtiene el tiempo máximo de ráfaga.

  // Verificar si minR es menor que maxR.
  if (minR >= maxR) {
    const errorMsg = document.getElementById("errorMensaje");
    errorMsg.textContent = "Número mínimo no puede ser mayor al máximo.";
    errorMsg.style.color = "red";
    return; // No iniciar la simulación.
  }

  simulacionActiva = true; // Activa la simulación.

  // Iniciar el timer para aging (cada 20ms).
  clearInterval(timerAging); // Detiene el temporizador de aging si está activo.
  timerAging = setInterval(() => {
    if (document.getElementById("aging").checked && colaList.length > 0) {
      aplicarAging(); // Aplica aging a los procesos en la cola.
    }
  }, 20); // Intervalo de actualización de 20ms.

  // Simular la llegada de procesos.
  simularLlegadas(totalProcesos, minR, maxR); // Inicia la simulación de llegada de procesos.
});

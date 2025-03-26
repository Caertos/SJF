# Simulador SJF (Shortest Job First)

Este proyecto es un simulador interactivo del algoritmo de planificación de procesos **Shortest Job First (SJF)**, desarrollado utilizando **HTML**, **CSS** y **JavaScript**. Permite visualizar cómo se gestionan los procesos en una cola de ejecución, mostrando los procesos entrantes, el proceso en ejecución y los procesos finalizados.

## Características

- **Simulación de procesos**: Genera procesos con tiempos de ráfaga aleatorios dentro de un rango definido por el usuario.
- **Planificación SJF**: Selecciona el proceso con el menor tiempo de ráfaga para ejecutarlo.
- **Aging opcional**: Permite ajustar dinámicamente las prioridades de los procesos en espera para evitar inanición.
- **Interfaz visual**: Muestra los procesos en tres paneles:
  - **Cola de procesos**: Lista de procesos listos para ejecutarse.
  - **Proceso en ejecución**: Proceso actualmente en ejecución con una barra de progreso.
  - **Procesos finalizados**: Lista de procesos que ya han terminado.
- **Configuración personalizada**: El usuario puede definir:
  - Cantidad de procesos.
  - Rango de tiempos de ráfaga (mínimo y máximo).
  - Activar o desactivar el **aging**.

## Estructura del Proyecto

```
SJF/
├── index.html       # Estructura principal de la aplicación.
├── styles.css       # Estilos visuales de la interfaz.
├── script.js        # Lógica de la simulación y planificación.
└── README.md        # Documentación del proyecto.
```

## Cómo Usar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/simulador-sjf.git
   cd simulador-sjf
   ```

2. **Abrir el archivo `index.html`**:
   Abre el archivo `index.html` en tu navegador preferido.

3. **Configurar la simulación**:
   - Introduce la cantidad de procesos.
   - Define el rango de tiempos de ráfaga (mínimo y máximo).
   - Activa o desactiva la opción de **aging** según prefieras.

4. **Iniciar la simulación**:
   Haz clic en el botón **"Iniciar Simulación"** para comenzar.

5. **Visualizar los resultados**:
   - Observa cómo los procesos se mueven entre los paneles de **Cola de Procesos**, **Proceso en Ejecución** y **Finalizados**.
   - La barra de progreso muestra el avance del proceso en ejecución.

## Capturas de Pantalla

### Interfaz Inicial
![Interfaz Inicial](https://via.placeholder.com/800x400?text=Interfaz+Inicial)

### Simulación en Progreso
![Simulación en Progreso](https://via.placeholder.com/800x400?text=Simulación+en+Progreso)

## Tecnologías Utilizadas

- **HTML5**: Para la estructura de la aplicación.
- **CSS3**: Para los estilos visuales y diseño responsivo.
- **JavaScript**: Para la lógica de la simulación y la interacción dinámica.

## Personalización

Puedes modificar los siguientes parámetros en el código:

- **Intervalo de llegada de procesos**: Ajusta el tiempo entre la llegada de nuevos procesos en el archivo `script.js`.
- **Duración de la ráfaga**: Cambia el rango de ráfagas en el formulario o directamente en el código.
- **Estilos visuales**: Personaliza los colores y diseño en el archivo `styles.css`.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección: `git checkout -b mi-nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit: `git commit -m "Añadida nueva funcionalidad"`.
4. Sube tus cambios: `git push origin mi-nueva-funcionalidad`.
5. Abre un pull request en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autores

- **Juan David Escarraga**
- **Carlos Cochero**
- **Juan David Benitez**

## Contacto

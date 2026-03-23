## Objetivo
En este ejercicio práctico, nuestro objetivo es familiarizarnos con la gestión de la concurrencia en las ejecuciones de los flujos de trabajo.

## Tareas


1. Crear un archivo llamado 18-1-concurrency.yaml en la carpeta .github/workflows en la raíz de su repositorio.
  - Nombre: 18 - 1 - Managing Concurrency
  - desencadenantes:
    - workflow_dispatch
   - Añadir una key 'concurrency' a nivel de workflow. Pase un único parámetro a la key 'concurrency', llamado 'group', y con el valor "<recuperar el nombre del flujo de trabajo aquí>-<recuperar la referencia de git aquí>".
  - Trabajos:
    - **slow-greet**:
      - Debería ejecutarse en ubuntu-latest. 
      - Debería contener un step, que imprima un mensaje de saludo en la consola. Añadir un retraso(sleep) de 30 segundos al step para simular una tarea lenta.
2. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo varias veces desde la interfaz de usuario (con unos segundos entre los desencadenantes) y tomar unos momentos para inspeccionar el resultado de la ejecución del flujo de trabajo. ¿Cómo influyó la concurrencia en la ejecución del flujo de trabajo?
3. Quitar la concurrency a nivel de workflow y añadirla a nivel de job.
4. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo varias veces desde la interfaz de usuario (con unos segundos entre los desencadenantes) y tomar unos momentos para inspeccionar el resultado de la ejecución del flujo de trabajo. ¿Cómo influyó la concurrencia en la ejecución del flujo de trabajo?
5. Añadir un segundo job al flujo de trabajo 18-1-concurrency.yaml, llamado slow-but-important-greet. Este trabajo debería tener las siguientes especificaciones (sin concurrencia):
  - Debería ejecutarse en ubuntu-latest.
  - Debería contener un step, que imprima un mensaje de saludo en la consola. Añadir un retraso (sleep) de 30 segundos al step para simular una tarea lenta.
6. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo varias veces desde la interfaz de usuario (con unos segundos entre los desencadenantes) y tomar unos momentos para inspeccionar el resultado de la ejecución del flujo de trabajo. ¿Cómo influyó la concurrencia en la ejecución del flujo de trabajo?

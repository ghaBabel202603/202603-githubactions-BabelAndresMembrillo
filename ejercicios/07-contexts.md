## Objetivo

Explorar el uso de **contextos en GitHub Actions**, especialmente: - el
contexto **github** - variables de repositorio (**vars**) - parámetros
de entrada (**inputs**) en ejecuciones manuales.

------------------------------------------------------------------------

## Tareas

### 1. Crear el workflow

Crear un archivo llamado **07-contexts.yaml** en la carpeta
**.github/workflows** en la raíz del repositorio.

El workflow debe tener:

-   **nombre:** 07 - Contexts
-   **run-name:** `07 - Contexts | DEBUG - ${{ inputs.debug }}`
-   **desencadenantes:**
    -   `push`
    -   `workflow_dispatch` con un **input** llamado `debug`, de tipo
        booleano y valor por defecto `false`.
-   **job:** `echo-data`
    -   se ejecuta en **ubuntu-latest**
    -   tiene dos steps:

**Step 1: Show GitHub Context**

Debe imprimir la siguiente información usando el contexto `github`:

    Event: <nombre del evento>
    Ref: <referencia>
    SHA: <sha del commit>
    Actor: <actor>
    Workflow: <nombre del workflow>

**Step 2: Retrieve Variable**

Debe imprimir el valor de una variable del repositorio llamada
**MY_VAR**.

------------------------------------------------------------------------

### 2. Crear una variable de repositorio

Crear una variable llamada:

    MY_VAR = hola mundo

------------------------------------------------------------------------

### 3. Ejecutar el workflow

1.  Confirmar los cambios y hacer **push en main**.
2.  Revisar la ejecución del workflow y la información mostrada.

------------------------------------------------------------------------

### 4. Ejecutar manualmente el workflow

1.  Ir a **Actions** en GitHub.
2.  Ejecutar el workflow manualmente usando **Run workflow**.
3.  Probar con:
    -   `debug = false`
    -   `debug = true`

Observar cómo cambia el **nombre de la ejecución del workflow**.

------------------------------------------------------------------------

### 5. Limpiar triggers

Editar el workflow para dejar **solo**:

    workflow_dispatch

De esta forma el workflow solo se ejecutará manualmente.


## Tips
- Para crear una variable de repositorio, siga estos pasos:

  1. Vaya a la pestaña Configuración de su repositorio.
  2. En el menú de la izquierda, haga clic en Secretos y Variables.
  3. Haga clic en la pestaña Variables.
  4. Haga clic en el botón Nueva variable.
  5. En el campo Nombre, escriba MY_VAR.
  6. En el campo Valor, escriba hola mundo.
  7. Haga clic en el botón Agregar.
  8. Listo! Ahora puede acceder a esta variable en su flujo de trabajo utilizando la sintaxis ${{ var.MY_VAR }}.


- Para definir inputs para el evento workflow_dispatch,aañada un nuevo valor 'inputs' al evento workflow_dispatch. Por ejemplo:
   ```yaml
   on:
     workflow_dispatch:
       inputs:
         debug:
           description: 'Debug mode'
           type: boolean           
           default: false
   ```
    Para acceder al valor de la entrada en su flujo de trabajo, utilice la sintaxis ${{ inputs.debug }}. Tras esto, al ejecutar el flujo de trabajo desde la interfaz de usuario, aparecerá un cuadro de diálogo que le permitirá definir el valor de la entrada de debug. 


- Para definir variables de entorno en su flujo de trabajo, utilice la clave 'env' a nivel de workflow, job o step. Por ejemplo:
   ```yaml
   env:
     MY_VAR: 'value'
   ```

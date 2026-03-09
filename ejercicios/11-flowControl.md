## Objetivo
Explorar en detalle cómo definir dependencias entre trabajos, así como cómo ejecutar trabajos condicionalmente y cómo continuar la ejecución a pesar de los fallos.

## Tareas

1. Crear un archivo llamado 11-execution-flow.yml en la carpeta .github/workflows en la raíz del repositorio. Los datos del workflow deben ser los siguientes:
    - nombre: 10 - Controlling the Execution Flow
    - desencadentes:
        - workflow_dispatch: el desencadenador workflow_dispatch debe recibir un único input llamado pass-unit-tests, de tipo booleano y con un valor predeterminado de false. 
    - Trabajos:
      - **lint-build**, debería ejecutarse en ubuntu-latest. Definir un único step llamado Lint and build que imprima el siguiente mensaje: "Linting and building project"
      - **unit-tests**, debería ejecutarse en ubuntu-latest. Definir dos steps:
        - El primer step, llamado Running unit tests, debería imprimir el siguiente mensaje: "Running tests..."
        - El segundo step, llamado Failing tests, debería salir con un código distinto de cero y debería ejecutarse si y solo si la entrada pass-unit-tests está configurada como false.
      - **deploy-nonprod**, debería ejecutarse en ubuntu-latest. Debería ejecutarse solo después de que los trabajos lint-build y unit-tests se completen con éxito. Definir un único step llamado Deploying to nonprod que imprima el siguiente mensaje: "Deploying to nonprod..."
      - **e2e-tests**, debería ejecutarse en ubuntu-latest. Debería ejecutarse solo después de que el trabajo deploy-nonprod se complete con éxito. Definir un único step llamado Running E2E tests que imprima el siguiente mensaje: "Running E2E tests"
      - **load-tests**, debería ejecutarse en ubuntu-latest. Debería ejecutarse solo después de que el trabajo deploy-nonprod se complete con éxito. Definir un único step llamado Running load tests que imprima el siguiente mensaje: "Running load tests"
      - **deploy-prod**, debería ejecutarse en ubuntu-latest. Debería ejecutarse solo después de que los trabajos e2e-tests y load-tests se completen con éxito. Definir un único step llamado Deploying to prod que imprima el siguiente mensaje: "Deploying to prod..."

2. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU, proporcionando valores variables para el input pass-unit-tests. Tómese unos momentos para inspeccionar la salida de las ejecuciones del flujo de trabajo. ¿Cómo afectó el fallo de un solo job al flujo de ejecución?
3. Modificar el trabajo unit-tests para permitir la continuación del flujo de trabajo incluso si éste falla. Esto se puede hacer agregando continue-on-error: true en el nivel de definición del job.
4. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU, proporcionando valores variables para el input pass-unit-tests. Tómese unos momentos para inspeccionar la salida de las ejecuciones del flujo de trabajo.  ¿Cómo afectó el fallo de un solo job al flujo de ejecución?
5. continue-on-error debe usarse con moderación, solo si hay un caso de uso específico (por ejemplo, características experimentales). En este caso, la hemos usado para poder analizar las casuísticas de dependencias de trabajo. Eliminar la opción continue-on-error de la definición del job, confirmar los cambios y hacer push del código.

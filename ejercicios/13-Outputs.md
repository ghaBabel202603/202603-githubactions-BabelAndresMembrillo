## Objetivo

Explorar cómo establecer salidas desde trabajos y flujos de trabajo.

## Tareas

1. Crear un archivo llamado 13-outputs.yaml en la carpeta .github/workflows en la raíz del repositorio. Los datos del flujo de trabajo deben ser los siguientes:
   - nombre: 13 - Working with Outputs.
   - desencadenantes:
     - workflow_dispatch: el desencadenador workflow_dispatch debe recibir los siguientes inputs:
       - build-status, de tipo choice, con las siguientes opciones: success, failure. El valor predeterminado debe ser success. Como descripción, debería contener: "Choose the build status for the demo"
   - Trabajos:
     - **build**:
       - Debería ejecutarse en ubuntu-latest.
       - Debería tener dos steps:
         - El primer step, llamado Print GITHUB_OUTPUT path, debería imprimir el valor de la variable de entorno GITHUB_OUTPUT.
         - El segundo step, llamado Build, debería tener un id de build, y debería agregar la siguiente línea al archivo cuya ruta se almacena en la variable
           GITHUB_OUTPUT: "status=<recupere el valor del input build-status aquí>". Si no está seguro de cómo agregar valores a este archivo, consulte la sección de TIPS a continuación.
       - Debería proporcionar una salida llamada build-status, que contiene el valor de la salida status del step con un id de build.
     - **deploy**:
       - Debería ejecutarse en ubuntu-latest.
       - Debería ejecutarse solo después de que el trabajo build se complete con éxito y si la salida build-status del trabajo build es igual a success.
       - Debería contener un único step llamado Deploy que imprima el siguiente mensaje: "Deploying"
2. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU, proporcionando valores variables para los inputs. Tómese unos momentos para inspeccionar la salida de las ejecuciones del flujo de trabajo. ¿Cómo afectaron los diferentes inputs a los resultados de las ejecuciones del flujo de trabajo?

## Tips

Para agregar valores a un archivo, podemos usar la siguiente sintaxis: `echo "<contenido de la línea>" >> "<ruta del archivo>"`

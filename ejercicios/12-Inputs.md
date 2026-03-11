## Objetivo
Explorar las dfirentes formas en las que podemos proveer entradas de información a nuestros flujos de trabajo.


## Tareas

1. Crear un archivo llamado 12-inputs.yml en la carpeta .github/workflows en la raíz del repositorio. Los datos del workflow deben ser los siguientes:
    - nombre: 12 - Working with Inputs
    - desencadentes:
        - workflow_dispatch: el desencadenador workflow_dispatch debe recibir los siguientes inputs:
            - dry-run, de tipo booleano y con un valor predeterminado de false. Debería contener la siguiente descripción: "Skip deployment and only print build output"
            - target, de tipo environment, requerido, y con la siguiente descripción: "Which environment the workflow will target"
            - tag, de tipo choice, con las siguientes opciones: v1, v2, y v3. Debería tener v3 como valor predeterminado, y contener la siguiente descripción: "Release from which to build and deploy" 
    - Trabajos:
      - **build**, debería ejecutarse en ubuntu-latest. Definir un único step llamado Build que imprima el siguiente mensaje: "Building from tag  'valor del tag ' "
      - **deploy**, debería ejecutarse en ubuntu-latest. Debería ejecutarse solo después de que el trabajo build se complete con éxito y si la entrada dry-run está configurada como false. Además debería establecer la opción environment en el valor del input target. Definir un único step llamado Deploy que imprima el siguiente mensaje: "Deploying to 'valor del target'"
2. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU, proporcionando valores variables para los inputs. Tómese unos momentos para inspeccionar la salida de las ejecuciones del flujo de trabajo. ¿Cómo afectaron los diferentes inputs a los resultados de las ejecuciones del flujo de trabajo? 

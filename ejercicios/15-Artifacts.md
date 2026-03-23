## Objetivo
Explorar cómo compartir salidas de construcción entre trabajos y cómo combinar el uso de caché y artefactos en el mismo flujo de trabajo.
Para lograr esto, crearemos un flujo de trabajo que construirá una aplicación React y almacenará los archivos de construcción como artefactos. Además, generaremos un informe de cobertura de pruebas unitarias y lo almacenaremos como un artefacto adicional.

## Tareas

### Generar una aplicación React:

1. Crear una nueva carpeta llamada 15-artifacts en la raíz del repositorio.
2. Usando una terminal, hacer cd en este directorio y genere una aplicación React usando la utilidad create-react-app.
3. Una vez que la configuración de React esté lista, debería ver un mensaje de éxito.

### Trabajando con artefactos y caché:

1. Crear un archivo llamado 15-artifacts.yaml en la carpeta .github/workflows en la raíz de su repositorio.  Los datos del flujo de trabajo deben ser los siguientes:
  - Nombre: 15 - Working with Artifacts
  - desencadenantes:
    - workflow_dispatch: 
  - Trabajos:
    - **test-build**:
      - Debería ejecutarse en ubuntu-latest.
      - Debería establecer la carpeta de trabajo en 15-artifacts/react-app como directorio de trabajo predeterminado.
      - Debería tener siete steps:
        - El primer step, llamado Checkout code, debería verificar el código del repositorio en el directorio de trabajo predeterminado.
        - El segundo step, llamado Setup Node, debería configurar Node con la versión 20.x.
        - El tercer step, llamado Download cached dependencies, debería:
          - Tener un id  'cache'.
          - Usar la third-party action actions/cache@v3.
          - Pasar los siguientes inputs al action:
            - key: debería ser deps-node-modules-${{ hashFiles('15-artifacts/react-app/package-lock.json') }}
            - path: la ruta donde restaurar la caché, que debería ser 15-artifacts/react-app/node_modules.
        - El cuarto step, llamado Install dependencies, debería ejecutar el comando npm ci, y debería ejecutarse solo si no hubo un cache hit en el step Download cached dependencies.
        - El quinto step, llamado Unit tests, debería ejecutar el comando npm run test.
        - El sexto step, llamado Build code, debería ejecutar el comando npm run build.
        - El séptimo step, llamado Upload build files, debería:
          - Usar la third-party action actions/upload-artifact@v4.
          - Pasar dos inputs al action: 
            - name, con un valor de app, que se usa para la referenciar el artefacto en una descarga posterior,
            - path, con valor '15-artifacts/react', el cual se usa para determinar qué carpetas y/o archivos deben cargarse como un artefacto.
2. Agregar un nuevo trabajo llamado deploy al flujo de trabajo:
    - Debería ejecutarse en ubuntu-latest.
    - Debería tener una dependencia en el trabajo test-build.
    - Debería contener dos steps:
      - El primero, llamado Download build files, debería:
        - Usar la third-party action actions/download-artifact@v4.
        - Pasar dos inputs al action: 
          - name, con un valor de app, que debería ser el mismo que el valor del input name del action upload-artifact
          - path, con el valor  'build', que se usa para determinar en qué directorio se deben colocar los archivos del artefacto.

3. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU y observar los tiempos de ejecución de cada paso. ¿Cómo se ven los artefactos cargados? ¿Cómo se ven los informes de cobertura de pruebas unitarias?
4. Extender el flujo de trabajo para cargar informes de cobertura de pruebas unitarias como artefactos:
    - Reemplace el nombre del input en los actions upload-artifact y download-artifact existentes por una variable 'env' a nivel de flujo de trabajo llamada build-artifact-key. El valor de esta variable debería ser app-${{ github.sha }}.
    - Agregue una segunda variable 'env' a nivel de flujo de trabajo llamada test-coverage-key y con valor test-coverage-${{ github.sha }}.
    - Cambie el script del step Unit tests para generar un informe de cobertura. Si no está seguro de cómo hacerlo, consulte la sección de Tips a continuación.
    - Agregue un nuevo step después del step Unit tests. El step debería:
      - Llamarse Upload test results.
      - Cargar el contenido de la carpeta 15-artifacts/react-app/coverage, que se genera al ejecutar el comando test con la opción de cobertura activada. Use el valor de la variable test-coverage-key como el valor del input name.
5. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU y observar los tiempos de ejecución de cada paso. ¿Cómo se ven los artefactos cargados? ¿Cómo se ven los informes de cobertura de pruebas unitarias?

## Tips

Para generar un informe de cobertura de pruebas unitarias, simplemente pase la opción --coverage al comando de prueba. 
Por ejemplo, si su comando de prueba es npm run test, el comando para generar un informe de cobertura sería npm run test -- --coverage, con un -- adicional antes de la opción --coverage. 
Por lo tanto, el script correcto para ejecutar es 
```shell
npm run test -- --coverage
```

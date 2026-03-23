## Objetivo
Explorar la sintaxis de las composite custom actions  y cómo crearlas en GitHub Actions.
Para ello, crearemos una composite action capaz manejar la instalación y el almacenamiento en caché de las dependencias de npm, y así abstraer todo esa lógica dentro de una acción reutilizable fácil de usar. 

## Tareas

1. Crear un archivo llamado action.yaml en la carpeta .github/actions/composite-cache-deps. Esta carpeta no existe aún, por lo que es posible que tengas que crearla.
2. En el archivo action.yaml, añadir las siguientes propiedades:
   - Un 'name' con "Cache Node and NPM Dependencies"
   - Un 'description' con "This action allows to cache both Node and NPM dependencies based on the package-lock.json file.";
   - La acción debería recibir dos inputs:
     - El primero, llamado 'node-version', debería ser requerido, tener un description 'NodeJS version to use', y por defecto ser '20.x'.
     - El segundo, llamado 'working-dir', no debería ser requerido, tener un description  'The working directory of the application', y por defecto ser el directorio actual si no se pasa ningún input.
3. Añadir una key 'runs' a nivel de workflow. Esta es la clave principal para definir nuestra composite custom action. Para una composite action, la key 'runs' tiene la siguiente forma:
```yaml
runs:
  using: composite
  steps: [...] #Similar a los steps de un job
```
   donde:
        - 'using: composite' simplemente informa a GitHub Actions que esta es una composite custom action.
        - 'steps: [...]' contiene la matriz de steps que deseas ejecutar. Esto es muy similar a los steps que ya hemos definido para los jobs en  ejercicios anteriores.
4. Añadir los siguientes steps bajo la key 'steps':
   - El primer step, llamado 'Setup NodeJS version <retrieve the node-version input value here>', debería configurar NodeJS usando la versión proporcionada en los inputs.
   - El segundo step, llamado 'Cache dependencies', debería tener un id de 'cache', y usar la acción 'actions/cache' para almacenar en caché la ruta de 'node_modules' bajo el directorio de trabajo proporcionado, y usando una key adecuada. Consulta la sección de Tips a continuación para calcular la key de manera efectiva.
   - El tercer step, llamado 'Install dependencies', debería ejecutarse si y solo si no hubo un acierto de caché en el paso dos. Debería ejecutar el script 'npm ci' bajo el directorio de trabajo proporcionado, y debería usar el shell bash.
   

5. Confirmar los cambios y hacer push del código. Tómate unos momentos para entender la sintaxis de la composite custom action y las similitudes y diferencias con los steps de job. Por ahora no pasará nada, ya que esta acción personalizada no se utiliza en ningún flujo de trabajo, así que pasemos al siguiente ejercicio donde crearemos nuestro flujo de trabajo!


## Tips

Cuando calculamos la key de la caché, debemos tener en cuenta nuestro archivo package-lock.json que se encuentra en el directorio de trabajo proporcionado. No debemos mirar todos los archivos package-lock.json, ya que puede haber más de un proyecto dentro de nuestro repositorio (que es en realidad el caso para nosotros), y esto puede llevar a cambios incorrectos en la key de la caché debido a cambios en archivos no relacionados. Para hashear archivos y usar el directorio de trabajo proporcionado desde una expresión, puedes usar la siguiente sintaxis: your-key-prefix-${{ hashFiles(format('{0}/{1}', inputs.working-dir, 'package-lock.json')) }}.

Para ejecutar un step dentro de un directorio de trabajo proporcionado, puedes usar la siguiente sintaxis:
```yaml
working-directory: /the/directory/path
```

Para ejecutar un script bajo el shell bash, puedes usar la siguiente sintaxis:
```yaml
run: echo "hello"
shell: bash
```

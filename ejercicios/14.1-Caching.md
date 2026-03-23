## Objetivo
Exploar cómo usar el caching para almacenar y recuperar temporalmente el contenido de carpetas entre varias ejecuciones del flujo del workflow.
Para lograrlo, aprovecharemos una aplicación React que crearemos con la ayuda de la utilidad create-react-app. Consulte la sección de Tips para el comando específico para crear su aplicación React. 

## Tareas

### Generar una aplicación React

1. Crear una nueva carpeta llamada 14-caching en la raíz del repositorio.
2. Usando una terminal, hacer cd en este directorio y genere una aplicación React usando la utilidad create-react-app.
3. Una vez que la configuración de React esté lista, debería ver un mensaje de éxito.

### Crear el flujo de trabajo

1. Crear un archivo llamado 14-caching.yaml en la carpeta .github/workflows en la raíz de su repositorio.  Los datos del flujo de trabajo deben ser los siguientes:
 - Nombre: 14 - Using Cache
 - desencadenantes:
   - workflow_dispatch: el desencadenador workflow_dispatch debe aceptar un input llamado use-cache, de tipo booleano, con un valor predeterminado de true, y con descripción ' Whether to execute cache step' para indicar si ejecutar el paso de caché.
 - Trabajos:
   - **build**:
     - Debería ejecutarse en ubuntu-latest.
     - Debería establecer la carpeta de trabajo en 14-caching/react-app como directorio de trabajo predeterminado.Para ello, consultar la ayuda de github actions (  https://docs.github.com/es/actions/using-jobs/setting-default-values-for-jobs) o la seccion tips.
     - Deberia tener seis steps:
       - El primer step, llamado Checkout code, debería verificar el código del repositorio en el directorio de trabajo predeterminado.
       - El segundo step, llamado Setup Node, debería configurar Node con la versión 20.x.
       - El tercer step, llamado Install dependencies, debería ejecutar el comando npm ci.
       - El cuarto step, llamado Testing, debería ejecutar el comando npm run test.
       - El quinto step, llamado Building, debería ejecutar el comando npm run build.
       - El sexto step, llamado Deploying to nonprod, debería imprimir el siguiente mensaje: "Deploying to nonprod".
2. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU y observar los tiempos de ejecución de cada paso. ¿Cuánto tiempo se tarda en instalar las dependencias? ¿Cuánto tiempo tardaría si el flujo de trabajo se ejecutara 1000 veces?

### Extender el flujo de trabajo con un input para la versión de Node y la posibilidad de usar caching

1. Agregar un nuevo input llamado node-version, de tipo choice, con opciones 18.x, 20.x y 21.x, valor predeterminado de 20.x, y descripción Node version.
2. Actualizar el step Setup Node para usar el valor proporcionado como input en lugar del valor codificado 20.x.
3. Agregar un nuevo step después del step Setup Node:
   - Debería llamarse Download cached dependencies.
   - Debería tener un id de cache. 
   - Debería ejecutarse solo si el input use-cache está configurado en true.
   - Debería usar la third-party action actions/cache@v3.
   - Debería pasar los siguientes inputs al action:
     - key: debería ser deps-node-modules-${{ hashFiles('14-caching/react-app/package-lock.json') }} 
       -  Es importante proporcionar una clave que se mantenga intacta siempre que la lista de dependencias no cambie, y que cambie tan pronto como la lista de dependencias cambie. Esto se logra fácilmente mediante el hash del archivo package-lock.json, ya que este archivo contiene una lista de todas las dependencias, tanto directas como indirectas, de nuestra aplicación.
     - path: la ruta donde restaurar la caché, que debería ser 14-caching/react-app/node_modules. 
       -  Es importante proporcionar la ruta completa, ya que la opción de directorio de trabajo establecida como predeterminada en el nivel de trabajo se aplica solo a los comandos run.
4. Actualizar el step Install dependencies para ejecutarse solo si no se encuentra una caché para la clave proporcionada. Esto se puede hacer aprovechando las salidas de nuestro step de caché. Si hay una caché, la salida de cache-hit se establecerá en 'true' (una cadena, no un booleano).
5. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la IU y observar los tiempos de ejecución de cada paso. ¿Cuánto tiempo se tarda en instalar las dependencias? ¿Cuánto tiempo tardaría si el flujo de trabajo se ejecutara 1000 veces? ¿Cuál es la diferencia en comparación con la versión sin caching?

## Tips

Para crear una aplicación React con con un solo comando, puede usar la utilidad create-react-app. Para ello, dentro de la carpeta 14-caching, ejecute el siguiente comando:

```bash
npx create-react-app --template typescript react-app
```

Para establecer el directorio de trabajo predeterminado para un trabajo, puede usar la clave defaults.run en el nivel de trabajo. Por ejemplo, para establecer el directorio de trabajo predeterminado en 14-caching/react-app, puede usar la siguiente configuración:

```yaml
jobs:
  build:
    defaults:
      run:
        working-directory: 14-caching/react-app
```

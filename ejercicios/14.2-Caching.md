## Objetivo
Explorar cómo usar un job dedicado para el almacenamiento en caché de dependencias y cómo evitar la instalación paralela de dependencias cuando cambia el archivo package-lock.json.
Para lograr esto, extenderemos el flujo de trabajo 14-caching.yaml

## Tareas

1. Agregar un nuevo job llamado install-deps:
    - El job debería ejecutarse en ubuntu-latest
    - El job debería establecer 14-caching/react-app como la opción de directorio de trabajo predeterminado para los comandos run.
    - El job debería contener cinco steps:
        - El primero, llamado Checkout code, debería extraer el código del repositorio en el directorio de trabajo actual.
        - El segundo, llamado Setup Node, debería configurar Node con la versión proporcionada como entrada.
        - El tercero, llamado Calculate cache key, debería tener un id 'cache-key' y generar una salida llamada CACHE_KEY con el valor deps-node-modules-${{ hashFiles('14-caching/react-app/package-lock.json') }}
        - El cuarto debería ser similar al step Download cached dependencies ya implementado. Sin embargo, debería usar la salida del step cache-key en lugar de codificar de nuevo el cache key.
        - El quinto debería ser similar al step Install dependencies ya implementado.
    - El job debería contener una única salida llamada deps-cache-key, y su valor debería provenir de la salida CACHE_KEY del step cache-key.
2. Agregar un nuevo job llamado linting:
    - El job debería ejecutarse en ubuntu-latest
    - El job debería ejecutarse si y solo si el job install-deps se completa con éxito.
    - El job debería establecer 14-caching/react-app como la opción de directorio de trabajo predeterminado para los comandos run.
    - El job debería contener cinco steps:
        - El primero, llamado Checkout code, debería extraer el código del repositorio en el directorio de trabajo actual.
        - El segundo, llamado Setup Node, debería configurar Node con la versión proporcionada como entrada.
        - El tercero debería ser similar al step Download cached dependencies ya implementado. Sin embargo, debería usar la salida del job install-deps en lugar del codifiar de nuevo cache key, y no debería depender de la entrada use-cache.
        - El cuarto, llamado Testing, debería ejecutar el script npm run test.
        - El quinto, llamado Linting, debería imprimir "Linting..." en la pantalla.

3. Modificar el job build
    - Agregar una dependencia al job install-deps.
    - Eliminar el step Install dependencies, ya que las dependencias siempre vendrán de la caché.
    - Actualizar el step Download cached dependencies para usar la salida del job install-deps en lugar de codificar de nuevo el cache key. Además, ya no debería verse influenciado por la entrada use-cache, ya que la caché se vuelve necesaria para la correcta ejecución del job.

4. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo varias veces e inspeccionar los tiempos de ejecución de cada paso. ¿Cuánto tiempo se tarda en instalar las dependencias? ¿Cuánto tiempo tardaría si el flujo de trabajo se ejecutara 1000 veces?

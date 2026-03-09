## Objetivo

Probar el uso de **funciones en GitHub Actions**, especialmente:

-   funciones de estado (`success()`, `failure()`, `always()`)
-   la función `contains()`
-   acceso a datos de una **pull request** desde el contexto `github`.

------------------------------------------------------------------------

## Tareas

### 1. Crear el workflow

Crear un archivo llamado **10-functions.yml** en la carpeta
**.github/workflows**.

El workflow debe tener:

-   **nombre:** 10 - Functions
-   **desencadenantes:**
    -   `pull_request`
    -   `workflow_dispatch`
-   **job:** `demo`
    -   se ejecuta en **ubuntu-latest**
    -   debe tener los siguientes steps:

1.  **Failing step**

Debe fallar intencionadamente.

2.  **Run on success**

Debe ejecutarse solo si los pasos anteriores han tenido éxito.

Imprime:

    Success step

3.  **Run on failure**

Debe ejecutarse solo si algún paso anterior ha fallado.

Imprime:

    Failure step

4.  **Always step**

Debe ejecutarse siempre.

Imprime:

    Always step

------------------------------------------------------------------------

### 2. Probar con una Pull Request

Añadir un step adicional al inicio del job:

**Bug step**

Debe ejecutarse si el título de la PR contiene la palabra **fix**.

Imprime:

    Bug fix detected

------------------------------------------------------------------------

### 3. Probar el workflow

1.  Crear una rama nueva.
2.  Modificar el **README.md**.
3.  Crear una **Pull Request** hacia `main`.

Probar dos títulos de PR:

-   uno normal
-   otro que contenga **fix**

Observar cuándo se ejecuta el step **Bug step**.

### 4. Limpiar triggers
Cambiar los triggers del flujo de trabajo para contener solo workflow_dispatch para evitar que este flujo de trabajo se ejecute con cada push y ensucie la lista de ejecuciones del flujo de trabajo.


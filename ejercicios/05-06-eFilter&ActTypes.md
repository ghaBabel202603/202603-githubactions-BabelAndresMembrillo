## Objetivo
Explorar cómo funcionan los **event filters** y los **activity types** en GitHub Actions para controlar cuándo se ejecuta un workflow.

---

## Tareas

1. Crear un archivo llamado **07-filters-and-activity-types.yaml** en la carpeta **.github/workflows** en la raíz del repositorio.  
   Los datos del workflow deben ser los siguientes:

   - **nombre:** 07 - Filters and Activity Types.
   - **desencadenantes:**
     - **push**, utilizando filtros para que el workflow se ejecute **solo cuando haya cambios en la rama `main`**.
     - **pull_request**, utilizando **activity types `opened` y `synchronize`**, y añadiendo un filtro para que **solo se ejecute cuando la rama base sea `develop`**.
     - **workflow_dispatch**, para permitir ejecutar el workflow manualmente.
   - **Trabajos:**
     - **echo**, que tiene un único step que imprime el siguiente mensaje en pantalla:  
       `'Workflow triggered by filters or activity types'`.

---

2. Confirmar los cambios y subir (**push**) el código en la rama **main**.  
   Inspeccionar el resultado de la ejecución del workflow.

---

3. Crear una rama **develop** a partir de **main** utilizando la UI de GitHub o desde local, y sincronizar los cambios.

---

4. Crear una nueva rama llamada **feat-filters-test** a partir de **develop**.

---

5. Editar el archivo **README.md** en la raíz del repositorio con cualquier cambio y confirmar (**commit**) los cambios en la rama **feat-filters-test**.

---

6. Subir (**push**) la rama al repositorio.

---

7. Crear un **Pull Request** para fusionar la rama **feat-filters-test** en **develop**.  
   Inspeccionar el resultado de la ejecución del workflow.

---

8. Editar nuevamente el archivo **README.md** en la rama **feat-filters-test**, confirmar (**commit**) los cambios y subirlos (**push**).  
   Inspeccionar el resultado de la ejecución del workflow cuando el PR se sincroniza.

---

9. Finalmente, editar el workflow para dejar **solo el desencadenador `workflow_dispatch`**, evitando que el workflow se ejecute automáticamente con cada push o pull request y manteniendo limpia la lista de ejecuciones.
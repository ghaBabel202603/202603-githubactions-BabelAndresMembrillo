## Objetivo
Explorar en detalle cómo trabajar con variables de entorno en flujos de trabajo.


## Tareas

1. Crear un archivo llamado 09-environmentVariables.yml en la carpeta .github/workflows en la raíz del repositorio. Los datos del workflow deben ser los siguientes:
    - nombre: 09 - Using Variables.
    - desencadentes:
        - push
        - workflow_dispatch
    - Definir dos variables de entorno a nivel de workflow:
        - WORKFLOW_VAR, debería contener el valor 'I am a workflow env var'
        - OVERWRITTEN, debería contener el valor 'I will be overwritten'
      - Trabajos:
          - **echo**, debería ejecutarse en ubuntu-latest. Definir dos variables de entorno a nivel de job:
              - JOB_VAR, debería contener el valor 'I am a job env var'
              - OVERWRITTEN, debería contener el valor 'I have been overwritten at the job level'
              
              Steps:
            - *Print Env Variables*. un step que defina dos variables de entorno a nivel de step:
              - STEP_VAR, debería contener el valor 'I am a step env var'
              - step_var2, debería contener el valor 'I am another step var
                
              El step debería imprimir la siguiente información:
    
               ```shell
                 - "Step env var: <recupere el valor de STEP_VAR aquí>"
                 - "Step env var 2: <recupere el valor de step_var2 aquí>"
                 - "Job env var: <recupere el valor de JOB_VAR aquí>"
                 - "Workflow env var: <recupere el valor de WORKFLOW_VAR aquí>"
                 - "Overwritten: <recupere el valor de OVERWRITTEN aquí>"
               ```
            - *Overwrite Job Variable*. un step que defina una variables de entorno a nivel de step:
              - OVERWRITTEN, debería contener el valor 'I have been overwritten at the step level'

              El step debería imprimir una sola línea que contenga "Step env var:  < recupere el valor de OVERWRITTEN aquí >"
2. Confirmar los cambios y enviar el código. Tómese un tiempo para inspeccionar el resultado de la ejecución del flujo de trabajo. ¿Cómo se sobrescribieron las diferentes valores de las variables de entorno? ¿Podríamos renombrar la variable step_var2 a step_var?
3. Cambiar los triggers del flujo de trabajo para contener solo workflow_dispatch para evitar que este flujo de trabajo se ejecute con cada push y ensucie la lista de ejecuciones del flujo de trabajo.

## Tips

- Para definir variables de entorno en GitHub Actions, se puede usar la clave 'env' en la definición del flujo de trabajo, el trabajo o el paso. La clave 'env' acepta un mapa de variables de entorno y sus valores. Por ejemplo:

```yaml
env:
  MY_VARIABLE: 'Hello world'
```

- Cuando ejecutamos scripts de shell, podemos recuperar los valores de las variables de entorno de dos maneras:
  - La primera es usar el contexto env: `echo "Env variable value: ${{ env.MY_VARIABLE }}"`
  - La segunda es acceder directamente a la variable con la sintaxis del signo de dólar: `echo "Env variable value: $MY_VARIABLE"`


## Objetivo
Profundizar conocimientos sobre el uso de expresiones de GitHub Actions en los flujos de trabajo.

## Tareas

1. Crear un archivo llamado 08-expressions.yaml en la carpeta .github/workflows en la raíz del repositorio. Los datos del workflow deben ser los siguientes:
    - nombre: 08 - Expressions.
    - desencadentes:
        - push
        - workflow_dispatch, que defina un parámetro de entrada llamado debug,  de tipo booleano y con un valor predeterminado falso.
    - Trabajos:
        - **echo**, debería ejecutarse en ubuntu-latest y con tres steps:
            -  *'[valor de debug] Print start-up'*, debería ejecutarse solo si la entrada inputs.debug está configurado como verdadero. Si no está seguro de cómo hacerlo, consulte la sección de TIPS. El step debe ejecutar un script de varias líneas para imprimir los siguientes datos:
                ```shell
                "Triggered by: <recupere el nombre del evento aquí>"
                "Branch: <recupere la referencia aquí>"
                "Commit SHA: <recupere el sha de confirmación aquí>"
                "Runner OS: <recupere el sistema operativo runner aquí>"
                ```
            -  *'[valor de debug] Print when triggered from main'*, debería ejecutarse solo si la entrada inputs.debug está configurado como verdadero y el flujo de trabajo se activó desde la rama main. El step debería imprimir una sola línea en la pantalla: "I was triggered from main".
            - *Greeting*, debería ejecutarse con normalidad e imprimir un mensaje "Hello world" en la pantalla.
2. Confirmar los cambios y subir (push) el código en la rama main. Inspeccionar el resultado de la ejecución del workflow.
3. Ahora ejecute el flujo de trabajo manualmente desde la interfaz de usuario, probando distintas variaciones para el valor de debug. Analizar qué cambia.
4. Agregar la propiedad run-name a la definición del flujo de trabajo. La propiedad run-name debería imprimir el siguiente mensaje: 08 - Expressions | DEBUG - <'ON' *si la entrada de depuración es verdadera*, 'OFF' *en caso contrario*>.
   - Las expresiones permiten operadores para asignar valores por defecto y operadores condicionales. Estos operadores son el '&&' y '||' y se usan de la siguiente manera:
     - Proporcionando un valor por defecto: ${{ expresión || valor_predeterminado }}. El valor_predeterminado se utilizará si la expresión se evalúa como un valor falso.
     - Usando la operador condicional : ${{ expresión && valor_verdadero || valor_falso }}. El valor_verdadero se utilizará si la expresión se evalúa como un valor verdadero y el valor_falso se utilizará en caso contrario. 
     Es similar a la operación ternaria en otros lenguajes de programación, como por ejemplo JavaScript, que sería así: expresión ? valor_verdadero : valor_falso.
 
5. Confirmar los cambios y enviar el código. Tómese unos momentos para inspeccionar el resultado de la ejecución del flujo de trabajo desencadenada por el evento push.
6. Arrancar el flujo de trabajo manualmente desde la interfaz de usuario, probando con diferentes valores de debug  e inspeccionar resultados. ¿Que ha cambiado?
7. Reducir la lista de desencadenadores para dejar solo workflow_dispatch, para evitar que este workflow se ejecute con cada push y ensucie la lista de ejecuciones de workflow.

## TIPS
- Para ejecutar jobs y steps de forma condicional, se puede usar la palabra clave 'if' en la definición del mismo. La palabra clave 'if' acepta una expresión y el job o step se ejecutará si la expresión se evalúa como un valor verdadero; de lo contrario, se omitirá el trabajo o paso. 
Por ejemplo:
    ```yaml
    jobs:
        echo:
            runs-on: ubuntu-latest
            steps:
                - name: Test
                  if: github.event_name == 'push'
                  run: echo "I was triggered by a push event"
    ```

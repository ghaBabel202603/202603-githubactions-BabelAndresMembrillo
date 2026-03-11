# Ejercicio: Selección de Environment en GitHub Actions

## Objetivo
Aprender a usar **inputs de tipo `environment`** en GitHub Actions y cómo ejecutar un workflow en el entorno seleccionado.


### 1. Crear el workflow

Crear el archivo:

.github/workflows/10-2-environments.yml

Contenido:

```yaml
name: 10-2 - Working with Environments

on:
  workflow_dispatch:
    inputs:
      target-env:
        description: Environment to deploy
        type: environment
        required: true
        default: pre

run-name: Deploy to ${{ inputs.target-env }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.target-env }}

    steps:
      - name: Show environment
        run: echo "Deploying to ${{ inputs.target-env }}"
```

### 2. Crear los environments
Ir a:
Repository → Settings → Environments.

Crear dos entornos.
- Environment: pre
  - Nombre: pre
  - Sin configuración adicional

- Environment: pro
  - Nombre: pro
  - Activar Required reviewers
  - Añadirte como revisor

### 3. Ejecutar el workflow

- Hacer commit y push
- Ir a Actions
- Ejecutar el workflow manualmente
- Elegir el environment en el selector

### 4. Probar diferentes escenarios

Ejecutar el workflow dos veces.

- Caso 1

  - Seleccionar: pre
  - Pregunta: ¿Se ejecuta el workflow directamente?

- Caso 2

  - Seleccionar: pro
  - Preguntas:
    - ¿Qué ocurre antes de ejecutar el job?
    - ¿Cómo se aprueba la ejecución?


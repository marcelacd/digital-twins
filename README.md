
# Comenzando con Create React App

Este proyecto fue inicializado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando realices cambios. También puedes ver los errores de lint en la consola.

## Construcción y despliegue en AWS ECR

A continuación, se describen los pasos para construir la imagen Docker de la aplicación y cargarla en un repositorio de AWS ECR.

### 1. Autenticarse en el ECR

Autentica tu CLI de Docker en tu repositorio de Amazon ECR. Reemplaza `<aws-region>` por la región de tu cuenta (por ejemplo, `us-east-1`).

```bash
aws ecr get-login-password --region <aws-region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com
```

### 2. Construir la imagen Docker

Construye la imagen Docker de la aplicación React en el directorio del proyecto. Reemplaza `my-react-app` con el nombre que quieras darle a la imagen.

```bash
docker build -t my-react-app .
```

### 3. Etiquetar la imagen

Etiqueta la imagen de Docker para que apunte al repositorio ECR. Reemplaza `<aws-region>` y `<aws-account-id>` por los valores correspondientes.

```bash
docker tag my-react-app:latest <aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com/my-react-app:latest
```

### 4. Crear un repositorio en ECR (si no existe)

Si aún no tienes un repositorio en ECR, puedes crearlo con el siguiente comando:

```bash
aws ecr create-repository --repository-name my-react-app --region <aws-region>
```

### 5. Subir la imagen a ECR

Sube la imagen al repositorio de ECR:

```bash
docker push <aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com/my-react-app:latest
```

### 6. Despliegue

Una vez que la imagen esté en ECR, puedes usarla para desplegar tu aplicación en un servicio de AWS como ECS, EKS o App Runner.

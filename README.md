# Store API

¡Desarrolla y despliega tu API de Store de manera fácil y rápida!

Este repositorio contiene una API de gestión de tiendas y artículos desarrollada con Node.js, Express y MySQL. Con esta API, puedes realizar operaciones como registrar usuarios, autenticar usuarios, crear tiendas, administrar artículos y mucho más.

## Características principales

- **Registro de usuarios:** Permite a los usuarios registrarse en la plataforma proporcionando los datos necesarios.
- **Autenticación de usuarios:** Los usuarios pueden iniciar sesión en la API utilizando sus credenciales.
- **Gestión de tiendas:** Permite crear, actualizar y eliminar tiendas, así como obtener detalles de tiendas específicas.
- **Administración de artículos:** Permite crear, actualizar y eliminar artículos asociados a una tienda, así como obtener detalles de artículos específicos.
- **Documentación Postman:** La API está documentada utilizando Postman, lo que facilita la comprensión y el uso de los diferentes endpoints.

## Instrucciones de ejecución

Para poner en funcionamiento la API de Store, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Ejecuta `npm install` en la raíz del proyecto para instalar las dependencias necesarias.
3. Configura la conexión a la base de datos MySQL en el archivo `config/database.js` o crea tu archivo `.env` en la raíz del proyecto como se explica en la documentación `src/docs/Documentacion_instrucciones_Ejecucion.pdf`.
4. Descarga la base de datos `storedb.sql` y ejecuta el Script en un cliente de MySQL como Workbench.
5. Conecta el contenedor de Docker donde esté corriendo MySQL para conectar el proyecto con la base de datos o utiliza otro medio de conexión.
6. Ejecuta `npm run dev` o `npm start` para iniciar el servidor de la API.
7. Accede a `https://documenter.getpostman.com/view/19168398/2s93sW9FsU` en tu navegador para ver la documentación Postman y explorar los diferentes endpoints.
8. Importa la colección `Api-Store.postman.json` en Postman para empezar a consumir los diferentes endpoints de la API.

¡Comienza a utilizar la API de Store y lleva la gestión de tiendas y artículos al siguiente nivel!

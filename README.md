# Product hunt clone

This is a copy of product hunt, this is mainly a functionality copy, the design might be different from the original.

## How to use the App?

1. clone the project.
2. cd to the cloned directory.
3. npm install.
4. npm run dev.

> [!IMPORTANT]
> If you want to use this repo after "Second-Release" tag you will need to create a .js file in path:
> src/Firebase/Helpers called FirebaseAuth.js in this file you'll put the neccesary keys to access in your
> firebase project.

## Technologies

1. [React](https://react.dev/)
2. [Tailwind CSS](https://tailwindcss.com/)
3. [npm](https://www.npmjs.com/)
4. [Vite](https://vitejs.dev/)
5. [Firebase](https://firebase.google.com/)

## React libraries

1. [React router dom](https://reactrouter.com/en/main)
2. [React modal](https://www.npmjs.com/package/react-modal)
3. [React carousel](https://www.npmjs.com/package/react-responsive-carousel)
4. [React icons](https://react-icons.github.io/react-icons/)
5. [React rating stars](https://www.npmjs.com/package/react-rating-stars-component)
6. [Sooner](https://sonner.emilkowal.ski/)
7. [FirebaseSDK](https://firebase.google.com/docs)

## Team members

1. [Thomas Aguirre Gonzalez](https://github.com/Thomas-Parker24)
2. [Nicolas Augusto Zapata Valdes](https://github.com/NicolasZapataValdes)
3. [Juan David Ceballos Lopez](https://github.com/JuanDCeballos)

## First release

> [!NOTE]
> In tag "First-Relase" the SPA is woring with mocked data

● Debe estar maquetado el diseño y opciones asociadas al Home page (Lista de
productos y banner del home page)

● Las opciones del banner como perfil de usuario y publicación de nuevos productos,
debe estar maquetado y diseñado.

● Debe estar maquetado y diseñado la vista de producto publicado, debe estar
fundamentado a los requerimientos de esta vista ya previamente descritos.

● Todas estas visitas deben poder estar interconectadas con un sistema de enrutado.

● Para validar que las funcionalidades de las vistas y los componentes puedes
implementar jsons con data mockeada o de prueba.

## Second Relase

> [!NOTE]
> In tag "Second-Relase" the SPA is woring with Firebase using FireStore

● La aplicación debe ser capaz de conectarse con un servicio externo (REST API o Firebase),
consumir los recursos de lectura y escritura de los datos para alimentar la SPA.

### Manejo de usuarios y autenticación:

    ● La aplicación debe ser capaz de dar acceso un usuario previamente registrado a
    través de los siguientes métodos de autenticación:

        ○ Email, contraseña

        ○ Autenticación por proveedor externo (Google, Facebook, Github, Etc)
        Cuando la autenticación sea exitosa se debe guardar la información del usuario en el
        context de la aplicación (Buen manejo del reducer y compartido a través del
        context).

    ● El formulario de registro de nuevos usuarios debe lograr crear un nuevo registro del
    nuevo usuario, para esto la app debe ser capaz de crear este usuario a través del
    SDK de firebase o hacer una petición HTTP a una API externa (si es el caso).

### Gestión de productos:

    ● Los usuarios pueden publicar nuevos productos.
    ● Los usuarios pueden editar y eliminar sus propios productos.
    ● Cargar los productos creados en el home page con la información pertinente al
    producto.
    ● Cargar en la vista de producto los detalles del mismo incluyendo calificaciones y
    reseñas.

### Calificaciones y reseñas:

    ● Los usuarios pueden calificar un producto.
    ● Los usuarios pueden dejar reseñas sobre un producto.
    ● Obtener la calificación promedio de un producto.
    ● Obtener todas las reseñas de un producto.

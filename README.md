# Desafío tecnico fullstack

### Requisitos
* Es necesario tener instalado MongoDB en su equipo
* Abra una terminal y coloque el siguiente comando `sudo mongod` para Linux y Mac. En Windows abra un cmd con permisos de administrador y escriba `mongod`

### Instrucciones

Clonar este repositorio y entrar a las carpetas `server` y `client` y ejecutar `npm install` o `yarn install` en cada carpeta para instalar las dependencias.


Levantar el servidor con el comando `npm run dev`

Levantar el cliente con el comando `npm run dev`

Al momento de levantar el cliente  asegurese de que el `localStorage` del navegador este limpio para que funcione correctamente la obtención del token del usuario.
También puede levantar la aplicación con el siguiente comando `npm run dev -p 8080` para saltarse el paso anterior.

#### Notas
* Por defecto la página principal muestra todos los productos.
* Solo los usuario logueados pueden agregar productos al carrito.
* Los usuarios con rol `ADMIN_ROLE` pueden editar la información de los productos.
* Los usuarios logueados pueden editar su información (a excepción de la contraseña) sin importar el rol que tengan.
* Los productos que ya no tengan stock disponible y esten agregados al carrito no se eliminaran automaticamente, pero no se le permite hace la compra de los productos.


Por defecto los usuarios son creados roles `ADMIN_ROLE` para cambiar el rol, ir al modelo user que se encuentra en la carpeta `server/models`. En el archivo `user.js` en la propiedad `role` modificarlo a `USER_ROLE`. Por el momento solo admite dos tipos de usuario.

Las imagenes de los productos son alojadas en Firebase Storage

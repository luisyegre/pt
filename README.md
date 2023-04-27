<h2>Configuracion</h2>
<p>
para configurar el proyecto basta con hacer <code>npm i</code>
para instalar las dependencias .<br>
luego haber iniciado mysql 
vericar en las variables de entorno 
las siguientes variables
#nombre de la base de datos
DB_NAME=pti
#usuario de la base de datos
DB_USER=root
#si no se define se sobre entiende que no hay contraseña
DB_PASSWORD=""

luego se deben ejecutar las migraciones de bases datos
<code>npm run db:sync</code>
</p>
<h2>iniciar proyecto</h2>
<p>
para inicar el proyecto hay que ejecutar dos comandos
<code>npm run build</code>
<code>npm start</code>
esto ejecutara el servidor en la ruta "http://localhost:8080"
</p>

<h2>Endpoints Doc</h2>
<p>
POST auth/sigin
-recive email,password
-retorna msg,token

POST auth/sigup
-recive email,password,name,password2
-retorna msg

POST user/items
-recive content
-retorna msg 


PUT user/items/:id
-recive content
-retorna msg

DELETE user/items/:id
-retorna msg


GET user/items
-retorna msg,data (lista de items que pertenecen al usuario)
</p>

<h2>Listener WebSocket</h2>
<p>
-server dashboard/join (hace que el usuario logeado entre al dashboard room)
-client dashboard/joined (notifica al usuario que entro al dashboard room)

-server dashboard/leave (hacer que el usuario abandone el dashboard room y se deconecte de la conexion sokcet)

-server dashboard/sync (sincroniza todos los cambios hechos hasta el modento con los demas usuario )
-client dashboard/sync (emite algun cambio para que los demas se sincronicen)
</p>
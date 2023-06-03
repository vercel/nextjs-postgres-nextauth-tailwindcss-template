<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
  <img alt="Shows all of the tools in the stack for this template, also listed in the README file." src="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Fitoregis</strong></div>
<div align="center">Registro de cuidados fitosanitarios</div>
<br />
<div align="center">
<a href="http://admin-dash-template.vercel.sh/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Características

- Framework - [Next.js 13](https://nextjs.org/13)
- Lenguaje - [TypeScript](https://www.typescriptlang.org)
- Autenticación - [NextAuth.js](https://next-auth.js.org)
- Base de datos - [PlanetScale](https://planetscale.com)
- Despliegue - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Estilos - [Tailwind CSS](https://tailwindcss.com)
- Componentes - [Tremor](https://www.tremor.so)
- Linting - [ESLint](https://eslint.org)
- Formateo - [Prettier](https://prettier.io)

## Cómo empezar

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto.git
   ```
   
2. Instala las dependencias:

   ```bash
    pnpm install
    ```
   
3. Después de crear una cuenta en PlanetScale, deberás crear una nueva base de datos y obtener la DATABASE_URL. Opcionalmente, puedes utilizar la integración de Vercel, que agregará la DATABASE_URL a las variables de entorno de tu proyecto.

4. Este es el archivo .env.local.example proporcionado, que deberás utilizar para crear tu propio archivo .env.local:

```dotenv
DATABASE_URL=url_mysql
# URL base para la autenticación con NextAuth.js
NEXTAUTH_URL=http://localhost:3000
# Clave secreta para NextAuth.js (genera una nueva clave en https://generate-secret.now.sh/32)
NEXTAUTH_SECRET=clave_secreta_generada

# Configuración de autenticación con Google
GOOGLE_ID=ID_de_tu_aplicación_de_Google
GOOGLE_SECRET=Clave_secreta_de_tu_aplicación_de_Google

EMAIL_VALID=email_autorizado
EMAIL_ADMIN=email_admin
```

Asegúrate de reemplazar ID_de_tu_aplicación_de_Google y Clave_secreta_de_tu_aplicación_de_Google con los valores correctos de tu proyecto de Google.

5. Dentro de PlanetScale, crea las tablas necesarias.

```
CREATE TABLE `productos` (
	`id` int NOT NULL AUTO_INCREMENT,
	`composicion` varchar(255),
	`nombre` varchar(255) NOT NULL,
	`tipo` varchar(255),
	`grupo` varchar(255),
	`para` varchar(255),
	`dosis` varchar(255),
	`cuando` varchar(255),
	`cultivo` varchar(255),
	`ps` varchar(255),
	`notas` mediumtext,
	PRIMARY KEY (`id`)
) 

CREATE TABLE `tratamientos` (
		`id` int NOT NULL AUTO_INCREMENT,
	`productoid` int NOT NULL,
	`cultivo` varchar(255),
	`fecha` date,
	`para` varchar(255),
	`dosis` varchar(255),
	`siguiente` varchar(255),
	`aclaraciones` varchar(255),
	PRIMARY KEY (`id`)
) 
```

6. Finalmente, inicia el servidor de desarrollo:

```
pnpm install
pnpm dev
```

7. Abre tu navegador web y accede a http://localhost:3000 para ver la aplicación en funcionamiento.

## Licencia

Este proyecto se encuentra bajo la licencia MIT.
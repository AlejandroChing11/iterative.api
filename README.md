<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
    
## Descripción

Prueba para desarrollador backend donde se solicitó un aplicativo xyz para realizar publicaciones y comentarios.

## Pasos para correr el proyecto en local

1. El primer paso es clonar el proyecto en tu maquina local desde github

```bash
git clone https://github.com/AlejandroChing11/iterative.api.git
```

2. Ya teniendo el proyecto localmente lo primero que debemos hacer es difinir nuestras variables de entorno .env, en el proyecto hay un archivo que se llama .env.template. Renombralo a .env y cambia las variables a tu caso.

```
  .env.template
```

3. Ya teniendo las variables de entorno listas, debemos ejecutar el siguiente comando para instalar todas las dependencias del proyecto.

```bash
  yarn
```

o si usas npm

```bash
  npm install
```

4. Luego de la instalacion de las variables debemos levantar la base de datos, la cual está siendo virtualizada con docker para mayor comodidad.

```bash
  docker compose up -d
```

esto será para levantar la base de datos y además instalara la imagen de postgres si no lo tiene localmente. Usualmente tarde de entre a 5 a 10 minutos.

## Running the app

```bash
# development
# watch mode
$ yarn start:dev

## Contacto

Si en algun momento algo llega a fallar aquí están mis contactos directos:

alejandroching2004@hotmail.com

```

## Documentacion grafica

```
  localhost:3000/api/docs
```

Aqui se lograrán ver de una manera un poco más grafica los endpoint, los dto's y las respuestas

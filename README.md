# Base project express + Sequelize

## Routers User

### Public routers
> Open routers

`POST`  /user/login

`POST`  /user/register
### Autenticated Routers 
> Need auth bearer token

`GET`   /user/me 

`PUT`   /user/me

`DELETE`  /user/me

`POST`  /user/logout

### Admin routers
> Need Auth token and Admin Role

`GET`   /user 

`POST`  /user 

`PUT`   /user/:id

`DELETE` /user/:id

`GET`   /user/count

`GET`   /user/:id

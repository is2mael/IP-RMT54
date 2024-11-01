# API Documentation

## Endpoints

### Public Endpoints

- `POST /register`
- `POST /login`
- `POST /login/google`

### Protected Endpoinst

- `GET  /favorites`
- `POST /favorites
- `DELETE /favorites/:id`
- `PATCH /user/:id/imgUrl`

## ENDPOINT PUBLIC

### 1. `POST /register`

**Description**

- Enpoint untuk mendaftarkan user baru dengan email dan password.

Request:

- `body`:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "imgUrl": "string"
}
```

Response:

- `201 - Created`:

```json
{
 {
    "id": 1,
    "username": "kukuru",
    "email": "kuku@mail.com"
}
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "Internet Server Error"
}
```

### 2. `POST /login`

**Description**

- Edpoint untuk Autentikasi User dan mendapatkan token.

Request:

- `body`:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "access_token": "string"
}
```

- `400 - Bad Request`:

```json
{
  "message": "Please input your email correctly"
}
```

or

```json
{
  "message": "Please input your password correctly"
}
```

- `401 - Unauthirized`:

```json
{
  "message": "Email or Password wrong"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "Internet Server Error"
}
```

### 3. `POST /login/google`

**Description**

- Endpoint untuk Authentikasi lewat Google akun.

Request:

- `body`:

```json
{
  "googleToken": "string"
}
```

Response:

- `200 - OK`:

```json
{
  "access_token": "string"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "Internal Server Error"
}
```

### 4. `GET /favorites`

**Description**

- Endpoint ini digunakan untuk melihat semua data favorite

Response:

- `200 - OK`:

```json
{
  "id": 9151277,
  "webformatURL": "https://pixabay.com/get/gfafbac6fdbb3ea17f1bbb18f4150b569e834be18666b1820bfeb3b83780e03fac076c26d3928ac7e7ef22292fe27263f4b2c9dc46bbe87e4267b344b62e9fde4_640.jpg",
  "views": 1265,
  "likes": 31
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "Internal Server Error"
}
```

### 5. `POST /favorites`

**Description**

- Endpoint untuk membuat sebuah data favorites

Request:

- `params`

```json
{
  "userId": "req.user.id"
}
```

- `body`

```json
{
  "id": "integer",
  "webformatURL": "string",
  "views": "integer",
  "likes": "integer"
}
```

Response:

- `200 - OK`:

```json
{
  "data": {
    "id": "integer",
    "webformatURL": "string",
    "views": "integer",
    "likes": "integer"
  }
}
```

- `500 - Internal server Error`:

```json
{
    "message": "Internal server Error"
}
```

### 6. `DELETE /favorites/:id`

**Description**

- Endpoint untuk mengahpus favorite dari daftar favorite

Request:

- `params`:

```json
{
    "id": "integer"
}

Response:

- `200 - OK`:

```json
{
    "message": "Favorite deleted successfully"
}
```

- `400 - Bad Response`:

```json
{
    "message": "validation errors"
}
```

- `500 - Internal Server Error`

```json
{
    "message": "Internal Server Error"
}
```

### 7. `PATCH /user/:id/imgUrl`

**Description**

- Endpoint ini digunakan user yang sudah login untuk merubah mengganti foto yang diinginkan

Request:

```json
{

}
```

Response:

- `200 - OK`:

```json
{
    "message": "Profile image updated successfully",
    "user": {
        "id": 1,
        "username": "kukuru",
        "email": "kuku@mail.com",
        "password": "$2a$05$M0sstYmak.e/c.ZT9IhUjOqR20a4v4yz4Xww0.NZRhtdorIRvReEC",
        "imgUrl": "https://res.cloudinary.com/dgtcghdzs/image/upload/v1730347965/Random/User_1.jpg",
        "createdAt": "2024-10-30T15:22:12.654Z",
        "updatedAt": "2024-10-31T04:12:45.883Z"
    }
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server Error"
}
```
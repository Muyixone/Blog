# A Blogging API

> Blogging API

An API that performs basic CRUD operations, using express-JWT(JasonWebToken) for authentication

## Requirements

    1. The API must be able to register new users and login old users
    2. Old users must be authenticatedusing JWT, before being able to access private routes
    3. Authenticated users should be able to create a new blog article, delete blog posts and update blog posts.
    4. Users' should be able to get all published blogs(logged-in or not)
    5. Users' email must be unique

## Models

---

#### User

| field      | data_type | constraint       |
| ---------- | --------- | ---------------- |
| first_name | string    | required         |
| last_name  | string    | required         |
| email      | string    | required, unique |
| password   | string    | required         |

#### Blog

| field      | data_type | constraint       |
| ---------- | --------- | ---------------- |
| first_name | string    | required         |
| last_name  | string    | required         |
| email      | string    | required, unique |
| password   | string    | required         |

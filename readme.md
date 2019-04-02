# Express Server API

This is a simple API for educational purposes

## Install and Configuration

Before start you need to rename `.env.sample` to `.env` and modify the env
variable called `DATABASE` with your database url.

```
NODE_ENV=development
DATABASE=mongodb://localhost:27017/<DBname>
```

In terminal run `npm install` in order to install all the dependencies. Once all
the dependencies are installed type `npm start`.

Now you server is running in `http://localhost:5000`.

```bash
$ npm install
$ npm run dev
```

## Routes

| URL               | HTTP verb | Request body | Action                      |
| ----------------- | --------- | ------------ | --------------------------- |
| `/api/phones`     | GET       | (empty)      | Returns all the phones      |
| `/api/phones`     | POST      | JSON         | Add a new phone             |
| `/api/phones/:id` | GET       | (empty)      | Returns the specified phone |
| `/api/phones/:id` | PUT       | JSON         | Edits the specified phone   |
| `/api/phones/:id` | DELETE    | (empty)      | Deletes the specified phone |

## Phone Model

The phone model has the following structure that you will pass into the body

```json
{
  "brand": "Nokia",
  "name": "3310",
  "image": "http://placekitten.com/200/300",
  "specs": ["barato", "bonito", "vintage"]
}
```

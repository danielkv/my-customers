# My Customers

Simple project listing customers and its location. `Backend` was develop on `NodeJS` on top of `ExpressJs` lib and Frontend was develop on top of `NextJS`

## Table of contents

-   [My Customers](#my-customers)
    -   [Table of contents](#table-of-contents)
    -   [How to run this project](#how-to-run-this-project)
    -   [Run tests](#run-tests)
    -   [Dashboard](#dashboard)
    -   [API Documentation](#api-documentation)
        -   [REST API](#rest-api)
            -   [Endpoints](#endpoints)
        -   [GraphQL API](#graphql-api)
            -   [Endpoint](#endpoint)
            -   [Query](#query)
            -   [Types](#types)
            -   [Input](#input)

## How to run this project

This project uses **docker** and **docker-compose** to run.

Run in your **terminal**:

```
git clone https://github.com/danielkv/my-customers.git my-customers
cd my-customers
docker-compose up
```

The **dashboard** should be running on `https://localhost:3000` and the **server API** on `https://localhost:3001`

## Run tests

To run tests, you just need to run this line in the **terminal** in the root folder of repository

With yarn:

```
yarn test
```

With npm:

```
npm run test
```

## Dashboard

The dashboard was build on top of **NestJS**. The built in routes API improved the development

## API Documentation

The backend was build on top of **ExpressJS** with **Typescript**.

### REST API

Base URL

> `https://localhost:3001/`

#### Endpoints

Find many cities

```
GET /cities
```

| Query Param | Type     | Required | Default     | Description                |
| ----------- | -------- | -------- | ----------- | -------------------------- |
| offset      | `number` | No       | `undefined` | Pagination cursor          |
| limit       | `number` | No       | `undefined` | Number of rows to retrieve |

**Response** \
The response returns 2 objects: **items** and **pageInfo**

<details>
	<summary><b>response</b>: the response from server</summary>
	<p>

    {
    	items: array of cities
    	pageInfo: pagination details
    }

</p>

</details>

<details>
	<summary><b>items</b>: cities list</summary>
	<p>

    items: [
    	{
    		city: "Warner, NH",
    		customers_total: 20
    	},
    	{
    		city: "East Natchitoches, PA",
    		customers_total: 20
    	},
    	...
    ]

</p>

</details>
<details>
	<summary><b>pageInfo</b>: pagination details</summary>
	<p>

    pageInfo: {
    	itemsTotal: 50,
    	offset: 0,
    	limit: 10
    }

</p>

</details>
<br>

**Example**

`GET /cities?offset=0&limit=10`

---

Search 1 city

```
GET /city
```

| Query Param | Type     | Required | Default | Description                                 |
| ----------- | -------- | -------- | ------- | ------------------------------------------- |
| search      | `string` | Yes      | --      | It'll search for the city in the repository |

**Response** \
The response returns 1 object: the city object

<details>
	<summary><b>response</b>: city found</summary>
	<p>
    	
	{
		city: "Warner, NH",
		customers_total: 20
	}

</p>

</details>
<br>

**Example**

`GET /city?search=warner`

---

Find many customers

```
GET /customers
```

| Query Param | Type     | Required | Default     | Description             |
| ----------- | -------- | -------- | ----------- | ----------------------- |
| city        | `string` | No       | `undefined` | Filter customer by city |
| offset      | `number` | No       | `undefined` | Pagination start cursor |
| limit       | `number` | No       | `undefined` | Customers per page      |

**Response** \
The response returns 2 objects: **items** and **pageInfo**

<details>
	<summary><b>response</b>: the response from server</summary>
	<p>

    {
    	items: array of customers
    	pageInfo: pagination details
    }

</p>

</details>

<details>
	<summary><b>items</b>: customers list</summary>
	<p>

    items: [
    	 {
            id: 255,
            first_name: "Craig",
            last_name: "Miller",
            email: "cmiller72@bbb.org",
            gender: "Male",
            company: "Wikizz",
            city: "Conyersville, AZ",
            title: "Associate Professor",
            lat: 36.4497784,
            long: -88.29420739999999
        },
        {
            id: 305,
            first_name: "Sara",
            last_name: "Edwards",
            email: "sedwards8g@themeforest.net",
            gender: "Female",
            company: "Dabtype",
            city: "Conyersville, AZ",
            title: "Marketing Assistant",
            lat: 36.4497784,
            long: -88.29420739999999
        },
    	...
    ]

</p>

</details>
<details>
	<summary><b>pageInfo</b>: pagination details</summary>
	<p>

    pageInfo: {
    	itemsTotal: 50,
    	offset: 0,
    	limit: 10
    }

</p>

</details>
<br>

**Example**

`GET /city?search=warner`

---

Find customer by id

```
GET /customer/:customerId
```

| Param      | Type     | Required | Default | Description |
| ---------- | -------- | -------- | ------- | ----------- |
| customerId | `string` | Yes      | --      | Customer ID |

**Response** \
The response returns 1 object: the customer object

<details>
	<summary><b>response</b>: city found</summary>
	<p>
    	
	{
		id: 305,
		first_name: "Sara",
		last_name: "Edwards",
		email: "sedwards8g@themeforest.net",
		gender: "Female",
		company: "Dabtype",
		city: "Conyersville, AZ",
		title: "Marketing Assistant",
		lat: 36.4497784,
		long: -88.29420739999999
	}

</p>

</details>
<br>

**Example**

`GET /customer/305`

### GraphQL API

The GraphQL API was created on top of **Apollo Server** with **TypeGraphQL**. It works with decorators to build the schema.

#### Endpoint

```
POST /graphql
```

#### Query

```graphql
type Query {
    findOneCity(search: String!): City!
    findManyCities(limit: Float, offset: Float): CityList!
    findOneCustomer(customerId: Float!): Customer!
    findManyCustomers(limit: Float, offset: Float, filter: CustomerFilter): CustomerList!
}
```

#### Types

```graphql
type Customer {
    id: Float!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    company: String!
    city: String!
    title: String!
    lat: Float
    long: Float
}

type City {
    city: String!
    customers_total: Float
}

type CityList {
    items: [City!]!
    pageInfo: PageInfo!
}

type CustomerList {
    items: [Customer!]!
    pageInfo: PageInfo!
}

type PageInfo {
    itemsTotal: Float
    limit: Float
    offset: Float
}
```

#### Input

```graphql
input CustomerFilter {
    city: String
}
```

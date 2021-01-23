# My Customers

Project made for interview test

## Table of contents

- [My Customers](#my-customers)
	- [Table of contents](#table-of-contents)
	- [How to run this project](#how-to-run-this-project)
	- [API Documentation](#api-documentation)
		- [REST API](#rest-api)
			- [Endpoints](#endpoints)
		- [GraphQL API](#graphql-api)

## How to run this project

This project uses **docker** and **docker-compose** to run.

Run in your **terminal**:

```
git clone https://github.com/danielkv/my-customers.git my-customers
cd my-customers
docker-compose up
```

The **dashboard** should be running on `https://localhost:3000` and the **server API** on `https://localhost:3001`

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

This api is in development

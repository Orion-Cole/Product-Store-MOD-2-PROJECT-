<h1 align="center">Welcome to product_store_mod2 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Orion-Cole/Product-Store-MOD-2-PROJECT-/blob/master/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Module 2 project - A mockup of a webstore that interacts with MongooseDB

### 🏠 [Homepage](https://github.com/Orion-Cole/Product-Store-MOD-2-PROJECT-)

## Install

<!-- ```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test -->
```

## Author

👤 **Orion Cole**

* Github: [@Orion-Cole](https://github.com/Orion-Cole)
* LinkedIn: [@Orion Cole](https://linkedin.com/in/Orion Cole)

## Tech Stack:

-JavaScript
-HTML
-CSS
-MongoDB
-Express
-Node

## Project Details:

### Minimum Viable Product (Mandatory Features)

### Pages:

1. HOME page (index):
   - All the products are displayed.
   - The user can visit each product from here.
   - If the user clicks on the image, it links to the PRODUCT page.
   - There is a link to add a new product.
2. PRODUCT page:
   - Shows specific product and it’s details.
   - Has a link back to the HOME page.
   - Has a link to edit the product that goes to the EDIT page.
   - Has a delete button that deletes that specific product.
   - The user can also search for a specific product from this page.
   - Clicking the buy button should lower the remaining inventory by 1.
   - If the quantity of the product is zero, its product page should say 'OUT OF STOCK' instead of saying how many are remaining.
   - The BUY button should not be rendered if the product is out of stock.
3. EDIT page:
   - Allows the user to edit the data of a specific product using it’s product ID.
4. CREATE page:
   - Allows for the creation of new products (users will include a URL for the image).

### Redirects:

1. The create route should redirect to HOME after creation
2. The delete route should redirect to HOME after deletion
3. The edit route will redirect to the edited product's PRODUCT page after the object is changed in your collection.

### Routes:

1. /get_products - responds with all products in your collection
2. /get_specific_product/:product_id - responds with one specific product from your collection
3. /create_product - uses information from req.body to make a new product in your collection
4. /delete_product/ - The product ID should be included in the URL as a query. Example: /delete_product/?productId=63cd55e8b260470b1c1f2cc0
5. /update_product - uses information from req.body to update the specific product

## Technical Requirements:

1. Your app MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong
2. Must contain all listed Routes.
3. Must be styled and look like a store.
4. You MUST have a well documented README file in your repo. PLEASE add this README.md file on your own NOT through GitHub…
    - Good example of a README: https://github.com/chroline/well_app#readme
5. In lieu of presentations, you MUST create a video (on YouTube, Vimeo, etc...) of you showcasing your application and code. This video needs to be in your README file, and

## Additional Project Features (Bonus!):




## Show your support

Give a ⭐️ if you like this project!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
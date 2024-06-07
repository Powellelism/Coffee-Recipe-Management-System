Coffee management system full stack conversion

## Changes

- Added the backend server
- Moved everything from the past repo to the backend server
- Added login and sign up functionality but no final pages
- Added authentication middleware which should be used to add authentication to routes with cookies
- Added the connection to supabase
- Added prisma for ORM

## How to get started

- Run npm install in source folder
- Copy the .env.example file and rename it to .env
- Add the supabase url and key to the .env file
- Run npm run start in source folder
- Go to localhost:3000 to see the website

## What's next

- Add the login and sign up pages
- Add the authentication by completing the middleware
- Add the ability to save recipes to the database
- Add the ability to save stores to the database

## How to test API

- Make get request to localhost:3000/api/get/recipes to get all recipes
- Make post request to localhost:3000/api/post/recipes to add a recipe using following curl
  ````bash
  curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Iced Vanilla Latte",
  "description": "A refreshing iced latte with vanilla syrup",
  "foodId": 3,
  "ingredients": ["Espresso", "Milk", "Ice", "Vanilla Syrup"],
  "size": "LARGE",
  "instructions": "1. Pull espresso shots\n2. Add vanilla syrup\n3. Pour cold milk\n4. Add ice\n5. Stir well",
  "totalTime": 5,
  "userID": "85087d23-f95a-4ff3-b8fc-bedeedc61d74"
  }' http://localhost:3000/api/post/recipe```
  ````
- Make get request to localhost:3000/api/get/stores to get all stores

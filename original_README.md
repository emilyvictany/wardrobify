# Wardrobify

Team:

* Emily Yim - Hats
* Brian La - Shoes

## Design

## Shoes microservice

The Shoes microservice will poll data from the wardrobe_api Bin Model. It will then use that data to create a BinVO model to allow us to locate where the shoe is placed in which bin and which closet.

## Hats microservice

For backend, created a Hat model and LocationVO model with relevant attributes (i.e. fabric, style, color, picture, location for Hat model). Implemented a poller to pull Location data from the Wardrobe API, which is then integrated with the Hats microservice LocationVO model. Created React components for frontend to allow user to add a hat, delete a hat, and view all hats that are stored in the database.

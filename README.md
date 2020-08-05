# educonnections

[educonnections](https://educonnections.ca) is a social media platform that matches you with other students at your university based on common artists, classes, likes, and songs from services like Facebook, Spotify, and UBC SSC.

___


## Our Mission

**Problem:** Canadian universities today accept students from hundreds of countries around the world. New students often have trouble meeting people, and the majority of students don't until they arrive on campus the first day. 

**Our Platform**: educonnections helps students meet online by matching with each other based on common Facebook likes, Spotify artists and songs, and UBC classes.

___

## Members

| Member          | CS ID   | Email |
|:-|:-|:-|
| Allan Ting      | u2z9a   | allantingca@live.ca       |
| Eduardo Garza   | r1v0b   | eduardo@garza.ca          |
| Ismail Mourad   | e5w2b   | iswmourad@hotmail.com     |
| Title Jirakul   | i5i8    | watsapol555@hotmail.com   |

## Version Control

- Client Repository: [436I-client](https://github.com/eduardocgarza/436I-client)
- Server Repository: [436I-server](https://github.com/eduardocgarza/436I-server)

___

## Platform Features

- Account Creation
- Integration of third-party accounts, including Facebook and Spotify
- UBC SSC calendar integration
- Customized matches based on the **educonnections matching algorithm**
- View courses and classmates, view matches, view profiles

___

## Data Collection

educonnections stores user data from the following services and providers:

### Facebook

- Name, image URL, date of birth, cities visited, and cities lived in
- Pages liked, and groups joined

### Spotify

- Display name, email, number of followers, image URL, country
- A user's top artists
- A user's top songs (tracks)

### UBC

- A user's list of courses, with department, section, and time

### + Data Opt-in Benefits

The app is a facilitator for people to match with each other based on common interests. With the built-in APIs of various services, we hope to make connecting with people “one click away”
Users will be able to click links that will take them to the applications they have integrated and initialize conversations on there.

### - Data Opt-out & Deletion

Our platform will allow users to delete their data at any point. Once your data is deleted in the client, it will also be deleted in our servers and databases. No existing copy with remain. Be aware that by deleting data, you may lose matches that you had before.

___

## Project Requirements

### Client Tasks

Our team managed the client-related tasks through Github. Click [here](https://github.com/eduardocgarza/client-436i/projects/1) to see the **Client Project Board** (below).

![clientTasks](/docs/assets/clientTasks.png)

### Server Tasks

Our team managed the server-related tasks through Github. Click [here](https://github.com/eduardocgarza/server-436i/projects/1) to see the **Server Project Board** (below).

![serverTasks](/docs/assets/serverTasks.png)

### View Project Requirements

Please click [here](https://github.com/eduardocgarza/server-436i/blob/master/docs/PROJECT_REQUIREMENTS.md) to see a full list of our project requirements (minimal, standard, stretch).

___

## Tech Used 

Javascript / Typescript

We used Typescript and React-Typescript for this project. The development experience was much smoother as it allowed us to strongly type and enforce the structure of data moving inside and outside our server. Integration of the front-end and back-end was simpler as we knew what to expect between the client and server. The downside is the extra work needed by our team in planning and coding. This came in the form of considering what data we needed to move around; as well, it required us to build these Objects/Interfaces to enforce these structures.

React / React-hooks

MongoDB
Early on in our project, we had a goal of building a matching algorithm based on hobbies. Along the way, we learned that our database schema would play a large role in the success of this algorithm. The end result of our schema essentially writes any incoming data twice. Once in the Account collection and once in the Hobby collection. For example, consider that user X likes Despacito. Our schema would store that X likes Despacito in X's account document, at the same time, the Despacito spotify_track document would store that the song is liked by X. 
The flexibility of NoSQL allowed us to build the database to our liking, which as described in the example above, involved some data duplication. This referencing allowed us to match users with similar users appropriately. A typical SQL database might have more difficulty in achieving this due to the traditional constraints that a SQL database imposes like Key constraints, etc.

Heroku

Node / Express

___

## Above and Beyond

___

## Next Steps

UI/UX

More Functionalities

More Integrations

___

# Extras 
___

## API Documentation

Our application is built in three layers:

1. Client application (React)
2. Server application (Node)
3. Database application (Mongo)

The server is designed as a REST API with endpoints that return data back to the client application. The REST API base URL is `https://api.educonnections.ca/`.

![api](/docs/assets/apiDocumentation.png)

### View API Documentation

Click [here](https://github.com/eduardocgarza/server-436i/blob/master/docs/API.md) to see the full documented **educonnections API**.

___

## Prototypes

We have a Figma project set up. We used this to build our vision of what we wanted the front end app to look like. 

Click [here](https://www.figma.com/file/oiIWgoWzIHamqnbqVc6KMo/Friendly?node-id=0%3A1) for a read-only view of our prototype.

We envisioned four main modules to the front end of the application. 
1. A place for users to upload their course information and view classmates
2. A place for users to see all of their matches and find out common information/hobbies
3. A place for users to decide which integrations to provide (Spotify, Facebook, Instagram, etc.) and to deauthorize permissions when they want
4. A place for users to view each other's profiles as well as their own

___


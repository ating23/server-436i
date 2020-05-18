# Project Progress after Workshop 1

| Member  | CS ID  | e-mail |
|---|---|---|
| Allan Ting  | u2z9a | allantingca@live.ca |
| Eduardo Garza  | r1v0b  | eduardo@garza.ca |
|  Ismail Mourad |  e5w2b | iswmourad@hotmail.com |
| Title Jirakul | i5i8 | watsapol555@hotmail.com |

Repository
Client: https://github.com/eduardocgarza/436I-client
Server: https://github.com/eduardocgarza/436I-server

## Project Description
For our project is centered around the following problem: 
New students accepting offers at universities from countries worldwide often encounter problems meeting people. Facebook has helped facilitate this through the use of Facebook Groups for each class year, but this attempt is very limited in its functionality. Once a post makes its way down the timeline, it never sees the top unless it is specifically searched for. 

In an attempt to create a better experience for new students, we are proposing a web app that would integrate to various social media platforms, pulling data and interests from each about an individual, and using a matching algorithm to find individuals with common interests.
 
### Who is it for?
University students (from UBC); primarily in first year, but also available and useful for students in other years

## What will it do? (What "human activity" will it support?)
* Signup 
* Create an account with (email, password)
* Integrate social media accounts
* Allow access to Facebook, Instagram, Spotify, Snapchat, etc. (social media) accounts
* Import class calendar
* Import UBC calendars from UBC SSC to better match with people in their classes
* View matches
* View students with common interests

## What type of data will it store?
From the various platforms, we hope to store the following data to feed the matching algorithm:
### Facebook
* Name, profile image, date of birth, cities visited or lived in
* Pages and groups liked and joined
* A list of their friends
### Instagram
* Instagram username
* Some of their top-liked photos
* A list of their followers
* A list of accounts they follow (personal and business)
* Geolocation of their photos?
### Snapchat
* Their snapchat username and score
### Spotify
* Their top played songs
* A list of artists they follow
* list of people that follow them
### Reddit?
* Their followed subreddits
* the subreddit they comment/participate in the most

### What will users be able to do with this data?
The app is a facilitator for people to find each other. With the built-in APIs of various services, we hope to make connecting with people “one click away”
Users will be able to click links that will take them to the applications they have integrated and initialize conversations on there.

### What is some additional functionality you can add/remove based on time constraints?
The matching algorithm will be difficult to maintain efficient as the user base grows, since each user must be continuously compared against every other one
APIs can vary in their complexity for integration. Therefore, the application might require more work for a specific integration than another.

## Project Task Requirements
### Minimal Requirements (will definitely complete)
#### Account
* Signup and Login via email and password
* Reset password
* Social Media Integration
#### Facebook API
* Be able to integrate with Facebook API at the minimum pulling important info like city, hometown, likes
* Main social features
#### Import .ics calendar (UBC classes)
* Page to display/view calendar
* Have a unique page for each class to see other members
* For example, if a user has a CPSC 304 class, we will create a page named CPSC 304 where all students in that class will show up
### Standard requirements (will most likely complete)
#### Account
* Signup via Facebook/Google accounts so users are not required to create an account specifically with us
* Profile pages per user with info about me (Roles: Me, Public)
#### Social Media Integration
Include more integrations, specifically
* Instagram 
* Spotify
#### Main social features
* Chat feature with people and/or in class pages
* Housing list (which building I’m in)

### Stretch Requirements (plan to complete 1!)
#### Account	
* Auto-generated profile summary (about me page)
* Social media integration
Add one more: { Snap, Reddit }
Main social features
Create community pages
UBC Club list integration
Varsity teams, sports rec leagues, etc.

## Task Breakdown

### Account
#### Client 
* Create UI form for signup
* Email field
* Password field
* Create UI validation before submit
* Create network layer for sending/receiving API calls to/from server
* Create memory storage layer with Redux for app state
#### Server
* Create signup handler
* Create signup validator (server)
* Express-validator (https://express-validator.github.io/docs/)
* Connect mongodb with express for storing on db
* Send back access token with JSONWebtoken (https://github.com/auth0/node-jsonwebtoken)
#### Database
* Create account schema
* Store in database and generate automatic PK

### Social Media Integration
* Implement Facebook Log In API
* Obtain an access token for Facebook API
* Store token safely in ENVIRONMENT VARIABLES (server-side)
* Extract and store basic user information from their Facebook account (e.g. name, hometown, date of birth, profile picture)

### Main social features
* Import calendar (UBC classes)
* Provide user interface to attach ics file
* Read file and build schedule for each user based on the ics file they attach
* Provide user interface that shows their calendar in a viewable format
* Create a page for every unique class found

## Prototypes  

Page for all the classes we will create. Users would see the classes they are in and they can click in to see the other profiles or users that exist in the chosen class.

The class page, users would see all the other profiles in this class. Afterwards, they can interact with them either via chat or view another user’s profile page.

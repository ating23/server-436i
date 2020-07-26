___

# Home - README

Click [here](https://github.com/eduardocgarza/server-436i/blob/master/README.md) to return back to the `README.md` document

___

# Project Task Requirements

[educonnections](http://educonnections.ca/) will release features with Agile princinples in mind on a continuous basis, each time adding new functionality for all users. Below is a detailed description of the features we intend to deploy over three stages:

**Stages:**

1. Minimal
2. Standard
3. Stretch

**Each stage includes**

1. Account (features)
2. Social (features)
3. App Functionality (features)

___

## Minimal Requirements

### 1. Account Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✓</td>
      <td>Account Creation</td>
      <td>
        - Account signup (email, password) <br/>
        - Account login (email, password) <br/>
      </td>
    </tr>
  </tbody>
</table>

### 2. Social Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✓</td>
      <td>Facebook API</td>
      <td>
        - Be able to integrate with Facebook API at the minimum pulling important info like city, hometown, likes</br>
        - Main social features
      </td>
    </tr>
  </tbody>
</table>


### 3. App Functionality 

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✓</td>
      <td>UBC Calendar</td>
      <td>
        - Import .ics calendar (UBC classes) <br/>
        - View courses and classmates <br/>
        - View classmates basic info and profile URL
      </td>
    </tr>
  </tbody>
</table>

___

## Standard Requirements

### 1. Account Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✕</td>
      <td>Account</td>
      <td>
        - Forgot password (email verification) <br/>
        - Reset password (email verification) <br/>
      </td>
    </tr>
    <tr>
      <td>✓</td>
      <td>Profile</td>
      <td>
        - View my profile and view profile of other users (roles: me/public)
      </td>
    </tr>
    <tr>
      <td>✓</td>
      <td>Settings</td>
      <td>
        - Set-up UI for social media integrations
      </td>
    </tr>
  </tbody>
</table>

### 2. Social Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✓</td>
      <td>Spotify API</td>
      <td>
        - Be able to integrate with Spotify API, pulling a user's artists and tracks</br>
      </td>
    </tr>
  </tbody>
</table>

### App Functionality Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✕</td>
      <td>Chat</td>
      <td>
        - Chat feature with people and/or in class pages
      </td>
    </tr>
    <tr>
      <td>✕</td>
      <td>Housing List</td>
      <td>
        - Housing list (which building I’m in)
      </td>
    </tr>
  </tbody>
</table>

___

## Stretch Requirements

### 1. Account Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>Profile Summary</td>
      <td>
        - Create an auto-generated profile summary (about me)
      </td>
    </tr>
  </tbody>
</table>

### Social Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✕</td>
      <td>Reddit</td>
      <td>
        - Be able to integrate with Reddit API, pulling a user's subreddits, score, and basic data</br>
      </td>
    </tr>
    <tr>
      <td>✕</td>
      <td>Snapchat</td>
      <td>
        - Be able to integrate with Snapchat API, pulling a user's score, contacts, and top streaks</br>
      </td>
    </tr>
  </tbody>
</table>

### App Functionality Features

<table>
  <thead>
    <tr>
      <th>☐</th>
      <th>Feature</th>
      <th>Todos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✕</td>
      <td>Community Pages</td>
      <td>
        - View and join community pages for UBC clubs <br/>
        - View and join varsity teams, sports rec leagues, and more
      </td>
    </tr>
  </tbody>
</table>

___

## Task Breakdown

### Client Tasks

Our team managed the client-related tasks through Github. Click [here](https://github.com/eduardocgarza/client-436i/projects/1) to see the **Client Project Board** (below).

![clientTasks](/docs/assets/clientTasks.png)

### Server Tasks

Our team managed the server-related tasks through Github. Click [here](https://github.com/eduardocgarza/server-436i/projects/1) to see the **Server Project Board** (below).

![serverTasks](/docs/assets/serverTasks.png)

___

## Detailed Task Breakdown

### Account

#### Client 

- Create UI form for signup
- Email field
- Password field
- Create UI validation before submit
- Create network layer for sending/receiving API calls to/from server
- Create memory storage layer with Redux for app state

#### Server

- Create signup handler
- Create signup validator (server)
- Express-validator (https://express-validator.github.io/docs/)
- Connect mongodb with express for storing on db
- Send back access token with JSONWebtoken (https://github.com/auth0/node-jsonwebtoken)

#### Database

- Create account schema
- Store in database and generate automatic PK

### Social Media Integration

- Implement Facebook Log In API
- Obtain an access token for Facebook API
- Store token safely in ENVIRONMENT VARIABLES (server-side)
- Extract and store basic user information from their Facebook account (e.g. name, hometown, date of birth, profile picture)

### Main social features

- Import calendar (UBC classes)
- Provide user interface to attach ics file
- Read file and build schedule for each user based on the ics file they attach
- Provide user interface that shows their calendar in a viewable format
- Create a page for every unique class found


# API Reference


## Objects

## Access Token Objects

**Header Fields**

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |

**Example Header**

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### Error Objects

**Response Body**

```js
{
  error: "This is the error message to display to the user."
}
```

## Spotify Objects


### User Object <a name='SpotifyObject'> </a>

##### Object Format

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| accessToken | `string` | The User's JWT token so that we can access their Spotify Info |
| refreshToken | `string` | Refresh token for the above Spotify JWT token |
| spotifyId | `string` | User's spotify username |
| displayName | `string` | User's spotify username |
| email | `string` | User's spotify email |
| url | `string` | URL to the Spotify profile |
| followers | `number` | Number of followers on user's Spotify profile |
| image | `Object` | An object with fields: Height, Width, Url and _id (our mongodb ID) |
| country | `string` | If exists, User's country on Spotify |
| [artists](#artists) | `Object[]` | User's top 10 artists |
| [tracks](#tracks) | `Object[]` | User's top 25 tracks. |

** Example Body**
```js
{
  "$init": true,
  "accessToken": "",
  "refreshToken": "",
  "spotifyId": "helloWorld",
  "displayName": "helloWorld",
  "email": "helloworld@gmail.com",
  "url": "https://open.spotify.com/user/helloworld",
  "followers": 18,
  "image": {
      "_id": "5f14ee02182cd43318eda7f6",
      "height": null,
      "url": "https://i.scdn.co/image/ab6775700000ee852870f7611c845b919f68dd18",
      "width": null
  },
  "country": null,
  "artists": [
      {
          "accounts": [
              "5f14ecfa182cd43318eda6ec",
              "5f14ef55c52fd51d980dbea0",
              "5f14f2f6f607f94720fd2365"
          ],
          "genres": [
              "edm",
              "pop",
              "tropical house"
          ],
          "_id": "5f14ed89182cd43318eda720",
          "spotifyId": "23fqKkggKUBHNkbKtXEls4",
          "name": "Kygo",
          "popularity": 90,
          "followers": 6519489,
          "image": {
              "_id": "5f14ed89182cd43318eda721",
              "height": 640,
              "url": "https://i.scdn.co/image/eee84c026e93f6d970fdc82c5010c45219530577",
              "width": 640
          },
          "url": "https://open.spotify.com/artist/23fqKkggKUBHNkbKtXEls4",
          "__v": 2
      },
      {
          "accounts": [
              "5f14ecfa182cd43318eda6ec",
              "5f14ef55c52fd51d980dbea0",
              "5f14f2f6f607f94720fd2365"
          ],
          "genres": [
              "bmore",
              "edm",
              "moombahton",
              "ninja",
              "pop"
          ],
          "_id": "5f14ed89182cd43318eda722",
          "spotifyId": "5fMUXHkw8R8eOP2RNVYEZX",
          "name": "Diplo",
          "popularity": 87,
          "followers": 2270522,
          "image": {
              "_id": "5f14ed89182cd43318eda723",
              "height": 640,
              "url": "https://i.scdn.co/image/72783f9135e197d828a8652bbf73eee3b408e380",
              "width": 640
          },
          "url": "https://open.spotify.com/artist/5fMUXHkw8R8eOP2RNVYEZX",
          "__v": 2
      },
      {
          "accounts": [
              "5f14ecfa182cd43318eda6ec",
              "5f14ef55c52fd51d980dbea0",
              "5f14f2f6f607f94720fd2365"
          ],
          "genres": [
              "edm",
              "electropop",
              "melodic dubstep",
              "pop",
              "tropical house"
          ],
          "_id": "5f14ed89182cd43318eda724",
          "spotifyId": "45eNHdiiabvmbp4erw26rg",
          "name": "ILLENIUM",
          "popularity": 80,
          "followers": 892195,
          "image": {
              "_id": "5f14ed89182cd43318eda725",
              "height": 640,
              "url": "https://i.scdn.co/image/13f93bc1aa54c82eb6deed1637b5049150cc9379",
              "width": 640
          },
          "url": "https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg",
          "__v": 2
      }
  ],
  "tracks": [
      {
          "accounts": [
              "5f14ecfa182cd43318eda6ec",
              "5f14ef55c52fd51d980dbea0",
              "5f14f2f6f607f94720fd2365"
          ],
          "_id": "5f14ed8a182cd43318eda752",
          "spotifyId": "6p8eEdiZLKJH8tcjGZuNTK",
          "name": "Run",
          "popularity": 76,
          "url": "https://open.spotify.com/track/6p8eEdiZLKJH8tcjGZuNTK",
          "image": {
              "_id": "5f14ed8a182cd43318eda753",
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2734896429a87abfacd5d90587b",
              "width": 640
          },
          "audioPreviewURL": "https://p.scdn.co/mp3-preview/8e62d2ceec0caec7865779e603158827cd1d9bb8?cid=3a22559fa1d84159977d6166a9b5eb75",
          "artists": [],
          "__v": 2
      },
      {
          "accounts": [
              "5f14ecfa182cd43318eda6ec",
              "5f14ef55c52fd51d980dbea0",
              "5f14f2f6f607f94720fd2365"
          ],
          "_id": "5f14ed8a182cd43318eda754",
          "spotifyId": "30EjmPhNzAdbx0cLAZnCa2",
          "name": "So Long",
          "popularity": 22,
          "url": "https://open.spotify.com/track/30EjmPhNzAdbx0cLAZnCa2",
          "image": {
              "_id": "5f14ed8a182cd43318eda755",
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2734c81385212bf1e78693bd18e",
              "width": 640
          },
          "audioPreviewURL": null,
          "artists": [],
          "__v": 2
      }
  ]
}
```


### Artist Object  <a name="artists"></a>

##### Object Format

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| accounts | `String[]` | An array of Mongo ObjectIds, Contains all accounts in our mongoDB that also like this artist |
| genres | `string[]` | Genres this artist is associated with |
| _id | `string` | MongoDB Id for this artist |
| spotifyId | `string` | Artist's spotify UUID |
| name | `string` | Artist's name |
| popularity | `number` | Number score of Artist's popularity on Spotify |
| followers | `number` | Number of followers on Artist's Spotify profile |
| image | `Object` | An object with fields: Height, Width, Url and _id (our mongodb ID) |
| url | `string` | Artist's URL on Spotify |

** Example Body**
```js
{
    "accounts": [
        "5f14ecfa182cd43318eda6ec",
        "5f14ef55c52fd51d980dbea0",
        "5f14f2f6f607f94720fd2365"
    ],
    "genres": [
        "edm",
        "pop",
        "tropical house"
    ],
    "_id": "5f14ed89182cd43318eda720",
    "spotifyId": "23fqKkggKUBHNkbKtXEls4",
    "name": "Kygo",
    "popularity": 90,
    "followers": 6519489,
    "image": {
        "_id": "5f14ed89182cd43318eda721",
        "height": 640,
        "url": "https://i.scdn.co/image/eee84c026e93f6d970fdc82c5010c45219530577",
        "width": 640
    },
    "url": "https://open.spotify.com/artist/23fqKkggKUBHNkbKtXEls4",
    "__v": 2
}
```
### Tracks Object  <a name="tracks"></a>

##### Object Format

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| accounts | `String[]` | An array of Mongo ObjectIds, Contains all accounts in our mongoDB that also like this track |
| _id | `string` | MongoDB Id for this track |
| spotifyId | `string` | Artist's spotify UUID |
| name | `string` | Track's name |
| popularity | `number` | Number score of Track's popularity on Spotify |
| image | `Object` | An object with fields: Height, Width, Url and _id (our mongodb ID) |
| audioPreviewURL | `string` | URL to 30 second preview of the track on Spotify |
| artists | `Object[] | An array of [Artists](#artists) related to the track |

** Example Body**
```js
{
  "accounts": [
      "5f14ecfa182cd43318eda6ec",
      "5f14ef55c52fd51d980dbea0",
      "5f14f2f6f607f94720fd2365"
  ],
  "_id": "5f14ed8a182cd43318eda752",
  "spotifyId": "6p8eEdiZLKJH8tcjGZuNTK",
  "name": "Run",
  "popularity": 76,
  "url": "https://open.spotify.com/track/6p8eEdiZLKJH8tcjGZuNTK",
  "image": {
      "_id": "5f14ed8a182cd43318eda753",
      "height": 640,
      "url": "https://i.scdn.co/image/ab67616d0000b2734896429a87abfacd5d90587b",
      "width": 640
  },
  "audioPreviewURL": "https://p.scdn.co/mp3-preview/8e62d2ceec0caec7865779e603158827cd1d9bb8?cid=3a22559fa1d84159977d6166a9b5eb75",
  "artists": [],
  "__v": 2
}
```

## Facebook Objects 

### User Object <a name='facebookuser'></a>

##### Object Format

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| likes | `string[]` | Array of mongoDB IDs. These refer to the user's likes |
| _id | `string` | MongoDB Id for the facebook user object |
| facebookId | `string` | User's facebook UUID |
| name | `string` | User's facebook name |
| hometown | `string` | if exists, User's facebook hometown |
| profilePicURL | `string` | URL to the User's facebook profile pic |

** Example Body**
```js
"facebook": {
    "likes": [
        "5f14ed5f182cd43318eda6ed",
        "5f14ed5f182cd43318eda6ee",
        "5f14ed5f182cd43318eda6ef",
        "5f14ed5f182cd43318eda6f1",
        "5f14ed5f182cd43318eda6f0",
        "5f14ed5f182cd43318eda6f2",
        "5f14ed5f182cd43318eda6f3",
        "5f14ed5f182cd43318eda6f4"
    ],
    "_id": "5f1a917b7ebe503004142f62",
    "facebookId": "10214465770756780",
    "name": "Hello World",
    "hometown": "",
    "profilePicURL": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10214465770756780&height=50&width=50&ext=1598168698&hash=AeSNfPi-e2"
}
```


___

## Endpoints

Web API endpoints enable external applications to access user data. The endpoints are arranged in a structure defined by an object model.

### Authentication

Endpoints for retrieving information about a user’s profile.

Base URL: `https://api.educonnections.ca/auth`

| METHOD | ENDPOINT | USAGE | RETURNS |
|-|-|-|-|
| `POST` | [/auth/login]() | Authenticate User | token |
| `POST` | [/auth/signup]() | Create new User | token |
| `POST` | [/auth/forgot]() | Send email verification token | *Boolean* |
| `POST` | [/auth/verify]() | Verify email verification token | token |
| `POST` | [/auth/reset]() | Update the User's password | *Boolean* |

#### <ins>Login</ins>

Authenticate User

##### Endpoint

`POST https://api.educonnections.ca/auth/login`

##### Request Parameters

**Body Parameters**

| REQUEST BODY DATA | VALUE TYPE | VALUE |
|-|-|-|
| email | `string` | *Required* |
| password | `string` | *Required* |

**Body Parameters Example:**

```js
{
  "email": "john@gmail.com",
  "password": "password123"
}
```

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains an [access token]() in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| token | `string` | A valid access token, issued on login, for authenticated requests |
| [profile]() | `string` | URI for User's profile route |

**Reponse Example:**

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "profile": "https://api.educonnections.ca/profile/913219"
}
```

#### <ins>Sigup</ins>

Create new User

##### Endpoint

`POST https://api.educonnections.ca/auth/signup`

##### Request Parameters

**Body Parameters**

| REQUEST BODY DATA | VALUE TYPE | VALUE |
|-|-|-|
| name | `string` | *Required* |
| email | `string` | *Required* |
| password | `string` | *Required* |
| passwordConfirmation | `string` | *Required* |

**Body Parameters Example:**

```js
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}
```

##### Response Format

On success, the HTTP status code in the response header is `201` CREATED and the response body contains an [access token]() in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| token | `string` | A valid access token, issued on login, for authenticated requests |
| [profile]() | `string` | URI for User's profile route |

**Reponse Example:**

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "profile": "https://api.educonnections.ca/profile/913219"
}
```

#### <ins>Forgot Password</ins>

Send email verification token

##### Endpoint

`POST https://api.educonnections.ca/auth/forgot`

##### Request Parameters

**Body Parameters**

| REQUEST BODY DATA | VALUE TYPE | VALUE |
|-|-|-|
| email | `string` | *Required* |

**Body Parameters Example:**

```js
{
  "email": "john@gmail.com"
}
```

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains a flag in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| success | `boolean` | Boolean whether the request was successful or not |

**Reponse Example:**

```js
{
  success: true | false
}
```

#### <ins>Verify</ins>

Verify email verification token

##### Endpoint

`POST https://api.educonnections.ca/auth/verify`

##### Request Parameters

**Body Parameters**

| REQUEST BODY DATA | VALUE TYPE | VALUE |
|-|-|-|
| token | `string` | *Required* |

**Body Parameters Example:**

```js
{
  "token": "507f1f77bcf86cd799439011"
}
```

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains an [access token]() in JSON format. The user is considered authenticated once the token is verified on the server. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| token | `string` | A valid access token, issued on login, for authenticated requests |

**Reponse Example:**

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}
```

#### <ins>Reset Password</ins>

Update the User's password

##### Endpoint

`POST https://api.educonnections.ca/auth/reset`

##### Request Parameters

**Header Parameters**

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |

**Example Header**

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**Body Parameters**

| REQUEST BODY DATA | VALUE TYPE | VALUE |
|-|-|-|
| password | `string` | *Required* |
| passwordConfirmation | `string` | *Required* |

**Body Parameters Example:**

```js
{
  "password": "password456",
  "passwordConfirmation": "password456"
}
```

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains a flag in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| success | `boolean` | Boolean whether the request was successful or not |
| [profile]() | `string` | URI for User's profile route |

**Reponse Example:**

```js
{
  success: true | false,
  "profile": "https://api.educonnections.ca/profile/913219"
}
```

___

### Users Profile

| METHOD | ENDPOINT | USAGE | RETURNS |
|-|-|-|-|
| `GET` | [/account]() | Get Current User's Profile | User's [account]() object |

#### Endpoints

**Note:** All endpoints below require the `Authorization` header with the access token

**Header Fields**

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |

**Example Header**

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### <ins>Get Current User's Profile</ins>

Get detailed profile information about the current user.

##### Endpoint

`GET https://api.educonnections.ca/account`

##### Request Parameters

*No request parameters.*

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains a User [Profile]() object in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| accountId | `string` | URI for User's profile route |
| name | `string` | User's name |
| email | `string` | User's email |
| spotifyVerified | `boolean` | Indicates if this user has integrated their Spotify account |
| spotify | `Object` | contains a [Spotify Object](#SpotifyObject) if user has integrated Spotify account |
| facebookVerified | `boolean` | Indicates if this user has integrated their Facebook account |
| facebook | `Object` | contains a [Facebook Object](#facebookuser) if user has integrated their facebook account |

**Reponse Example:**

```js
{
    "accountId": "5f14ecfa182cd43318eda6ec",
    "name": "at",
    "email": "allan@gmail.com",
    "spotifyVerified": true,
    "spotify": {
        "$init": true,
        "accessToken": "",
        "refreshToken": "",
        "spotifyId": "helloWorld",
        "displayName": "helloWorld",
        "email": "helloworld@gmail.com",
        "url": "https://open.spotify.com/user/helloworld",
        "followers": 18,
        "image": {
            "_id": "5f14ee02182cd43318eda7f6",
            "height": null,
            "url": "https://i.scdn.co/image/ab6775700000ee852870f7611c845b919f68dd18",
            "width": null
        },
        "country": null,
        "artists": [
            {
                "accounts": [
                    "5f14ecfa182cd43318eda6ec",
                    "5f14ef55c52fd51d980dbea0",
                    "5f14f2f6f607f94720fd2365"
                ],
                "genres": [
                    "edm",
                    "pop",
                    "tropical house"
                ],
                "_id": "5f14ed89182cd43318eda720",
                "spotifyId": "23fqKkggKUBHNkbKtXEls4",
                "name": "Kygo",
                "popularity": 90,
                "followers": 6519489,
                "image": {
                    "_id": "5f14ed89182cd43318eda721",
                    "height": 640,
                    "url": "https://i.scdn.co/image/eee84c026e93f6d970fdc82c5010c45219530577",
                    "width": 640
                },
                "url": "https://open.spotify.com/artist/23fqKkggKUBHNkbKtXEls4",
                "__v": 2
            },
            {
                "accounts": [
                    "5f14ecfa182cd43318eda6ec",
                    "5f14ef55c52fd51d980dbea0",
                    "5f14f2f6f607f94720fd2365"
                ],
                "genres": [
                    "bmore",
                    "edm",
                    "moombahton",
                    "ninja",
                    "pop"
                ],
                "_id": "5f14ed89182cd43318eda722",
                "spotifyId": "5fMUXHkw8R8eOP2RNVYEZX",
                "name": "Diplo",
                "popularity": 87,
                "followers": 2270522,
                "image": {
                    "_id": "5f14ed89182cd43318eda723",
                    "height": 640,
                    "url": "https://i.scdn.co/image/72783f9135e197d828a8652bbf73eee3b408e380",
                    "width": 640
                },
                "url": "https://open.spotify.com/artist/5fMUXHkw8R8eOP2RNVYEZX",
                "__v": 2
            },
            {
                "accounts": [
                    "5f14ecfa182cd43318eda6ec",
                    "5f14ef55c52fd51d980dbea0",
                    "5f14f2f6f607f94720fd2365"
                ],
                "genres": [
                    "edm",
                    "electropop",
                    "melodic dubstep",
                    "pop",
                    "tropical house"
                ],
                "_id": "5f14ed89182cd43318eda724",
                "spotifyId": "45eNHdiiabvmbp4erw26rg",
                "name": "ILLENIUM",
                "popularity": 80,
                "followers": 892195,
                "image": {
                    "_id": "5f14ed89182cd43318eda725",
                    "height": 640,
                    "url": "https://i.scdn.co/image/13f93bc1aa54c82eb6deed1637b5049150cc9379",
                    "width": 640
                },
                "url": "https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg",
                "__v": 2
            }
        ],
        "tracks": [
            {
                "accounts": [
                    "5f14ecfa182cd43318eda6ec",
                    "5f14ef55c52fd51d980dbea0",
                    "5f14f2f6f607f94720fd2365"
                ],
                "_id": "5f14ed8a182cd43318eda752",
                "spotifyId": "6p8eEdiZLKJH8tcjGZuNTK",
                "name": "Run",
                "popularity": 76,
                "url": "https://open.spotify.com/track/6p8eEdiZLKJH8tcjGZuNTK",
                "image": {
                    "_id": "5f14ed8a182cd43318eda753",
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2734896429a87abfacd5d90587b",
                    "width": 640
                },
                "audioPreviewURL": "https://p.scdn.co/mp3-preview/8e62d2ceec0caec7865779e603158827cd1d9bb8?cid=3a22559fa1d84159977d6166a9b5eb75",
                "artists": [],
                "__v": 2
            },
            {
                "accounts": [
                    "5f14ecfa182cd43318eda6ec",
                    "5f14ef55c52fd51d980dbea0",
                    "5f14f2f6f607f94720fd2365"
                ],
                "_id": "5f14ed8a182cd43318eda754",
                "spotifyId": "30EjmPhNzAdbx0cLAZnCa2",
                "name": "So Long",
                "popularity": 22,
                "url": "https://open.spotify.com/track/30EjmPhNzAdbx0cLAZnCa2",
                "image": {
                    "_id": "5f14ed8a182cd43318eda755",
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2734c81385212bf1e78693bd18e",
                    "width": 640
                },
                "audioPreviewURL": null,
                "artists": [],
                "__v": 2
            }
        ]
    },
    "facebookVerified": true,
    "facebook": {
        "likes": [
            "5f14ed5f182cd43318eda6ed",
            "5f14ed5f182cd43318eda6ee",
            "5f14ed5f182cd43318eda6ef",
            "5f14ed5f182cd43318eda6f1",
            "5f14ed5f182cd43318eda6f0",
            "5f14ed5f182cd43318eda6f2",
            "5f14ed5f182cd43318eda6f3",
            "5f14ed5f182cd43318eda6f4"
        ],
        "_id": "5f1a917b7ebe503004142f62",
        "facebookId": "10214465770756780",
        "name": "Hello World",
        "hometown": "",
        "profilePicURL": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10214465770756780&height=50&width=50&ext=1598168698&hash=AeSNfPi-e2"
    },
    "courses": [
        "5f14f06584729f245062e29c",
        "5f14f06584729f245062e29b",
        "5f14f06584729f245062e29d"
    ]
}
```

___


### Courses

| METHOD | ENDPOINT | USAGE | RETURNS |
|-|-|-|-|
| `GET` | /courses | Allows us to find all the courses a user is in | Returns an array of courses that the user is enrolled in |
| `POST` | /courses | Allows a user to upload an ics file for their profile | returns an array of [CalendarApiResponse Object](#CalendarApiResponse) |

#### Endpoints

**Note:** All endpoints below require the `Authorization` header with the access token

##### Endpoint

`GET https://api.educonnections.ca/courses`

**Header Fields**

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |

**Example Header**

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains an array of [CalendarApiResponse](#CourseGetResponse) object in JSON format, with an additional field called "accounts" which has the ObjectId and Name of all students enrolled in the course.

**Note that each JSON object in the array represents a Course/Class in the uploaded Calendar, if a Calendar has 4 classes, the array will return 4 CalendarApiResponse objects.**

**Response Example:** <a name="CourseGetResponse"></a>

```js
{
  "courses": [
      {
          "courseId": "5f14f06584729f245062e29b",
          "accounts": [
              {
                  "accountId": "5f14ecfa182cd43318eda6ec",
                  "name": "at"
              },
              {
                  "accountId": "5f14ef55c52fd51d980dbea0",
                  "name": "demo"
              }
          ],
          "courseDept": "CPSC",
          "courseNumber": "436I",
          "courseSection": "901",
          "startDate": "2020-05-09T17:00:00.000Z",
          "endDate": "2020-08-15T23:59:59.000Z"
      },
      {
          "courseId": "5f14f06584729f245062e29c",
          "accounts": [
              {
                  "accountId": "5f14ecfa182cd43318eda6ec",
                  "name": "at"
              },
              {
                  "accountId": "5f14ef55c52fd51d980dbea0",
                  "name": "demo"
              }
          ],
          "courseDept": "CPSC",
          "courseNumber": "436I",
          "courseSection": "L1A",
          "startDate": "2020-05-13T00:00:00.000Z",
          "endDate": "2020-08-04T23:59:59.000Z"
      },
      {
          "courseId": "5f14f06584729f245062e29d",
          "accounts": [
              {
                  "accountId": "5f14ecfa182cd43318eda6ec",
                  "name": "at"
              },
              {
                  "accountId": "5f14ef55c52fd51d980dbea0",
                  "name": "demo"
              }
          ],
          "courseDept": "COMM",
          "courseNumber": "393",
          "courseSection": "971",
          "startDate": "2020-07-06T16:00:00.000Z",
          "endDate": "2020-08-12T23:59:59.000Z"
      }
  ]
}
```


##### Endpoint

`POST https://api.educonnections.ca/courses`

##### Request Parameters/Body/Headers

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |
| Content-Type | *Required*. multipart/form-data |


*Request Body must contain a file of type .ics*

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains an array of [CalendarApiResponse](#CalendarApiResponse) object in JSON format. **Note that each JSON object in the array represents a Course/Class in the uploaded Calendar, if a Calendar has 4 classes, the array will return 4 CalendarApiResponse objects.**

 On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| courseDept | `string` | A course's faculty/department |
| courseNum | `string` | A course's code |
| courseSection | `string` | A course's section |
| uri | `string` | the URI for a created Course |

**Response Example:** <a name="CalendarApiResponse"></a>

```js
[
  {
    "courseDept": "CPSC",
    "courseNum": "436I",
    "courseSection": "901"
  },
  {
    "courseDept": "CPSC",
    "courseNum": "436I",
    "courseSection": "L1A"
  }
]
```
___





___

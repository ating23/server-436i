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
| `GET` | [/profile]() | Get Current User's Profile | User's [Profile]() object |

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

Get detailed profile information about the current user (including the current user’s username).

##### Endpoint

`GET https://api.educonnections.ca/profile`

##### Request Parameters

*No request parameters.*

##### Response Format

On success, the HTTP status code in the response header is `200` OK and the response body contains a User [Profile]() object in JSON format. On error, the header status code is an error code and the response body contains an [error object]().

| KEY | VALUE TYPE | VALUE DESCRIPTION |
|-|-|-|
| [profile]() | `string` | URI for User's profile route |
| name | `string` | User's name |
| email | `string` | User's name |

**Reponse Example:**

```js
{
  name: "John Doe",
  email: "john@gmail.com",
  profile: "https://api.educonnections.ca/profile/913219"
}
```

___


### Calendar

| METHOD | ENDPOINT | USAGE | RETURNS |
|-|-|-|-|
| `POST` | /calendar | Allows a user to upload an ics file for their profile | returns an array of [CalendarApiResponse Object](#CalendarApiResponse) |

#### Endpoints

**Note:** All endpoints below require the `Authorization` header with the access token

**Header Fields**

| HEADER FIELD | VALUE | 
|-|-|
| Authorization | *Required*. A valid access token, issued on login or password reset |
| Content-Type | *Required*. multipart/form-data |

**Example Header**

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### <ins>Post Current User's Calendar</ins>

##### Endpoint

`POST https://api.educonnections.ca/calendar`

##### Request Parameters/Body

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
    "courseSection": "901",
    "uri": "https://api.educonnections.ca/courses/5ef6708bec0f5020c4816d74"
  },
  {
    "courseDept": "CPSC",
    "courseNum": "436I",
    "courseSection": "L1A",
    "uri": "https://api.educonnections.ca/courses/5ef6708bec0f5020c4816d75"
  }
]
```
___





___

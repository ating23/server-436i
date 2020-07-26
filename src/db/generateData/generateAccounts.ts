import bcrypt from "bcryptjs"

const testAccounts = {
  "results": [
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Rebecca",
              "last": "Holt"
          },
          "location": {
              "street": {
                  "number": 9002,
                  "name": "St. John’S Road"
              },
              "city": "Bangor",
              "state": "Strathclyde",
              "country": "United Kingdom",
              "postcode": "Z4 7JA",
              "coordinates": {
                  "latitude": "11.1961",
                  "longitude": "103.1695"
              },
              "timezone": {
                  "offset": "+11:00",
                  "description": "Magadan, Solomon Islands, New Caledonia"
              }
          },
          "email": "rebecca.holt@example.com",
          "login": {
              "uuid": "6ffec0d3-9ecc-43fb-84f1-26cd8795a376",
              "username": "yellowbird237",
              "password": "dong",
              "salt": "K4XVo0TV",
              "md5": "094b6c83a715192fa0fe55101291d979",
              "sha1": "bfc3dea192f0f8836688db84767e5997903253bb",
              "sha256": "a08b7d7f9f803646cbc2ad679e876889658612737b35501a8abc83559522f8dd"
          },
          "dob": {
              "date": "1966-05-26T21:37:30.228Z",
              "age": 54
          },
          "registered": {
              "date": "2015-09-13T19:54:17.889Z",
              "age": 5
          },
          "phone": "017683 85867",
          "cell": "0767-239-474",
          "id": {
              "name": "NINO",
              "value": "MP 04 06 36 O"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/83.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/83.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/83.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Lison",
              "last": "Roger"
          },
          "location": {
              "street": {
                  "number": 7631,
                  "name": "Rue de L'Abbé-Rousselot"
              },
              "city": "Vitry-sur-Seine",
              "state": "Hautes-Pyrénées",
              "country": "France",
              "postcode": 21337,
              "coordinates": {
                  "latitude": "-41.3276",
                  "longitude": "169.0071"
              },
              "timezone": {
                  "offset": "+5:30",
                  "description": "Bombay, Calcutta, Madras, New Delhi"
              }
          },
          "email": "lison.roger@example.com",
          "login": {
              "uuid": "d1b9dde8-95c2-4652-ba0a-7a6966213ddb",
              "username": "orangezebra416",
              "password": "321654",
              "salt": "UfVsWaOX",
              "md5": "13dd60664608e388e680a3b2d7f1867a",
              "sha1": "97b747301e22d1f94189948dafda24300a6fe187",
              "sha256": "895c98b025c7c78b0ca633ea02b395ce1f153d8aa14d9d8558ec7b68957aa28a"
          },
          "dob": {
              "date": "1956-09-02T11:02:44.665Z",
              "age": 64
          },
          "registered": {
              "date": "2007-12-06T13:07:54.430Z",
              "age": 13
          },
          "phone": "05-66-49-39-06",
          "cell": "06-86-22-48-57",
          "id": {
              "name": "INSEE",
              "value": "2NNaN81773236 74"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/89.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/89.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/89.jpg"
          },
          "nat": "FR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Kübra",
              "last": "Poyrazoğlu"
          },
          "location": {
              "street": {
                  "number": 2685,
                  "name": "Kushimoto Sk"
              },
              "city": "Kırklareli",
              "state": "Karaman",
              "country": "Turkey",
              "postcode": 80032,
              "coordinates": {
                  "latitude": "-16.7698",
                  "longitude": "55.5229"
              },
              "timezone": {
                  "offset": "+7:00",
                  "description": "Bangkok, Hanoi, Jakarta"
              }
          },
          "email": "kubra.poyrazoglu@example.com",
          "login": {
              "uuid": "2ca1d004-d487-491f-a1ae-ad14016a1d29",
              "username": "beautifulpanda316",
              "password": "erika",
              "salt": "YNv92nvS",
              "md5": "71d7f4a862531f3a2d51043b12c919c1",
              "sha1": "54a94d4efd7ef61351e219cb2ab6bf1a950fc69c",
              "sha256": "3fd628ee1d557bcb201f9088f22883887edb990a3725e346607375b93b72b25c"
          },
          "dob": {
              "date": "1964-06-29T21:11:20.660Z",
              "age": 56
          },
          "registered": {
              "date": "2007-07-01T06:37:29.786Z",
              "age": 13
          },
          "phone": "(833)-810-0829",
          "cell": "(762)-999-2733",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/35.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/35.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
          },
          "nat": "TR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Latife",
              "last": "Kasapoğlu"
          },
          "location": {
              "street": {
                  "number": 4868,
                  "name": "Talak Göktepe Cd"
              },
              "city": "Mardin",
              "state": "Afyonkarahisar",
              "country": "Turkey",
              "postcode": 64939,
              "coordinates": {
                  "latitude": "-28.7098",
                  "longitude": "29.3470"
              },
              "timezone": {
                  "offset": "0:00",
                  "description": "Western Europe Time, London, Lisbon, Casablanca"
              }
          },
          "email": "latife.kasapoglu@example.com",
          "login": {
              "uuid": "64bed9da-b029-4220-ac7c-bc15bcad34e8",
              "username": "redpanda786",
              "password": "newbie",
              "salt": "inVAsPMY",
              "md5": "76916c80be9cdbcbe4704f08d4d3e488",
              "sha1": "ebd3b26e2c84c7a5f5695a2780a103caa5469562",
              "sha256": "6a80350950e0ed22c817be7038bda631fe93e53cf96a3f9b479c476580b46c68"
          },
          "dob": {
              "date": "1951-05-25T01:35:54.845Z",
              "age": 69
          },
          "registered": {
              "date": "2009-04-18T09:56:23.728Z",
              "age": 11
          },
          "phone": "(465)-801-7175",
          "cell": "(193)-459-2689",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/91.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/91.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/91.jpg"
          },
          "nat": "TR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Asuncion",
              "last": "Ortega"
          },
          "location": {
              "street": {
                  "number": 3158,
                  "name": "Calle de La Luna"
              },
              "city": "Logroño",
              "state": "Cantabria",
              "country": "Spain",
              "postcode": 52944,
              "coordinates": {
                  "latitude": "-70.1113",
                  "longitude": "96.8941"
              },
              "timezone": {
                  "offset": "0:00",
                  "description": "Western Europe Time, London, Lisbon, Casablanca"
              }
          },
          "email": "asuncion.ortega@example.com",
          "login": {
              "uuid": "b9b45f7b-6f7c-4609-af09-cba006199cd3",
              "username": "purplecat386",
              "password": "connor",
              "salt": "skl0aJGv",
              "md5": "e5c64dca67044c49d8c78e301be83b34",
              "sha1": "518162ca5f779d8c9c0114797631d591ba354ff2",
              "sha256": "94128ec8ecdda3be9efd8b9b11f29e3d75a1ad539b653abcc33188747645e3f3"
          },
          "dob": {
              "date": "1988-03-20T23:27:06.179Z",
              "age": 32
          },
          "registered": {
              "date": "2004-02-09T15:27:31.960Z",
              "age": 16
          },
          "phone": "933-047-288",
          "cell": "614-714-639",
          "id": {
              "name": "DNI",
              "value": "29890672-F"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/60.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
          },
          "nat": "ES"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Lucile",
              "last": "Dufour"
          },
          "location": {
              "street": {
                  "number": 5883,
                  "name": "Rue de L'Abbé-Soulange-Bodin"
              },
              "city": "Toulon",
              "state": "Aube",
              "country": "France",
              "postcode": 65635,
              "coordinates": {
                  "latitude": "-12.6300",
                  "longitude": "-36.6266"
              },
              "timezone": {
                  "offset": "+5:00",
                  "description": "Ekaterinburg, Islamabad, Karachi, Tashkent"
              }
          },
          "email": "lucile.dufour@example.com",
          "login": {
              "uuid": "2bb6a114-3e1c-4617-9171-96a989e2bc9f",
              "username": "tinyladybug251",
              "password": "corndog",
              "salt": "N8IxAhez",
              "md5": "1103688c9379084e96f24878c464187f",
              "sha1": "d3f4d47ce1487ed5c7734d174e925a2344101974",
              "sha256": "d8d040fd8c644c8aeef1c86ac50694bbaff801d8a63f0bc9c7919c46cc1ebaa7"
          },
          "dob": {
              "date": "1985-05-28T05:32:03.488Z",
              "age": 35
          },
          "registered": {
              "date": "2017-07-11T17:09:21.978Z",
              "age": 3
          },
          "phone": "02-26-32-48-49",
          "cell": "06-04-59-46-22",
          "id": {
              "name": "INSEE",
              "value": "2NNaN67396317 35"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/40.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/40.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/40.jpg"
          },
          "nat": "FR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Lucineri",
              "last": "Araújo"
          },
          "location": {
              "street": {
                  "number": 613,
                  "name": "Rua Santo Antônio "
              },
              "city": "Barra Mansa",
              "state": "Bahia",
              "country": "Brazil",
              "postcode": 41373,
              "coordinates": {
                  "latitude": "-9.4425",
                  "longitude": "-134.6486"
              },
              "timezone": {
                  "offset": "-9:00",
                  "description": "Alaska"
              }
          },
          "email": "lucineri.araujo@example.com",
          "login": {
              "uuid": "c1c4c0ac-09f5-435e-99b6-e5e1bd9337d8",
              "username": "crazytiger393",
              "password": "1269",
              "salt": "8pr6Ive6",
              "md5": "e8d70e908bed80c8a8777f1357d40d1c",
              "sha1": "e2a3310434a9b35d1d8200fa3c5482fe6085fe06",
              "sha256": "92c91240bf07a0d235117158b06032e7efa9904751f56049bd1eaa6c878187e1"
          },
          "dob": {
              "date": "1978-11-29T07:32:23.772Z",
              "age": 42
          },
          "registered": {
              "date": "2006-07-27T00:28:45.618Z",
              "age": 14
          },
          "phone": "(71) 3162-8471",
          "cell": "(30) 5476-2844",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/60.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
          },
          "nat": "BR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Elma",
              "last": "Storøy"
          },
          "location": {
              "street": {
                  "number": 1447,
                  "name": "Nøtteveien"
              },
              "city": "Preststranda",
              "state": "Oslo",
              "country": "Norway",
              "postcode": "8672",
              "coordinates": {
                  "latitude": "46.1227",
                  "longitude": "119.6729"
              },
              "timezone": {
                  "offset": "+4:00",
                  "description": "Abu Dhabi, Muscat, Baku, Tbilisi"
              }
          },
          "email": "elma.storoy@example.com",
          "login": {
              "uuid": "2cc5369b-9e8a-4dd4-b7dc-da5fd35b51b3",
              "username": "organicrabbit528",
              "password": "whatwhat",
              "salt": "xTlHU5q7",
              "md5": "87887931cad66319ce33f8a3db9a4925",
              "sha1": "8a85b5679159d5f29f0c444985da359118cf8084",
              "sha256": "8e1acb11b7285143b3e68841215c3204045e5a4c333aaeb6971625c467996322"
          },
          "dob": {
              "date": "1969-05-15T05:57:48.649Z",
              "age": 51
          },
          "registered": {
              "date": "2009-12-02T13:39:19.540Z",
              "age": 11
          },
          "phone": "32442167",
          "cell": "44912948",
          "id": {
              "name": "FN",
              "value": "15056941484"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/90.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/90.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/90.jpg"
          },
          "nat": "NO"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Melissa",
              "last": "Craig"
          },
          "location": {
              "street": {
                  "number": 4680,
                  "name": "Northaven Rd"
              },
              "city": "Erie",
              "state": "Wisconsin",
              "country": "United States",
              "postcode": 80831,
              "coordinates": {
                  "latitude": "-23.9717",
                  "longitude": "-71.5082"
              },
              "timezone": {
                  "offset": "+9:30",
                  "description": "Adelaide, Darwin"
              }
          },
          "email": "melissa.craig@example.com",
          "login": {
              "uuid": "5d55d100-d3fb-4b4f-bf3b-56e87a774909",
              "username": "beautifultiger311",
              "password": "guess",
              "salt": "j0lmej8B",
              "md5": "babcd273ffd67058e9940a190b164c00",
              "sha1": "de86d78af2b30156d98a93375049fbd5bd6fe94f",
              "sha256": "158238ba85e6355f0a8eadc48a1f889a6e75efd7dc719666eb39997488e3c115"
          },
          "dob": {
              "date": "1982-08-14T11:08:41.433Z",
              "age": 38
          },
          "registered": {
              "date": "2015-02-04T21:44:35.348Z",
              "age": 5
          },
          "phone": "(676)-688-3799",
          "cell": "(817)-807-3509",
          "id": {
              "name": "SSN",
              "value": "697-23-5057"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/31.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/31.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/31.jpg"
          },
          "nat": "US"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Lilja",
              "last": "Lampinen"
          },
          "location": {
              "street": {
                  "number": 5419,
                  "name": "Otavalankatu"
              },
              "city": "Rusko",
              "state": "Northern Savonia",
              "country": "Finland",
              "postcode": 91322,
              "coordinates": {
                  "latitude": "-65.6350",
                  "longitude": "-103.5913"
              },
              "timezone": {
                  "offset": "0:00",
                  "description": "Western Europe Time, London, Lisbon, Casablanca"
              }
          },
          "email": "lilja.lampinen@example.com",
          "login": {
              "uuid": "c64a9daa-bc16-4f6b-9e02-c2b82f569e4a",
              "username": "happylion993",
              "password": "indain",
              "salt": "aBdoe3Ab",
              "md5": "92070a3edfcf8a15ab1aa6d8cfefaeb4",
              "sha1": "15970edc7bd36f310040ac184ee78612ee7e9890",
              "sha256": "f3f958ca2377946dd600bcf5894a9325d371dabc9ef57b5117ee4a01e2b1e5b7"
          },
          "dob": {
              "date": "1996-11-18T12:05:17.256Z",
              "age": 24
          },
          "registered": {
              "date": "2009-03-03T10:02:01.001Z",
              "age": 11
          },
          "phone": "05-837-656",
          "cell": "047-627-23-20",
          "id": {
              "name": "HETU",
              "value": "NaNNA060undefined"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/50.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/50.jpg"
          },
          "nat": "FI"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Lourdes",
              "last": "Diaz"
          },
          "location": {
              "street": {
                  "number": 2637,
                  "name": "Calle Covadonga"
              },
              "city": "Gandía",
              "state": "Canarias",
              "country": "Spain",
              "postcode": 65244,
              "coordinates": {
                  "latitude": "56.3371",
                  "longitude": "176.8146"
              },
              "timezone": {
                  "offset": "-7:00",
                  "description": "Mountain Time (US & Canada)"
              }
          },
          "email": "lourdes.diaz@example.com",
          "login": {
              "uuid": "61a87587-4742-42f0-9854-925c1a4506c4",
              "username": "tinybutterfly394",
              "password": "girls",
              "salt": "UTsbSXx6",
              "md5": "646698cbeb9f8fb03d85fa1f603838f9",
              "sha1": "0b2b56d74bdf8a2497af3f1cd9533613a17266b1",
              "sha256": "14e43d4c9d4eaf0e512924893e766cba6a103dde8237322d569cd103cc571653"
          },
          "dob": {
              "date": "1974-04-28T23:36:51.736Z",
              "age": 46
          },
          "registered": {
              "date": "2005-02-11T18:50:38.154Z",
              "age": 15
          },
          "phone": "963-103-918",
          "cell": "691-396-787",
          "id": {
              "name": "DNI",
              "value": "62999330-G"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/20.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/20.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/20.jpg"
          },
          "nat": "ES"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Hayley",
              "last": "Kumar"
          },
          "location": {
              "street": {
                  "number": 4037,
                  "name": "Bealey Avenue"
              },
              "city": "Porirua",
              "state": "Waikato",
              "country": "New Zealand",
              "postcode": 94106,
              "coordinates": {
                  "latitude": "68.9323",
                  "longitude": "124.1779"
              },
              "timezone": {
                  "offset": "+11:00",
                  "description": "Magadan, Solomon Islands, New Caledonia"
              }
          },
          "email": "hayley.kumar@example.com",
          "login": {
              "uuid": "17c26a4e-4fde-40ac-837a-3db99e19af86",
              "username": "crazybutterfly215",
              "password": "riffraff",
              "salt": "00sB4kpN",
              "md5": "5bf675b041f1712d78e0e03d45368103",
              "sha1": "26db0a3dbfec9cdce020899ad03378191e8d3d57",
              "sha256": "520efd0d4d4d227b0288c4d807ddab0847ac8d4da6a9afb73d25ef3f704e2398"
          },
          "dob": {
              "date": "1996-12-24T05:23:10.766Z",
              "age": 24
          },
          "registered": {
              "date": "2008-10-16T15:59:46.034Z",
              "age": 12
          },
          "phone": "(711)-421-2915",
          "cell": "(264)-478-5723",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/62.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
          },
          "nat": "NZ"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Zoe",
              "last": "Diaz"
          },
          "location": {
              "street": {
                  "number": 8295,
                  "name": "Oak Lawn Ave"
              },
              "city": "Sydney",
              "state": "Australian Capital Territory",
              "country": "Australia",
              "postcode": 4883,
              "coordinates": {
                  "latitude": "-13.3420",
                  "longitude": "-139.3408"
              },
              "timezone": {
                  "offset": "+3:30",
                  "description": "Tehran"
              }
          },
          "email": "zoe.diaz@example.com",
          "login": {
              "uuid": "164d72cd-644a-4636-97e0-69e6b44ac5ea",
              "username": "silverladybug977",
              "password": "excess",
              "salt": "rhwFYzbK",
              "md5": "ad5edf5369176b83ddbed57005358ee5",
              "sha1": "173d50f7b4017b814ab93363ec97414e0c3a4f26",
              "sha256": "7de1528e19ccd72dc883febc2577d9f63d9c7f96b08221eb7a9aa3d36cdb571b"
          },
          "dob": {
              "date": "1969-05-05T05:38:20.939Z",
              "age": 51
          },
          "registered": {
              "date": "2006-03-10T04:49:08.746Z",
              "age": 14
          },
          "phone": "05-5192-7036",
          "cell": "0426-786-499",
          "id": {
              "name": "TFN",
              "value": "081258662"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/11.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/11.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/11.jpg"
          },
          "nat": "AU"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Eugenia",
              "last": "Vicente"
          },
          "location": {
              "street": {
                  "number": 8826,
                  "name": "Calle de Arganzuela"
              },
              "city": "Madrid",
              "state": "La Rioja",
              "country": "Spain",
              "postcode": 57239,
              "coordinates": {
                  "latitude": "-31.9394",
                  "longitude": "-140.4329"
              },
              "timezone": {
                  "offset": "-7:00",
                  "description": "Mountain Time (US & Canada)"
              }
          },
          "email": "eugenia.vicente@example.com",
          "login": {
              "uuid": "c5a19031-0a12-45f3-8e95-1e04e5a39b25",
              "username": "tinysnake448",
              "password": "williams",
              "salt": "lPGI6N23",
              "md5": "4369d2e7792ca59059a273343eee5f98",
              "sha1": "cf35a37b902c4f02ef1d76074b0883c10003d8bd",
              "sha256": "ea28d7d0bfff4b9842670c3be631f20d345b9415b1fce29462ccb41980b30606"
          },
          "dob": {
              "date": "1967-02-21T08:21:49.315Z",
              "age": 53
          },
          "registered": {
              "date": "2012-12-01T21:11:17.133Z",
              "age": 8
          },
          "phone": "934-778-500",
          "cell": "679-396-443",
          "id": {
              "name": "DNI",
              "value": "76600033-A"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/85.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/85.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/85.jpg"
          },
          "nat": "ES"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "آوینا",
              "last": "حسینی"
          },
          "location": {
              "street": {
                  "number": 9935,
                  "name": "شهید شواخ"
              },
              "city": "نجف‌آباد",
              "state": "کهگیلویه و بویراحمد",
              "country": "Iran",
              "postcode": 39441,
              "coordinates": {
                  "latitude": "-66.2972",
                  "longitude": "56.3538"
              },
              "timezone": {
                  "offset": "+8:00",
                  "description": "Beijing, Perth, Singapore, Hong Kong"
              }
          },
          "email": "awyn.hsyny@example.com",
          "login": {
              "uuid": "4d6b2518-7ca4-4e66-84d3-92a9985b28be",
              "username": "tinymeercat494",
              "password": "compaq",
              "salt": "beg2Edr4",
              "md5": "f17b4398e392c15d08be6cb2e5f47507",
              "sha1": "76f9bf90398339eb4ca6481a232fd512edc5f822",
              "sha256": "81a953c17e73acdc4aff33739237d4ff75834989896edd38d3ed067e42262231"
          },
          "dob": {
              "date": "1983-05-01T18:49:51.702Z",
              "age": 37
          },
          "registered": {
              "date": "2003-11-24T17:11:37.300Z",
              "age": 17
          },
          "phone": "010-02031250",
          "cell": "0919-647-0792",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/68.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/68.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/68.jpg"
          },
          "nat": "IR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Ilona",
              "last": "Lampinen"
          },
          "location": {
              "street": {
                  "number": 3874,
                  "name": "Bulevardi"
              },
              "city": "Hamina",
              "state": "Kymenlaakso",
              "country": "Finland",
              "postcode": 64207,
              "coordinates": {
                  "latitude": "-42.9038",
                  "longitude": "160.2191"
              },
              "timezone": {
                  "offset": "-9:00",
                  "description": "Alaska"
              }
          },
          "email": "ilona.lampinen@example.com",
          "login": {
              "uuid": "f9c777e3-4773-43ab-87f2-4f7e2efb2de7",
              "username": "lazygoose193",
              "password": "review",
              "salt": "byskheeN",
              "md5": "50e378517b55f4bb9bd67b9bdd2111ad",
              "sha1": "135e68c42e2a0b3a6f35c21f6291867d22e93e6c",
              "sha256": "a1f8acb5f249dd99cfac96fcfdc9515514aff54ca3bf969dc9caae76efe4208b"
          },
          "dob": {
              "date": "1954-04-13T07:00:39.387Z",
              "age": 66
          },
          "registered": {
              "date": "2014-07-13T10:06:04.296Z",
              "age": 6
          },
          "phone": "04-732-141",
          "cell": "047-419-68-23",
          "id": {
              "name": "HETU",
              "value": "NaNNA496undefined"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/82.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/82.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/82.jpg"
          },
          "nat": "FI"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Emma",
              "last": "Denys"
          },
          "location": {
              "street": {
                  "number": 5321,
                  "name": "Maple Ave"
              },
              "city": "Brockton",
              "state": "Ontario",
              "country": "Canada",
              "postcode": "Z2Z 8M9",
              "coordinates": {
                  "latitude": "8.3400",
                  "longitude": "-77.4684"
              },
              "timezone": {
                  "offset": "-7:00",
                  "description": "Mountain Time (US & Canada)"
              }
          },
          "email": "emma.denys@example.com",
          "login": {
              "uuid": "fc2f2312-f660-4e3b-b5ab-abce5cefd1cd",
              "username": "blackswan170",
              "password": "66666666",
              "salt": "d5oNtWnZ",
              "md5": "d219f80802f4abb5dcda2ff69d0253a4",
              "sha1": "cd4f65ab7a7d7c32a5ac0d3a8c70c97f59593e94",
              "sha256": "db9f7363b5e7389b8c31636387d39dda4f37a76c827ea04d2a8eaec385405c4c"
          },
          "dob": {
              "date": "1991-11-16T16:11:21.300Z",
              "age": 29
          },
          "registered": {
              "date": "2012-04-05T12:27:09.056Z",
              "age": 8
          },
          "phone": "650-245-4774",
          "cell": "951-767-5878",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/35.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/35.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
          },
          "nat": "CA"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Kim",
              "last": "Johnston"
          },
          "location": {
              "street": {
                  "number": 6383,
                  "name": "West Street"
              },
              "city": "Durham",
              "state": "County Armagh",
              "country": "United Kingdom",
              "postcode": "CD6Y 7RG",
              "coordinates": {
                  "latitude": "-84.5045",
                  "longitude": "86.7158"
              },
              "timezone": {
                  "offset": "-7:00",
                  "description": "Mountain Time (US & Canada)"
              }
          },
          "email": "kim.johnston@example.com",
          "login": {
              "uuid": "591f9fb3-6809-4b67-bd78-8c7e07031e60",
              "username": "yellowfrog862",
              "password": "hanson",
              "salt": "TY5oz4wI",
              "md5": "0c352a59f39768671882d112665daa98",
              "sha1": "71becb684d2c5f1c912b46b10b52f2fb4f4cca0f",
              "sha256": "df0d34b3ff7babe8862e796e42a2980f4635d989c2dc5f517765cad2c977c209"
          },
          "dob": {
              "date": "1970-12-09T15:14:34.576Z",
              "age": 50
          },
          "registered": {
              "date": "2004-06-15T10:13:25.166Z",
              "age": 16
          },
          "phone": "015394 49906",
          "cell": "0775-920-957",
          "id": {
              "name": "NINO",
              "value": "LN 97 14 17 G"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/74.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/74.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/74.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Deniz",
              "last": "Alnıaçık"
          },
          "location": {
              "street": {
                  "number": 8080,
                  "name": "Kushimoto Sk"
              },
              "city": "Isparta",
              "state": "Karaman",
              "country": "Turkey",
              "postcode": 55996,
              "coordinates": {
                  "latitude": "-6.7885",
                  "longitude": "-29.7163"
              },
              "timezone": {
                  "offset": "-12:00",
                  "description": "Eniwetok, Kwajalein"
              }
          },
          "email": "deniz.alniacik@example.com",
          "login": {
              "uuid": "8ff687e6-c98a-4ca3-8354-10a158362434",
              "username": "bigladybug630",
              "password": "newpass",
              "salt": "7KHl1okg",
              "md5": "2dd08ba70801a3a1fa43a66fab24698e",
              "sha1": "58d199c7431f1b67d0dc5e1a84674cf3404acf8b",
              "sha256": "a099596babc55dcad8b64ee9d61b5534daae1c3077764729375eceffd1444818"
          },
          "dob": {
              "date": "1979-01-26T02:05:36.792Z",
              "age": 41
          },
          "registered": {
              "date": "2019-07-07T13:02:14.050Z",
              "age": 1
          },
          "phone": "(665)-604-9497",
          "cell": "(006)-388-7464",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/46.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/46.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/46.jpg"
          },
          "nat": "TR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Diane",
              "last": "Hernandez"
          },
          "location": {
              "street": {
                  "number": 4351,
                  "name": "Manor Road"
              },
              "city": "Salisbury",
              "state": "Dyfed",
              "country": "United Kingdom",
              "postcode": "A3T 8AA",
              "coordinates": {
                  "latitude": "-58.8846",
                  "longitude": "40.9777"
              },
              "timezone": {
                  "offset": "+4:30",
                  "description": "Kabul"
              }
          },
          "email": "diane.hernandez@example.com",
          "login": {
              "uuid": "bb40bc5e-6e15-4823-a520-5e2ef16fabcb",
              "username": "brownduck181",
              "password": "temp123",
              "salt": "eBHEwPDU",
              "md5": "cd1fb4902503cbfe81524073886a130d",
              "sha1": "25bd8c4db95f89cd9517b7709e27aeccf8f0384a",
              "sha256": "6b5966711c61fb2708f28330ccf153aa0059039d2f8812cd444bf30d6fedad0a"
          },
          "dob": {
              "date": "1949-06-02T18:24:47.166Z",
              "age": 71
          },
          "registered": {
              "date": "2013-07-09T01:48:52.248Z",
              "age": 7
          },
          "phone": "01382 36002",
          "cell": "0709-433-585",
          "id": {
              "name": "NINO",
              "value": "MN 35 83 08 A"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/56.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/56.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/56.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Alice",
              "last": "Washington"
          },
          "location": {
              "street": {
                  "number": 5893,
                  "name": "Park Road"
              },
              "city": "Armagh",
              "state": "Derbyshire",
              "country": "United Kingdom",
              "postcode": "MJ85 1WQ",
              "coordinates": {
                  "latitude": "18.2052",
                  "longitude": "-82.2026"
              },
              "timezone": {
                  "offset": "-3:00",
                  "description": "Brazil, Buenos Aires, Georgetown"
              }
          },
          "email": "alice.washington@example.com",
          "login": {
              "uuid": "fff5613d-660f-461a-9eff-47e23ac412f6",
              "username": "brownbear688",
              "password": "heart",
              "salt": "KzeMp28K",
              "md5": "9223a383b38fa561152ed8d586b464ff",
              "sha1": "f7562421370c359b26ad76a9a1d83dbc4cf36667",
              "sha256": "401c2c4687a35c167ee9811d059ea6f44ed637911f0f17409937742997472916"
          },
          "dob": {
              "date": "1976-10-15T12:53:36.639Z",
              "age": 44
          },
          "registered": {
              "date": "2010-01-22T23:07:46.777Z",
              "age": 10
          },
          "phone": "015242 21260",
          "cell": "0718-921-711",
          "id": {
              "name": "NINO",
              "value": "HL 39 88 11 S"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/10.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/10.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/10.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Melinda",
              "last": "Bates"
          },
          "location": {
              "street": {
                  "number": 9860,
                  "name": "Lakeview St"
              },
              "city": "Busselton",
              "state": "Victoria",
              "country": "Australia",
              "postcode": 1299,
              "coordinates": {
                  "latitude": "26.6366",
                  "longitude": "88.3196"
              },
              "timezone": {
                  "offset": "-6:00",
                  "description": "Central Time (US & Canada), Mexico City"
              }
          },
          "email": "melinda.bates@example.com",
          "login": {
              "uuid": "217324e3-94a6-46cd-8c36-0f3a9d9c1741",
              "username": "whiteladybug356",
              "password": "jeannie",
              "salt": "jS2siIK9",
              "md5": "9cd423cd98d86f857804172d273a4108",
              "sha1": "405bd13b17573b73c7559a2f0c8a866fe2d39223",
              "sha256": "7342a0a5f327a7ffe2874c8af53dbeb062a6bc7bbe684d641075aa86ec57d520"
          },
          "dob": {
              "date": "1951-07-16T09:12:13.509Z",
              "age": 69
          },
          "registered": {
              "date": "2004-03-25T08:32:47.698Z",
              "age": 16
          },
          "phone": "09-5180-8455",
          "cell": "0428-248-559",
          "id": {
              "name": "TFN",
              "value": "338370770"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/30.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/30.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/30.jpg"
          },
          "nat": "AU"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Maddison",
              "last": "Brown"
          },
          "location": {
              "street": {
                  "number": 2255,
                  "name": "Te Rapa Road"
              },
              "city": "Porirua",
              "state": "Bay of Plenty",
              "country": "New Zealand",
              "postcode": 20299,
              "coordinates": {
                  "latitude": "-24.1421",
                  "longitude": "4.2462"
              },
              "timezone": {
                  "offset": "+5:30",
                  "description": "Bombay, Calcutta, Madras, New Delhi"
              }
          },
          "email": "maddison.brown@example.com",
          "login": {
              "uuid": "c6095b7f-7318-481e-bb14-93abdb6ef0d2",
              "username": "sadkoala199",
              "password": "addison",
              "salt": "tSyzCthy",
              "md5": "9098063d237c5d230ffc5b99c0d85ee1",
              "sha1": "e9581f7a725f2fe108b55946cb5c05d12aff2544",
              "sha256": "a0c72eba48c7874e8c4ee915bd0a05c0452950905568c126e26a1ff68fe699e3"
          },
          "dob": {
              "date": "1986-10-07T14:38:28.795Z",
              "age": 34
          },
          "registered": {
              "date": "2004-07-12T19:20:01.862Z",
              "age": 16
          },
          "phone": "(096)-499-2161",
          "cell": "(176)-486-5384",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/46.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/46.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/46.jpg"
          },
          "nat": "NZ"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Chloe",
              "last": "Fuller"
          },
          "location": {
              "street": {
                  "number": 3686,
                  "name": "Brick Kiln Road"
              },
              "city": "Armagh",
              "state": "Lothian",
              "country": "United Kingdom",
              "postcode": "Q0 4JU",
              "coordinates": {
                  "latitude": "-47.2347",
                  "longitude": "3.7979"
              },
              "timezone": {
                  "offset": "+5:30",
                  "description": "Bombay, Calcutta, Madras, New Delhi"
              }
          },
          "email": "chloe.fuller@example.com",
          "login": {
              "uuid": "da93765f-b2e5-48b8-aa88-eaddfdd669e5",
              "username": "silvercat515",
              "password": "abcdefg",
              "salt": "rir5vB7e",
              "md5": "e738041887b1e782396d080b0de67231",
              "sha1": "fc5d65358fdd3c92d212efb04c2a40e5ad17d772",
              "sha256": "9d6fb018bfc3dae2e14376036581c0f704601e902a62aad3bf474b7841403da3"
          },
          "dob": {
              "date": "1979-03-28T00:52:47.521Z",
              "age": 41
          },
          "registered": {
              "date": "2016-05-01T17:13:53.295Z",
              "age": 4
          },
          "phone": "015395 79573",
          "cell": "0778-585-605",
          "id": {
              "name": "NINO",
              "value": "KN 26 15 42 P"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/63.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/63.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/63.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Jocieri",
              "last": "Moura"
          },
          "location": {
              "street": {
                  "number": 6613,
                  "name": "Avenida D. Pedro Ii"
              },
              "city": "João Pessoa",
              "state": "Rio Grande do Norte",
              "country": "Brazil",
              "postcode": 66960,
              "coordinates": {
                  "latitude": "-12.0713",
                  "longitude": "96.1250"
              },
              "timezone": {
                  "offset": "+9:30",
                  "description": "Adelaide, Darwin"
              }
          },
          "email": "jocieri.moura@example.com",
          "login": {
              "uuid": "be901bf5-ea77-44ca-a100-450a11bdf7ce",
              "username": "tinyleopard221",
              "password": "chippy",
              "salt": "UmcClPvD",
              "md5": "da90df8ccd848bab1c5f14cb813eda53",
              "sha1": "540187f2f72d9fccc7ef6df3cf98a2aeaa12d3b0",
              "sha256": "3b2c04b0222c3936c8654d29a32fd53f7fb239171d00330dac260c448a870c71"
          },
          "dob": {
              "date": "1974-08-05T18:37:45.575Z",
              "age": 46
          },
          "registered": {
              "date": "2003-06-25T16:29:20.680Z",
              "age": 17
          },
          "phone": "(17) 7056-2227",
          "cell": "(84) 2422-7652",
          "id": {
              "name": "",
              "value": null
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/31.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/31.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/31.jpg"
          },
          "nat": "BR"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Madison",
              "last": "Gordon"
          },
          "location": {
              "street": {
                  "number": 6935,
                  "name": "Woodland St"
              },
              "city": "Virginia Beach",
              "state": "Utah",
              "country": "United States",
              "postcode": 59472,
              "coordinates": {
                  "latitude": "-31.1177",
                  "longitude": "-174.0916"
              },
              "timezone": {
                  "offset": "-3:00",
                  "description": "Brazil, Buenos Aires, Georgetown"
              }
          },
          "email": "madison.gordon@example.com",
          "login": {
              "uuid": "11d704e3-e97b-41b2-8040-613802fa6b0b",
              "username": "happymouse465",
              "password": "start",
              "salt": "IADGG9qd",
              "md5": "3c24af3e618e1b570156cc0af7da781a",
              "sha1": "b6c54c525ff95762a1c2a9f583b44014ac6158f8",
              "sha256": "0e4afa1655fc81013dc8c42135d2b560b0a255a021eb25c636b503683b79438c"
          },
          "dob": {
              "date": "1955-02-18T12:55:25.630Z",
              "age": 65
          },
          "registered": {
              "date": "2008-12-28T03:08:41.782Z",
              "age": 12
          },
          "phone": "(989)-283-7817",
          "cell": "(114)-534-3273",
          "id": {
              "name": "SSN",
              "value": "201-48-7126"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/60.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
          },
          "nat": "US"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Karen",
              "last": "Arnold"
          },
          "location": {
              "street": {
                  "number": 3761,
                  "name": "The Drive"
              },
              "city": "Westminster",
              "state": "Worcestershire",
              "country": "United Kingdom",
              "postcode": "O68 0YW",
              "coordinates": {
                  "latitude": "82.7574",
                  "longitude": "-85.7991"
              },
              "timezone": {
                  "offset": "+1:00",
                  "description": "Brussels, Copenhagen, Madrid, Paris"
              }
          },
          "email": "karen.arnold@example.com",
          "login": {
              "uuid": "66781601-4906-4422-91ac-7512bd4c5427",
              "username": "beautifulfrog900",
              "password": "mpegs",
              "salt": "CnXfBexM",
              "md5": "268b7dbf16d705fd83562a3998de8a0d",
              "sha1": "36f65c133ebfb1b06e49ee03e54a086fc51c2800",
              "sha256": "63b64a6e52aff2b34394c3e2a396fb195f27c5453853c24ae483a4137a591ea0"
          },
          "dob": {
              "date": "1973-07-26T07:05:04.364Z",
              "age": 47
          },
          "registered": {
              "date": "2010-10-08T01:55:18.201Z",
              "age": 10
          },
          "phone": "0171 572 1886",
          "cell": "0759-968-814",
          "id": {
              "name": "NINO",
              "value": "RK 25 28 52 S"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/0.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/0.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/0.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Miss",
              "first": "Crystal",
              "last": "Mcdonalid"
          },
          "location": {
              "street": {
                  "number": 5469,
                  "name": "Shady Ln Dr"
              },
              "city": "Ballarat",
              "state": "Victoria",
              "country": "Australia",
              "postcode": 3561,
              "coordinates": {
                  "latitude": "-63.9771",
                  "longitude": "89.2484"
              },
              "timezone": {
                  "offset": "+8:00",
                  "description": "Beijing, Perth, Singapore, Hong Kong"
              }
          },
          "email": "crystal.mcdonalid@example.com",
          "login": {
              "uuid": "71fac357-fa26-44a3-8a19-20e3a5c3d02d",
              "username": "organicmeercat508",
              "password": "muffin1",
              "salt": "jDTldo9A",
              "md5": "83e23bdfd6619d0eb29f192551b227ad",
              "sha1": "60e72985d58577a3401ef85c92022e7df3b2ee3f",
              "sha256": "45f7bd98a8f255b245d53d828cfbd7fdbd771a6334de472082e8f8f8e8e80869"
          },
          "dob": {
              "date": "1954-02-02T00:11:04.707Z",
              "age": 66
          },
          "registered": {
              "date": "2009-06-24T01:13:32.544Z",
              "age": 11
          },
          "phone": "07-1678-8447",
          "cell": "0491-356-058",
          "id": {
              "name": "TFN",
              "value": "028507390"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/68.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/68.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/68.jpg"
          },
          "nat": "AU"
      },
      {
          "gender": "female",
          "name": {
              "title": "Mrs",
              "first": "Laura",
              "last": "Cruz"
          },
          "location": {
              "street": {
                  "number": 897,
                  "name": "Mill Road"
              },
              "city": "Cardiff",
              "state": "County Tyrone",
              "country": "United Kingdom",
              "postcode": "NT3 8LT",
              "coordinates": {
                  "latitude": "-75.8279",
                  "longitude": "134.2649"
              },
              "timezone": {
                  "offset": "-6:00",
                  "description": "Central Time (US & Canada), Mexico City"
              }
          },
          "email": "laura.cruz@example.com",
          "login": {
              "uuid": "95a80478-6bc7-4e92-bbb9-cbdf4fe7f897",
              "username": "orangepeacock902",
              "password": "1971",
              "salt": "E0EGmRZJ",
              "md5": "13bf28e895152d0069bbc69858e765d1",
              "sha1": "f4879b173f2b3349b08afc10952532e025e0ee7c",
              "sha256": "7bcba4b316faf7a31747b79ee555e8d69cf9f453421e5424c5084c70a902e41d"
          },
          "dob": {
              "date": "1997-03-13T18:55:08.945Z",
              "age": 23
          },
          "registered": {
              "date": "2004-12-18T11:27:15.656Z",
              "age": 16
          },
          "phone": "016977 6318",
          "cell": "0762-035-637",
          "id": {
              "name": "NINO",
              "value": "ZG 33 98 79 L"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/26.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/26.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/26.jpg"
          },
          "nat": "GB"
      },
      {
          "gender": "female",
          "name": {
              "title": "Ms",
              "first": "Barbara",
              "last": "Brewer"
          },
          "location": {
              "street": {
                  "number": 7671,
                  "name": "Victoria Street"
              },
              "city": "Cardiff",
              "state": "Gloucestershire",
              "country": "United Kingdom",
              "postcode": "E6X 2UX",
              "coordinates": {
                  "latitude": "26.5084",
                  "longitude": "-114.6619"
              },
              "timezone": {
                  "offset": "+10:00",
                  "description": "Eastern Australia, Guam, Vladivostok"
              }
          },
          "email": "barbara.brewer@example.com",
          "login": {
              "uuid": "af421bde-36e5-486f-9d72-c155eaf5456d",
              "username": "silverbear969",
              "password": "theboss",
              "salt": "YuT2JWP8",
              "md5": "b7ecbb9686746ffb295f7f4debbb2937",
              "sha1": "6906b24be191327939e9a7291eed075a3542bbab",
              "sha256": "cc45caa448af136e0967fb7b218fbb907db5bf42e3b5849246c9b6b0ebe32320"
          },
          "dob": {
              "date": "1988-03-23T11:42:41.837Z",
              "age": 32
          },
          "registered": {
              "date": "2014-10-18T16:37:29.352Z",
              "age": 6
          },
          "phone": "0119641 555 0590",
          "cell": "0769-720-255",
          "id": {
              "name": "NINO",
              "value": "EA 46 84 71 L"
          },
          "picture": {
              "large": "https://randomuser.me/api/portraits/women/15.jpg",
              "medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
              "thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
          },
          "nat": "GB"
      }
  ],
  "info": {
      "seed": "2675c0fd591e6cfa",
      "results": 30,
      "page": 1,
      "version": "1.3"
  }
}

const programs = [
  "Bio-Resource Engineering",
  "Biomedical Engineering",
  "Chemical Eng-Chem Honours",
  "Chemical Engineering",
  "Civil Engineering",
  "Commerce",
  "Computer Engineering",
  "Economics",
  "Electrical Eng",
  "Engineering Physics",
  "Entrepreneurship",
]

export function generateAccounts(): void {
  const salt = bcrypt.genSaltSync(10)

  const accounts = testAccounts.results.map(a => ({
    name: `${a.name.first} ${a.name.last}`,
    email: a.email,
    password: bcrypt.hashSync("password", salt),
    program: Math.floor(Math.random()*programs.length),
    dateCreated: new Date(),
    facebook: {
      facebookId: "28273637532827363753",
      name: `${a.name.first} ${a.name.last}`,
      email: a.email,
      hometown: `${a.location.city}, ${a.location.country}`,
      profilePicURL: a.picture.large,
      likes: []
    },
    spotify: {
      accessToken: "28273637532827363753",
      refreshToken: "28273637532827363753",
      spotifyId: "28273637532827363753",
      displayName: a.login.username,
      email: a.email,
      url: "",
      followers: Math.floor(Math.random()*100000),
      image: {
        height: 500,
        width: 500,
        url: a.picture.large
      },
      country: a.location.country,
      artists: [],
      tracks: []
    }
  }))

  console.log(JSON.stringify(accounts))
}
<style>
.nested {
  margin-left: 20px;
}
</style>

# Introduction

The [your-api-name] API is a set of high-performance RESTful JSON endpoints designed specifically to meet the critical functionality of our application.

This API reference includes all the technical documentation developers need to maintain and interface with the service. Additional answers to common questions can be found in the [link-to-your-faq-page]().

# Quick Start Guide

For developers eager to hit the ground running with the [your-api-name] API here are a few quick steps to make your first call with the API.

1. **Sign up for free.** You can sign up at [your-site-dns] - This is our live production environment with the latest data.
2. **Sign in to gain access.** Once you register and confirm your account you'll have all the API endpoints at your disposal. remember that some require authentication and to access them you will need to log in.
3. **Make a test call using your key.** You can use the code examples below to perform a test call with the programming language of your choice. This example makes a ping call to test the connection. Be sure that you are using the API domain [your-api-dns] while testing.
4. **Postman Collection** To help with development, we provide a fully featured postman collection that you can import and use immediately! You can download it [here](https://www.postman.com/downloads/). After you set up Postman, you can import [your-service-name]'s latest Postman collection by adding this URL: [url-to-your-postman-collection] in the import collection secction in your main page inside postman.
5. **Implement your application.** Now that you've confirmed your API Key is working, get familiar with the API by reading the rest of this API Reference and start building your application!

**\*Note:** Making HTTP requests on the client side with Javascript is currently prohibited through CORS configuration. This is to protect your API Key which should not be visible to users of your application so your API Key is not stolen. Secure your API Key by routing calls through your own backend service.\*

<details>
  <summary><b>View Quick Start Code Examples<b></summary>
  <details class="nested">
    <summary>cURL</summary>
    
    curl --location 'https://your-domain/v1/health/ping'

  </details>
  <details class="nested">
    <summary>Node.js</summary>
    
    fetch("https://your-domain/v1/health/ping")
      .then(response => response.json())
      .catch(error => console.log('error', error));

  </details>
  <details class="nested">
    <summary>Python</summary>
    
    import requests
    response = requests.request("GET", "https://your-domain/v1/health/ping")
    print(response.json())

  </details>
  <details class="nested">
    <summary>Dart</summary>

    import 'package:dio/dio.dart';

    void main() async {
      final dio = Dio();

      try {
        final response = await dio.get('https://your-domain/v1/health/ping');
        print(response.data);
      } catch (e) {
        print('Error: $e');
      }
    }

  </details>

</details>

<br>

### Postman Instructions

<br>

<video src="./assets/postmanInstructions.mp4" controls="controls"></video>

# Authentication

<h2>Acquiring an API Key</h2>

Most HTTP requests made against the [your-service-name] API must be validated with an API Key. If you don't have an API Key yet visit the [your-registration-page]() and register for one.

<h2>Using Your API Key</h2>

You may use any server side programming language that can make HTTP requests to target the [your-service-name] API. All requests should target domain https://your-domain.

You can supply your API Key in REST API calls in this way:

- **Cookie:** Via a cookie named `<service-name>-api-key` (NOT IMPLEMENTED)
- **Headers:** Via a header named `x-api-key`

**\*Security Warning:** It's important to secure your API Key against public access. The cookie option is strongly recommended over the custom header option for passing your API Key in a production environment.\*

# Endpoint Overview

The [your-service-name] API is divided into 5 top-level categories

| Endpoint Category         | Description                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| [/health/\*](#tag/Health) | Endpoints informing whether the api is accessible.               |
| [/auth/\*](#tag/Auth)     | Endpoints handling authentication, credential recovery and more. |

<h3>There may be other endpoints that offer different ways of accessing the data depending on their purpose.</h3>

- **Listing endpoints:** Flexible paginated endpoints allow sorting and filtering of data lists such as games by gameType.
- **Item endpoints:** Convenient ID-based resource endpoints allow you to extract information from a specific ID.

# Standards and Conventions

Each HTTP request must contain the header `Accept: application/json`. You should also send an `Accept-Encoding: deflate, gzip` header to receive data fast and efficiently.

<h2>Endpoint Response Payload Format</h2>

All endpoints return data in JSON format with the results of your query under `data` if the call is successful.

A `Status` object is always included for both successful calls and failures when possible. The `Status` object always includes the current time on the server when the call was executed as `timestamp`, and the number of milliseconds it took to process the request as `elapsed`. Any details about errors encountered can be found under the `error_code` and `error_message`. See [Errors and Rate Limits](#section/Errors-and-Rate-Limits) for details on errors.
The `meta` object is only included in listing requests.

```
{
  "meta" : {
    ...
  },
  "data" : {
    ...
  },
  "status": {
    "timestamp": "2023-02-18T14:51:41.370Z",
    "error_code": 400,
    "error_message": "Invalid value for id",
    "elapsed": 0,
    "credit_count": 0
  }
}
```

<br>
<h2>Date and Time Formats</h2>

- All endpoints requiring date/time parameters require timestamps to be passed in ISO 8601 format (e.g. 2018-06-06T01:46:40Z). Timestamps passed in ISO 8601 format support basic and extended notations; if no timezone is included, UTC will be the default.
- All timestamps returned in JSON payloads are returned in UTC time using the human-readable ISO 8601 format that follows this pattern: yyyy-mm-ddThh:mm:ss.mmmZ. The trailing .mmm indicates milliseconds. According to the ISO 8601 specification, the final Z is a constant representing UTC time.
- Data is collected, recorded and reported in UTC time unless otherwise specified.

<h2>Versioning</h2>

The [your-service-name] API is versioned to guarantee new features and updates are non-breaking. The latest version of this API is `/v1/`

# Errors and Rate Limits

<h2>API Request Throttling</h2>

Use of the [your-service-name] API is subject to API call rate limiting or "request throttling". This is the number of HTTP calls that can be made simultaneously or within the same minute with your API Key before receiving an HTTP 429 "Too Many Requests" throttling error. This limit scales with the usage tier and resets every 60 seconds. Please review our Best Practices for implementation strategies that work well with rate limiting.

<h2>HTTP Status Codes</h2>

The API uses standard HTTP status codes to indicate the success or failure of an API call.

- `400 (Bad Request)` The server could not process the request, likely due to an invalid argument.
- `401 (Unauthorized)` Your request lacks valid authentication credentials, likely an issue with your API Key.
- `403 (Forbidden)` Your request was rejected due to a permission issue.
- `429 (Too Many Requests)` The API Key's rate limit was exceeded; consider slowing down your API Request frequency if this is an HTTP request throttling error.
- `500 (Internal Server Error)` An unexpected server issue was encountered.

<h2>Error Response Codes</h2>

A `Status` object is always included in the JSON response payload for both successful calls and failures when possible. During error scenarios you may reference the `error_code` and `error_message` properties of the Status object. One of the API error codes below will be returned if applicable otherwise the HTTP status code for the general error type is returned.

| HTTP Status | Error Code                               | Error Message                                                                           |
| :---------: | :--------------------------------------- | :-------------------------------------------------------------------------------------- |
|     401     | 401 `API_KEY_INVALID`                    | This API Key is invalid.                                                                |
|     401     | 401 `API_KEY_MISSING`                    | API key missing.                                                                        |
|     403     | 403 `API_KEY_REQUIRED`                   | An API Key is required for this call.                                                   |
|     403     | 403 `API_KEY_DISABLED`                   | This API Key has been disabled. Please contact [your-support-page]().                   |
|     429     | 429 `API_KEY_MINUTE_RATE_LIMIT_REACHED`  | You've exceeded your API Key's HTTP request rate limit. Rate limits reset every minute. |
|     429     | 429 `API_KEY_DAILY_RATE_LIMIT_REACHED`   | You've exceeded your API Key's daily rate limit.                                        |
|     429     | 429 `API_KEY_MONTHLY_RATE_LIMIT_REACHED` | You've exceeded your API Key's monthly rate limit.                                      |
|     429     | 429 `IP_RATE_LIMIT_REACHED`              | You've hit an IP rate limit.                                                            |

# Best Practices

This section contains a few recommendations on how to efficiently utilize the [your-service-name] API for your enterprise application, particularly if you already have a large base of users for your application.

<h2>Implement a Caching Strategy If Needed</h2>

There are standard legal data safeguards included in the [your-Commercial Terms]() of Use that app developers should be aware of. These conditions help prevent unauthorized scraping and redistribution of [your-service-name] data, but are intentionally worded to allow legitimate local caching of system data to support the operation of your application. If your application has a significant user base and you are concerned about staying within API throttling limits, consider implementing a data caching strategy.

For example, instead of making a call to /users every time one of your application's users needs to get the stats for a group of users, you could pre-fetch and cache the latest user data in your application's local database every 60 seconds. This would only require 1 API call, /users, every 60 seconds. Then, every time one of your application's users needs to load a custom list of users, you could simply pull this latest market data from your local cache without the overhead of additional calls. This type of optimization is practical for customers with large and demanding user bases.

<h2>Code Defensively to Ensure a Robust REST API Integration</h2>

Whenever implementing any high availability REST API service for mission critical operations it's recommended to [code defensively](https://en.wikipedia.org/wiki/Defensive_programming). Since the API is versioned, any breaking request or response format change would only be introduced through new versions of each endpoint, however existing endpoints may still introduce new convenience properties over time.

We suggest these best practices:

- You should parse the API response JSON as JSON and not through a regular expression or other means to avoid brittle parsing logic.
- Your parsing code should explicitly parse only the response properties you require to guarantee new fields that may be returned in the future are ignored.
- You should add robust field validation to your response parsing logic. You can wrap complex field parsing, like dates, in try/catch statements to minimize the impact of unexpected parsing issues (like the unlikely return of a null value).
- Implement a "Retry with exponential backoff" coding pattern for your REST API call logic. This means if your HTTP request happens to get rate limited (HTTP 429) or encounters an unexpected server-side condition (HTTP 5xx) your code would automatically recover and try again using an intelligent recovery scheme. You may use one of the many libraries available; for example, [this one](https://github.com/tim-kos/node-retry) for Node or [this one](https://github.com/litl/backoff) for Python.

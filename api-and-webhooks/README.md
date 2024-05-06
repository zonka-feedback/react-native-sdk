# API & Webhooks

## Introduction

Zonka Feedback REST APIs allow you to retrieve response details, contacts, surveys, and more. You can use these to pass these details to any application that you or your organization is using such as CRMs, databases, or any custom-built solution.

## API Key Authentication

The Zonka Feedback API provides an API token-based authentication system. To access the APIs you would need a valid Auth Token. The token can be created as follows:

1. Navigate to Company Settings > Developers > API
2. Select API
3. Click "Generate Token" to create your token.

API tab is only accessible to Admin users within the Zonka account. The token will have the entire scope of the Admin user and can be used to access all datasets associated with the account.

{% hint style="info" %}
If you already have a valid API token, "Generate Token" will replace it with a new one (the old one will expire immediately). Any existing API calls will not work until they are updated to use the new token.
{% endhint %}

### Base URLs and Datacenters

Zonka Feedback is hosted in two regions - the United States and European Union.&#x20;

#### How to find in which region your Zonka Feedback account is hosted?

1. Go to Settings on your Zonka Feedback Platform.
2. In Settings, go to the 'Developers' panel.&#x20;
3. In the 'Developers' panel, go to the 'APIs' tab.
4. Here under the 'Datacenter', you will see the region of your account.&#x20;

If your region is US, then you can access the public APIs with the base URL provided below

{% code title="United States Datacenter" %}
```
https://us1.apis.zonkafeedback.com
```
{% endcode %}

If your region is EU, then you can access the public APIs with the base URL provided below

{% code title="European Union Datacenter" %}
```
https://e.apis.zonkafeedback.com
```
{% endcode %}

## Responses

API responses will contain JSON objects. Most paginated responses have a default of **25** items returned under the result field. Some API calls will allow the user to override the default page size for paginated responses.



### HTTP Response Codes

<table data-card-size="large" data-view="cards"><thead><tr><th>HTTP RESPONSE CODE</th><th>DESCRIPTION</th></tr></thead><tbody><tr><td><strong>200 - OK</strong></td><td>The request succeeded.</td></tr><tr><td><strong>201 - Accepted</strong></td><td>When a new object is created in the system.</td></tr><tr><td><strong>400 - Bad Request</strong></td><td>There was something invalid about the request.</td></tr><tr><td><strong>401 - Unauthorized</strong></td><td>The API user could not be authenticated or does not have authorization to access the requested resource.</td></tr><tr><td><strong>403 - Forbidden</strong></td><td>The API user authenticated and made a valid request, but is not authorized to access the requested resource.</td></tr><tr><td><strong>404 - Not Found</strong></td><td>The requested resource could not be found.</td></tr><tr><td><strong>415 - Unsupported Media Type</strong></td><td>The request entity has a media type which the server or resource does not support. (Usually the accepts header of the call has an invalid value or a value the server does not support.)</td></tr><tr><td><strong>500 - Internal Server Error</strong></td><td>This indicates a problem internal to the ZF API and usually cannot be corrected by the user. Please contact Zonka Feedback Support with the <strong>requestId</strong> and <strong>errorCode</strong> found in the response.</td></tr></tbody></table>

### Date and Time

The Zonka Feedback APIs use date and time values which follow the [ISO 8601](https://en.wikipedia.org/wiki/ISO\_8601) standard. Each value represents a specific point in time. Also, some older endpoints feature Unix time instead of ISO 8601.

#### **ISO 8601 Date and Time Format**

In general, although the ISO 8601 standard specifies many different date and time formats, the typical date and time value specifies the date as YYYY-MM-DD (where _YYYY_ indicates a four-digit year, _MM_ is a two-digit month, and _DD_ is the two-digit day of the month) followed by the character "T" and then the time as hh:mm:ss (where _hh_ is a two-digit hour in military time format \[00-23, no AM or PM], _mm_ is the two-digit minutes past the hour, and _ss_ is the two-digit seconds) followed by the character **Z** which indicates UTC. Instead of **Z**, a time zone offset from UTC can be indicated as plus (**+**) or minus (**-**) followed by HH:mm.

{% hint style="info" %}
The following shows examples of ISO 8601 dates and times:

* 2019-03-21T10:16:12Z000 represents March 21, 2019 at 10:16:12 AM and 0 milliseconds UTC.
* 2016-04-01T07:31:43Z represents April 1, 2016 at 7:31:43 AM UTC.
* 2017-02-07T14:02:11-08:00 represents February 7, 2017 at 2:02:11 PM in the PST time zone (UTC minus 8 hours).
{% endhint %}

All dates and time values returned by the APIs are expressed in UTC unless the API allows you to return values in local time.\

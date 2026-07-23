# Webhooks

Webhooks are automated messages sent from Zonka Feedback when a new survey response (or partial response) is added.\
​

Webhooks are always sent as an HTTP POST request to the webhook URLs you've configured via your Webhooks integration. The details of the activity that triggered the webhook are sent as the body of the HTTP request in JSON format.

## Event Types <a href="#h_9522c02a19" id="h_9522c02a19"></a>

We support the following event types. Zonka Feedback now offers a new, cleaner webhook payload along with the legacy payload for backward compatibility. If you are setting up a new webhook, we recommend using the new events.&#x20;

| Type                   | Description                                                                                                                                                                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| response.added         | Triggered when a new response is received for a survey. The event JSON includes all details of the response, including respondent details, scores, AI insights (sentiment, urgency, intent, emotion), and each survey question with the answer provided by the respondent. |
| partial.response.added | Triggered when a partial (incomplete) response is captured for a survey. The payload structure is the same as response.added, containing only the answers captured so far.                                                                                                 |

\
​

***

## Example Response <a href="#h_5f632435f6" id="h_5f632435f6"></a>

The new payload is leaner and more consistent. It removes internal flags and duplicate keys, adds event metadata (`eventType` and `eventId`), and simplifies contact and response attributes.\
​

```
{
  "id": "6a5514a896b91ca4c812a678",
  "surveyId": "69fde27e4fcfc10ae574571e",
  "surveyName": "TicketClosure Survey",
  "surveyLanguage": "en_US",
  "receivedDate": "2026-07-13T16:39:01.000Z",
  "timeZone": "Asia/Kolkata",
  "eventType": "response.added",
  "eventId": "6a5514a896b91ca4c812a680",
  "respondentDetails": {
    "name": "Steve Waugh",
    "emailAddress": "steve.waugh@yahoo.com",
    "mobile": "+918989898989",
    "externalId": "DE7911"
  },
  "locationId": "63b51a77891bf7000844b630",
  "locationName": "Mumbai",
  "tags": [
    {
      "name": "Bad Experience"
    }
  ],
  "geoLocation": "INDIA",
  "webDevice": "Desktop",
  "browser": "Chrome",
  "ratedUserId": "69fde2887b2f37900de805a9",
  "ratedUserName": "Andrew Strauss",
  "channel": "Online",
  "sentiment": "neutral",
  "urgency": "Medium",
  "intent": [
    "Complaint"
  ],
  "emotion": [
    "Concerned"
  ],
  "CSAT": 5,
  "NPS": 10,
  "CES": 1,
  "responseURL": "https://platform.zonkafeedback.com/responseinbox/6a5514a896b91ca4c812a678",
  "contactAttributes": [
    {
      "variableId": "contact_number",
      "value": "9890",
      "type": "Number"
    }
  ],
  "responseAttributes": [
    {
      "variableId": "booking_pnr",
      "value": "PR24WT"
    }
  ],
  "surveyResponse": [
    {
      "questionId": "69fde2887b2f37900de805a9",
      "questionLabel": "How was your experience with us?",
      "answer": "overjoyed"
    },
    {
      "questionId": "699ebc50e1d1b8d9970bfae4",
      "questionLabel": "The company made it easy for me to handle my issues",
      "answer": "Strongly Disagree"
    },
    {
      "questionId": "60d30beeef7c44000837994a",
      "questionLabel": "How likely are you to recommend flying with us to your friends, family, and colleagues?",
      "answer": "10"
    },
    {
      "questionId": "6a3e5c412e4e74aeacea3b91",
      "questionLabel": "Enter Date of travel",
      "answer": "2026-07-31"
    }
  ]
}
```

### New Payload — Field Reference <a href="#h_b2c3611cab" id="h_b2c3611cab"></a>

| Field                                  | Description                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| id                                     | Unique ID of the response.                                                                  |
| surveyId / surveyName / surveyLanguage | Details of the survey the response belongs to.                                              |
| receivedDate                           | Date and time (UTC) when the response was received.                                         |
| timeZone                               | Time zone of the account/location.                                                          |
| eventType                              | The event that triggered this webhook, e.g. `response.added` or `partial.response.added`.   |
| eventId                                | Unique ID of this webhook event — useful for de-duplication on your end.                    |
| respondentDetails                      | Respondent's name, email address, mobile number, and external ID (if captured).             |
| locationId / locationName              | Location the response was captured at.                                                      |
| tags                                   | Tags applied to the response.                                                               |
| geoLocation / webDevice / browser      | Where and how the response was submitted.                                                   |
| ratedUserId / ratedUserName            | The team member rated in the response (if applicable).                                      |
| channel                                | Distribution channel of the survey (e.g. Online, Email, SMS).                               |
| sentiment / urgency / intent / emotion | AI-generated insights for the response.                                                     |
| CSAT / NPS / CES                       | Scores for the response, where applicable.                                                  |
| responseURL                            | Direct link to view the response in the Response Inbox.                                     |
| contactAttributes                      | Contact attributes captured with the response, each with `variableId`, `value`, and `type`. |
| responseAttributes                     | Response attributes (hidden/URL variables), each with `variableId` and `value`.             |
| surveyResponse                         | Array of questions answered, with `questionId`, `questionLabel`, and `answer`.              |

***



## Getting Started with Webhooks <a href="#h_1feb59bc5a" id="h_1feb59bc5a"></a>

Here's how you can get started with using Webhooks.

1.  Navigate to Settings > Developers > Webhooks


2.  Click on 'Add Webhook'


3. Enter the following details:
   * Name: Name of the webhook
   * Event: Response Received
     * When a new survey response is received for the specified survey
   * Target URL:
     1. URL where the JSON for the survey response is to be sent
     2. This can be a Target URL in any CRM, HRMS or any other 3rd party system that accepts webhook event data
   * Survey: Specify the survey whose response will trigger this webhook
   * Additional Parameters: You can specify any additional key:value pairs as comma-separated which can be added to the response JSON that will be sent.
4. Save the Webhook

***

## Webhook Logs <a href="#h_934f800d72" id="h_934f800d72"></a>

When webhooks are triggered they a log is saved for successful or any unsuccessful requests. To view the Webhook Logs, follow these steps.

* Go to Settings > Developers > Webhooks
* Click on 'View Logs'

# Send SMS Survey

You can refer to the Zonka Feedback Send SMS Survey API documentation [here ](https://apidocs.zonkafeedback.com/#54ddcdba-11d4-440a-8245-664a9b76a1e5)and learn more from the sample request and responses provided.

## Basic SMS Survey

To send out a quick SMS Survey using API you need just the required parameters to be passed. If any of the optional parameters are not passed the default SMS template that has been saved for the particular survey will be sent. If any of the Optional parameters are passed the sections of the SMS corresponding to the parameters passed will be overwritten.

<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

The below are the required parameters for an SMS survey&#x20;

| Parameter  | Value  | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| `surveyId` | string | SurveyId of the survey to be sent                                                       |
| `mobile`   | string | Mobile number of the recipient to which the SMS is to be sent. Accepted format is E.164 |

{% hint style="info" %}
Learn more about the mobile number format  E.164 [here](https://www.twilio.com/docs/glossary/what-e164).
{% endhint %}

## Customizing SMS

You can customize the SMS survey with some additional parameters such as a customized message and other parameters mentioned in the table below.&#x20;

| Parameter    | Value  | Description                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| `linkId`     | string | Survey linkId to be used                                                      |
| `name`       | string | Name of the recipient                                                         |
| `message`    | string | Content for message body of the SMS                                           |
| `locationId` | string | Specify the Location Id of the location you want the email survey to be sent. |

The above is a list of non-mandatory variables to customize the content and distribution of the SMS survey.

## Send Additional Data

You can pass additional data as post parameters in the Send SMS Survey API. You will be able to send Survey, Contact, and Hidden variables. To pass these variables you will need to use the `attributes` parameter.

| Parameter    | Value                      | Description                            |
| ------------ | -------------------------- | -------------------------------------- |
| `attributes` | object with key-value pair | Key-value pair of survey attributes.   |

#### Using Custom Variables via API

Occasionally, just by looking at where a respondent viewed the survey link, you will know certain details about them before they ever answer your survey. Custom variables let you send data through the survey web link and APIs, which may then be shown inside the survey and on any reports the survey generates. Please read more about supported variables [here](https://help.zonkafeedback.com/en/articles/5336596-personalize-your-questionnaire-with-our-custom-variables).

Zonka Feedback supports three types of custom variables -

1. Survey Variables
2. Contact Variables
3. Hidden Variables

```json
attributes
 {
      "flight_number": "EK 234",
      "flight_date": "10-10-2022",
      "flight_destination": "Barcelona",
      "contact_email":"carpenterj@xyz.com"
 }
```

## Schedule SMS&#x20;

By giving value for the `scheduleDateTime` parameter, you may also plan for the SMS survey to be sent at a later time. With this, you may choose the precise time and date at which the survey SMS from Zonka Feedback should be sent to the recipient.

| Parameter          | Value  | Description                                                             |
| ------------------ | ------ | ----------------------------------------------------------------------- |
| `scheduleDateTime` | string | Specify a future Date and Time for which SMS survey is to be scheduled. |

## Send to Contact Lists

Zonka Feedback supports two types of Contact Lists and Segments: Dynamic and Static. You can send SMS surveys to multiple recipients by adding them to these contact lists and specifying the list name in the Send SMS Survey  API. &#x20;

| Parameter | Value  | Description                                                           |
| --------- | ------ | --------------------------------------------------------------------- |
| `list`    | string | Specify the Contact List names to which the SMS survey is to be sent. |

{% hint style="info" %}
You can fetch a list of Contact Lists in your account using the [GET Contact Lists API](https://apidocs.zonkafeedback.com/#1cdca186-e86f-45c4-9a85-f6e3bcb2f872)
{% endhint %}

## Set up SMS Survey Throttling&#x20;

By default, Survey Throttling is set to 30 days for your Zonka Feedback account. That means SMS will not be delivered to a recipient for the next 30 days if sent today. This setting can be changed or switched off from the Web App. While sending SMS Surveys via API you can set this setting to be ignored.

| Parameter           | Value   | Description                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------ |
| `ignoreThrottling`  | boolean | Set as `true` if you want to ignore your survey throttling settings, `false` if not. |

## Getting Help <a href="#getting-help" id="getting-help"></a>

If you need any help regarding the APIs please reach out to us at <mark style="color:blue;">hello@zonkafeedback.com.</mark>

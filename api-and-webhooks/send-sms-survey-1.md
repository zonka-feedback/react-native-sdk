---
hidden: true
---

# Send WhatsApp Surveys

## Setting up WhatsApp&#x20;

### Connecting your Infobip account

Zonka Feedback currently supports Infobip as the WhatsApp Service partner. If you don't have an Infobip account you can signup for it or if you would prefer us to help set it up you can schedule a call with us here.

Once you have set up your Infobip account and your senders you will need to connect it with your Zonka Feedback account. Here is how you can do it:

1. Login to your Zonka Feedback account
2. Navigate to Company Settings > WhatsApp Surveys > WhatsApp Setup
3. Enter the following details which are available in your Infobip account
   * API Key
   * Endpoint
   * WhatsApp Sender
4. Once updated these settings will be used to run the WhatsApp/SMS messaging on the account

### Accessing WhatsApp Distribution Channel

#### **Preparing the Template**

The user needs to register a WhatsApp template in Infobip. **Zonka Feedback** currently supports two types of templates:

1. Text-based template without a button.
2. Text-based template with a button.

**Important Notes for Button-based Templates**

* If using button-based templates, the template must be pre-configured with the domain of your Zonka Feedback account region.
  * **For US region:** `us1.zonka.co/{{1}}`
  * **For EU region:** `e.zonka.co/{{1}}`
* You can use multiple placeholders (e.g., `{{1}}`, `{{2}}`) in the template content as needed.

#### **Mapping the Template Placeholders**

Follow these steps to map the placeholders for a survey in Zonka Feedback:

1. **Navigate to the Survey:**
   * Go to your Zonka Feedback dashboard and select the survey you wish to distribute via WhatsApp.
2. **Open the Distribute Section:**
   * Click on the survey name to open its settings.
   * Navigate to the **Distribute** tab, and select **SMS & WhatsApp**.
3. **Configure Placeholder Mappings:**
   * Click on **Placeholder Mappings**.
   * From the list, choose the **Infobip template** you want to set the mapping for.
4. **Map the Attributes**
   * Add the attributes you want to map to each placeholder in the template. For example, you can map customer names, order IDs, or survey URLs.
   * **Mandatory Attribute:** Ensure that one of the placeholders is mapped to the `{{URL}}` attribute, which is required to send the WhatsApp message successfully.
5. **Save and Send**
   * Once all placeholders are mapped and the `{{URL}}` is set, your WhatsApp template is ready to send.
   * You can now distribute the survey via WhatsApp using the mapped template.

## Basic WhatsApp Survey

To send out a quick WhatsApp Survey using API you need just the required parameters to be passed. Please note that in order to do so you will need to save one template as default.&#x20;

If any of the optional parameters are not passed the default WhatsApp template that has been saved for the particular survey will be sent.&#x20;

The below are the required parameters for a WhatsApp survey&#x20;

| Parameter  | Value  | Description                                                                                          |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `surveyId` | string | SurveyId of the survey to be sent                                                                    |
| `mobile`   | string | Mobile number of the recipient to which the WhatsApp message is to be sent. Accepted format is E.164 |

{% hint style="info" %}
Learn more about the mobile number format  E.164 [here](https://www.twilio.com/docs/glossary/what-e164).
{% endhint %}

**Example Request**

```

{
  "surveyId": "5f3e63edce6aee000774d4ba",
  "mobile": "+917982050158"
}

```

## Customizing your WhatsApp message

You can customize the survey with some additional parameters such as a customized message and other parameters mentioned in the table below. For this you will need to create appropriate templates.

| Parameter          | Value  | Description                                                                                                    |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| `name`             | string | Name of the recipient.                                                                                         |
| `from`             | string | The sender number from which the WhatsApp message will be sent (auto-filled from configuration if omitted)     |
| `templateName`     | array  | Name of the template registered in Infobip, containing only lowercase alphanumeric characters and underscores. |
| `templateLanguage` | string | Pass the language linked to the template                                                                       |
| `locationId`       | string | Specify the Location Id of the location you want the email survey to be sent.                                  |
| `language`         | string | The language in which the survey should be opened.                                                             |

The above is a list of non-mandatory variables to customize the content and distribution of the SMS survey.

## Sending a specific template

If you wish to send a specific template from your account to your contacts then you will need to specify the specific template in your request

```json
{
    
    "surveyId": "5f3e63edce6aee000774d4ba",
    "mobile": "+917982050158",
    "templateName": "zf_template",
    "attributes":
 {
      "flight_no": "EK 234",
      "flight_date": "10-10-2022"
 } 
 }
```

## Send Additional Data

You can pass additional data as post parameters in the Send WhatsApp Survey API. You will be able to send Survey, Contact, and Hidden variables. To pass these variables you will need to use the `attributes` parameter.

| Parameter    | Value                      | Description                            |
| ------------ | -------------------------- | -------------------------------------- |
| `attributes` | object with key-value pair | Key-value pair of survey attributes.   |

#### Sending Variables via API

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

## Schedule WhatsApp Message&#x20;

By giving value to the `scheduleDateTime` parameter, you can set the WhatsApp message to be sent at a later time.&#x20;

| Parameter          | Value  | Description                                                             |
| ------------------ | ------ | ----------------------------------------------------------------------- |
| `scheduleDateTime` | string | Specify a future Date and Time for which SMS survey is to be scheduled. |

## Send to Contact Segments

Zonka Feedback supports two types of Contact segments (formerly Lists): Dynamic and Static. You can send WhatsApp surveys to multiple recipients by adding them to these contact lists and specifying the list name in the Send WhatsApp Survey  API. &#x20;

| Parameter | Value  | Description                                                              |
| --------- | ------ | ------------------------------------------------------------------------ |
| `list`    | string | Specify the Contact segment names to which the SMS survey is to be sent. |

{% hint style="info" %}
You can fetch a list of Contact Lists in your account using the [GET Contact Lists API](https://apidocs.zonkafeedback.com/#1cdca186-e86f-45c4-9a85-f6e3bcb2f872)
{% endhint %}

## Set up WhatsApp Survey Throttling&#x20;

By default, Survey Throttling is set to 30 days for your Zonka Feedback account. That means messages will not be delivered to a recipient for the next 30 days if sent today. This setting can be changed or switched off from the Web App. While sending WhatsApp Surveys via API you can set this setting to be ignored.

| Parameter           | Value   | Description                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------ |
| `ignoreThrottling`  | boolean | Set as `true` if you want to ignore your survey throttling settings, `false` if not. |

## Getting Help <a href="#getting-help" id="getting-help"></a>

If you need any help regarding the APIs please reach out to us at <mark style="color:blue;">hello@zonkafeedback.com.</mark>

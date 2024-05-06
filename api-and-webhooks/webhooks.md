# Webhooks

Webhooks facilitate seamless communication with third-party applications by transmitting survey data to a designated URL known as the Webhook URL. Each newly submitted survey response initiates a request to the specified webhook URL, delivering the associated survey response data.

An exemplary use case for webhooks lies in their effectiveness in integration with online ticketing software such as Freshdesk and Zendesk. This integration enables the tracking and monitoring of survey responses without the need to navigate between two separate software platforms.

By employing webhooks, users gain access to real-time, instantaneous information, significantly reducing stress and effort. To configure webhooks on Zonka Feedback, follow these steps:

## Adding a Webhook

1. Navigate to Settings > Developers > Webhooks
2. To create a new webhook, click on the Add Webhook button
3. On the Add Webhook popup add the relevant details as follows:
   * **Name** - Name your webhook&#x20;
   * **Event** - Select an option from following two:
     * `response.added` :triggers when a complete survey response comes in
     * `partial.response.added`: triggers when a partial response comes in
   * **Target URL** : Enter URL which will receive the webhook payload
   * **Survey** : Response of this survey will trigger the webhook
   * **Additional Parameters** : Pass any additional parameters (key value pairs) which will be included in the payload of the webhook along with response payload.
4. Click Add to save and you are done.

## Managing Webhooks

You can edit and delete webhook from the Webhooks listing page.



## View Logs

All webhooks will log their statuses if they were a success or have failed. You can view this by clicking the View Logs button.

* HTTP response code 200 would mean the webhook has successfully executed
* HTTP response code 500 would mean that webhook has failed to executed due to some errors










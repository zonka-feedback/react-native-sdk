---
description: Let us dive deeper in what can you achieve with Zonka Feedback web widgets.
---

# Client Reference

## Web Surveys and Workspaces

Our web client for web surveys is workspace specific and each workspace may contain multiple surveys. The web client will expose at max ONE type of each widget - Pop over, Pop Up and Side bar. There could be multiple surveys with enabled pop overs or pop ups and side bars, the one which was enabled or updated last, will be visible through the workspace web client. &#x20;

You don't need to re-install the code if you build a new widget or survey within a workspace and you already have it installed on your website.

## Identify logged-in visitors

Identifying your Users allows you to link your Survey Responses to your customers, visitors or users of your product or app. For example, if you're running an eCommerce Website and are taking feedback after a purchase is completed, identifying a respondent can help you connect and link the survey response and satisfaction to the shopper on your website and the items they purchased.

Identifying Users also allows you to better segment and target the user and sync the responses to other tools and systems you use.&#x20;

Once you have successfully installed our client, you should probably start by identifying your users. Although the client can be used in anonymous mode, identifying your users will provide you access to many useful features like segmenting your users and building target audiences, among others.&#x20;

We can identify users with these variables

| Attributes        | Variable Name     |
| ----------------- | ----------------- |
| Contact Mobile    | contact\_mobile   |
| Contact Email     | contact\_email    |
| Contact Unique Id | contact\_uniqueid |
| Contact Name      | contact\_name     |

You can create more such attributes in Survey > Build > Variables.&#x20;

```javascript
// Some code
```

## Passing additional variables

When you're copying the code from the Install JS Client Code section, you can choose from Anonymous Mode or Logged In Mode. The following code block is responsible for identifying your users. When using the Logged In mode code, make sure that you replace the static code values with dynamic user data.

In addition to identifying the users, you can also pass other variables (Contact Variables, Survey Variables or Hidden Variables) in the code like country, subscription plan, user ID and more.

{% code overflow="wrap" %}
```javascript
_zf('variables', {  
contact_email: "abc@somecompany.com",  // Replace with User Email 
contact_name: "Robert Hopkins",  // Replace with User Name
subscription_plan: "Professional", 
subscribed_date: "August 1, 2022",
country: "United States", 
gender: "Male" 
})
```
{% endcode %}

Passing variables in Web Surveys enriches your responses and reports, and these variables are available as filters in the platform.

## Manually trigger surveys

Use the following JS code to manually open the widget when a button or link is clicked.

You can place the manual trigger in the on Click event in your webpage in the following way.

```javascript
<a onclick = "_zf('startForm','SURVEY CODE');">
Click Me</a>
```

You can place the manual trigger in the on Hover event.

```javascript
<a onhover="-zf('startForm','SURVEY CODE';">
Button</a>
```

You can add this manual trigger in the onload event as well.

```javascript
<a onload="_zf('startForm','SURVEY CODE');">
PageURL</a>
```

You can get the manual trigger code under the JS Client Code Tab in the widget configuration page.

## Throttling Options for Manual Triggers

Zonka Feedback provides the ability to control how and when widgets appear on your website even when you are using Manual Triggers.  This feature can help improve user experience by ensuring that the widget is not displayed too frequently.

#### Throttling Methods

You can trigger the widget with the following options for controlling its display behavior:

1.  **Throttle by Page**\
    This option ensures that the widget is shown only once per page load. After the widget is triggered on the page, it will not appear again on the same page.

    ```javascript
    _zf('startForm', {'widgetId': '3xZbV7', 'throttle': 'page'})
    ```

    * **Usage**: This method is ideal if you want the widget to appear only once per page, regardless of how many times the user refreshes the page.
2.  **Throttle by Session**\
    This option ensures that the widget will be triggered only once per session. The session is determined based on the user's visit to your site, and the widget will not appear again until the user’s session expires or they close the browser/tab.

    ```javascript
    _zf('startForm', {'widgetId': '3xZbV7', 'throttle': 'session'})
    ```

    * **Usage**: Use this method if you want the widget to appear only once during the user's entire session. If the user navigates between pages within the same session, the widget will not show again.
3.  **Throttle by Session and Page**\
    This option combines both session and page throttling. The widget will be shown only once per page load, and it will not appear again on the same page or during the same session.

    ```javascript
    _zf('startForm', {'widgetId': '3xZbV7', 'throttle': 'session-page'})
    ```

    * **Usage**: This method is useful when you want to ensure that the widget doesn't appear more than once on the same page, and it won’t be triggered again even if the user navigates through different pages within the same session.

#### Example Use Case

Imagine a scenario where you want to show a survey widget to a user only once per page, but you don’t want it to show again on the same page reload or during the same session. A typical scenario can be a survey being triggered after a purchase or a booking has been made.\


You can use the following JavaScript code:

```javascript
javascriptCopy_zf('startForm', {'widgetId': '3xZbV7', 'throttle': 'session-page'})
```

This code ensures that the widget will only be triggered once during the entire session, and it won’t show again on the same page load.

## Register Callbacks functions

These events allow you to execute any JavaScript code at specific moments in the lifecycle of a survey. For example, redirect a user to a new page once they complete a survey.

Zonka Feedback offers the following functions:

<table><thead><tr><th width="210.5">Function</th><th></th></tr></thead><tbody><tr><td>onClose()</td><td>Gets called when the user dismissed a survey by clicking on the “x” in the top right corner.</td></tr><tr><td>onOpen()</td><td>Gets called when a survey widget becomes visible to your user.</td></tr><tr><td>onSubmit()</td><td>Gets called when the user completed (submitted) the entire survey.</td></tr></tbody></table>

## Page overwriting

There are instances when the page titles are difficult to understand and filter, hence you can rename these pages with a user-friendly names. Here is how you can do it.

```javascript
_zf("pageTracking",
    {
    "title":"This is custom page title", 
    "path":"/product/detail"
    }
   ); 
```

## Disable client

Next to importing user characteristics, Zonka Feedback also lets you track user event data. You can use event tracking to launch in-app surveys for users that performed – or didn’t perform.

You can turn off the customer tracking by simply manipulating the following variable - disableTracking is `enabled/disabled` and publishing it within your Javascript client code.&#x20;

```css
_zf(“disableTracking”,true);
```

If you wish to turn it back on, you can simply remove it.

## Reset on Logout

Zonka Feedback allows you to delete individual logged-in users' browser data by using the `resetUser` method. The method resets all visitor/logged-in user data stored in their localStorage, or sessionStorage. This information includes attributes, session history, survey responses stored in the browser, etc.&#x20;

We recommend using this when the user logs out of your web app.

```javascript
_zf(‘resetUser’);
```

## Getting Help <a href="#getting-help" id="getting-help"></a>

To get help with the JS client troubleshooting, please contact ZF Support. Our team will help you diagnose the issue you must be facing while setting up your web surveys.&#x20;






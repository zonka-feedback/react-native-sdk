# Flutter SDK

## Pre Requisites

Zonka Feedback Flutter SDK requires an active [Zonka Feedback](https://www.zonkafeedback.com/) account. To successfully run and test out the survey you would need to have an SDK token for the survey you want to implement. If you are already a user and have access to your SDK token you can directly jump to the Installation section. If not, read on and follow the following steps:

* Create a [new account](https://www.zonkafeedback.com/free-trial-signup) on Zonka Feedback
* Create a new survey with a choice of questions you would like to implement
* Once your survey is created go to Distribute menu and click on the In-App tab
* Enable the toggle to view the SDK token
* Follow the below-mentioned steps to implement it in your app

{% hint style="info" %}
Learn more about creating surveys on Zonka Feedback [here](https://help.zonkafeedback.com/en/articles/6389318-getting-started-with-zonka-feedback)
{% endhint %}



## Minimum Requirements

Flutter SDK enables you to collect feedback from your Android App and is compatible with apps running on both mobile and tablets for iOS and Android operating systems.



**Flutter**

* Flutter version 3.0.0 or higher.

**Android**

* CompileSdk version 34 or higher.
* Android Gradle Plugin version 8.1.0 or higher with a compatible Gradle version.

**iOS**

* iOS 14 or higher.

## Installation

To use this SDK, add `zonkafeedback_sdk` as a [dependency in your pubspec.yaml file](https://flutter.dev/docs/development/platform-integration/platform-channels).



### Initialize

Initialize the SDK in your application using `init()` method. Call this method only once, in the main component (e.g. `lib/main.dart` file).

```dart
import 'package:zonkafeedback_sdk/zonka_feedback.dart';

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    ZFSurvey().init(token: {{SDK_TOKEN}} ,zfRegion: '{{REGION}}',context: context);;
  }
}
```

For Regions use the following

* US - for US Region
* EU - for EU Region
* IN - for IN Region

### Setup&#x20;

Create a `ZFSurvey` object to configure and start the survey for feedback in your function.

<pre class="language-dart"><code class="lang-dart">import 'package:zonkafeedback_sdk/zonka_feedback.dart';

<strong>ZFSurvey().startSurvey();
</strong></code></pre>



### Optional Parameters

#### **Using `sendDeviceDetails`**

You can set the value of sendDeviceDetails to true if you want to submit details of your device along with the Zonka Feedback survey response. This would send the details of the device such as OS, OS version, IP address, and type of device. When you implement SDK it's true by default.

```dart
import 'package:zonkafeedback_sdk/zonka_feedback.dart';

ZFSurvey().sendDeviceDetails(true);
```



#### **Using `sendCustomAttributes`**

You can pass additional data about your users to provide more meaningful data along with the response. Some of the examples can be screen name, order ID, or transaction Id which can be associated with the response.

Attributes can be used to:

* Identify respondents (by default survey responses are anonymous)
* Trigger surveys
* Filter survey results

#### Example

```java
import 'package:zonkafeedback_sdk/zonka_feedback.dart';

Map<String, String> properties = {
  'property1': 'value1',
  'property2': 'value2',
};

ZFSurvey().sendCustomAttributes(properties);
```



## Identifying Logged-in Visitors

If you have an app where users are able to log in or signup then you can add the following code to automatically add the contacts in Zonka Feedback. You can pass at least one of the following parameters to identify the users.

<table><thead><tr><th>Parameter</th><th>Type</th><th width="243.66666666666669"> Example</th></tr></thead><tbody><tr><td>contact_name</td><td>string</td><td>"Josh Holland"</td></tr><tr><td>contact_email </td><td>string</td><td>"example@company.com"</td></tr><tr><td>contact_mobile</td><td>string</td><td>"+14532323223"</td></tr><tr><td>contac_uniqueid</td><td>string</td><td>"k2334"</td></tr></tbody></table>

**Example**

<pre class="language-dart"><code class="lang-dart">import 'package:zonkafeedback_sdk/zonka_feedback.dart';

Map&#x3C;String, dynamic> properties = {
  'contact_name': 'Robin James',
  'contact_email': 'robin@example.com',
  'contact_uniqueId': '1XJ2',
  'contact_mobile': '+14234XXXX'
};

<strong>ZFSurvey().userInfo(properties);
</strong></code></pre>

### Reset Visitor Attributes

If you are using the above code to identify users, then it might be a good idea to clear visitor data on logout. Use the below code to clear the data.

**Example**

```java
ZFSurvey().clear();
```

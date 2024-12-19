---
hidden: true
---

# Flutter SDK

## Pre Requisites

Zonka Feedback Mobile SDK requires an active [Zonka Feedback](https://www.zonkafeedback.com/) account. In order to successfully run and test out the survey you would need to have an SDK token for the survey you want to implement. If you are already a user and have access to your SDK token you can directly jump to the Installation section. If not, read on and follow the following steps:

* Create a [new account](https://www.zonkafeedback.com/free-trial-signup) on Zonka Feedback
* Create a new survey with a choice of questions you would like to implement
* Once your survey is created go to Distribute menu and click on the In-App tab
* Enable the toggle to view the SDK token
* Follow the below-mentioned steps to implement it in your app

{% hint style="info" %}
Learn more about creating surveys on Zonka Feedback [here](https://help.zonkafeedback.com/en/articles/6389318-getting-started-with-zonka-feedback)
{% endhint %}



## Minimum Requirements

Android SDK enables you to collect feedback from your Android App and is compatible with apps running on both mobile and tablets.

* Targeting Android minimum API version 16.
* Java or Kotlin

## Installation

Add it to your **root** `build.gradle` at the end of repositories:

```javascript
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```

Add the following line to your **app module** `build.gradle` file dependencies

```javascript
implementation 'com.github.zonka-feedback:android-sdk:v1.0.2
```

### Setup

**Initialize `ZFSurvey` Object**

Create an SDK token for the required survey from Distribute menu and use that to initialize the `ZFSurvey` object in your Application Class. Also, specify the region of your Zonka Feedback account.&#x20;

For specifying the region use `US` for the US region and `EU` for EU region.&#x20;

_**Java**_

```javascript
import com.zonkafeedback.zfsdk.ZFSurvey;
public class MyApplication extends Application {


    @Override
    public void onCreate() {
        super.onCreate();
        ZFSurvey.init(ApplicationContext, "SDK_TOKEN", "REGION");
    }
}
```

_**Kotlin**_

```javascript
import com.zonkafeedback.zfsdk.ZFSurvey

class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        ZFSurvey.init(ApplicationContext, "SDK_TOKEN", "REGION")

    }
}
```

### **Create an `ZFSurvey` object**

Create a `ZFSurvey` object to configure and start Survey for feedback in your Activity/Fragment.

_**Java**_

```javascript
ZFSurvey.getInstance().startSurvey(this);
```

_**Kotlin**_

```javascript
ZFSurvey.getInstance().startSurvey(this)
```

### Optional Parameters

#### **Using `sendDeviceDetails`**

You can set the value of sendDeviceDetails to true if you want to submit details of your device along with the Zonka Feedback survey response. This would send the details of the device such as OS, OS version, IP address, and type of device. When you implement SDK it's true by default.

#### Example:

_**Java**_

```java
import com.zonkafeedback.zfsdk.ZFSurvey;

             ZFSurvey.getInstance()
                     .sendDeviceDetails(true)
                      .startSurvey(this);
```

_**Kotlin**_

```kotlin
import com.zonkafeedback.zfsdk.ZFSurvey

             ZFSurvey.getInstance()
                     .sendDeviceDetails(true)
                      .startSurvey(this);
```

#### **Using `sendCustomAttributes`**

You can pass additional data about your users to provide more meaningful data along with the response. Some of the examples can be screen name, order Id, or transaction Id which can be associated with the response.

Attributes can be used to:

* Identify respondents (by default survey responses are anonymous)
* Trigger surveys
* Filter survey results

#### Example

_**Java**_

```java
import com.zonkafeedback.zfsdk.ZFSurvey;

    HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("contact_email" , "james@examplemail.com");
            hashMap.put("contact_name", "James Robinson");
            hashMap.put("contact_mobile" , "+91019019010");

             ZFSurvey.getInstance()
                     .sendCustomAttributes(hashMap)
                      .startSurvey(this);

```

_**Kotlin**_

```kotlin
import com.zonkafeedback.zfsdk.ZFSurvey


   val hashMap : HashMap<String, Object> = HashMap<>()
            hashMap.["contact_email" , "james@examplemail.com"] //Send User Email
            hashMap.["contact_name" , "James Robinson"] //Send User Name
            hashMap.["contact_mobile" , "+919191919191"] //Send User Mobile Number

             ZFSurvey.getInstance()
                     .sendCustomAttributes(hashMap)
                      .startSurvey(this);
```

## Identifying Logged in Visitors

If you have an app where users are able to log in or signup then you can add the following code to automatically add the contacts in Zonka Feedback. You can pass at least one of the following parameters to identify the users.

<table><thead><tr><th>Parameter</th><th>Type</th><th width="243.66666666666669"> Example</th></tr></thead><tbody><tr><td>contact_name</td><td>string</td><td>"Josh Holland"</td></tr><tr><td>contact_email </td><td>string</td><td>"example@company.com"</td></tr><tr><td>contact_mobile</td><td>string</td><td>"+14532323223"</td></tr><tr><td>contac_uniqueid</td><td>string</td><td>"k2334"</td></tr></tbody></table>

_**Java**_

<pre class="language-java"><code class="lang-java"><strong>HashMap&#x3C;String, Object> hashMap = new HashMap&#x3C;>();
</strong>hashMap.put("contact_email" , "james@examplemail.com");
hashMap.put("contact_name", "James Robinson");
hashMap.put("contact_mobile" , "+919191919191");
ZFSurvey.getInstance().userInfo(hashMap);
</code></pre>

_**Kotlin**_

```kotlin
HashMap<String, Object> hashMap = new HashMap<>()
hashMap.put("contact_email" , "james@examplemail.com")
hashMap.put("contact_name", "James Robinson")
hashMap.put("contact_mobile" , "+919191919191")
ZFSurvey.getInstance().userInfo(hashMap)
```

### Reset Visitor Attributes

If you are using the above code to identify users, then it might be a good idea to clear visitor data on logout. Use the below code to clear the data.

_**Java**_

```java
ZFSurvey.getInstance().clear();
```

_**Kotlin**_

```kotlin
ZFSurvey.getInstance().clear()
```

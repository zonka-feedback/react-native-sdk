# iOS SDK

## Pre Requisites

Zonka Feedback Mobile SDK requires an active [Zonka Feedback](https://www.zonkafeedback.com/) account. In order to successfully run and test out the survey you would need to have an SDK token for the survey you want to implement. If you are already a user and have access to your SDK token you can directly jump to the Installation section. If not, read on and follow the following steps:

* Create a [new account](https://www.zonkafeedback.com/free-trial-signup) on Zonka Feedback
* Create a new survey with a choice of questions you would like to implement
* Once your survey is created go to Distribute menu and click on the In-App tab
* Enable the toggle to view the SDK token
* Follow the below-mentioned steps to implement it in your app

{% hint style="info" %}
Learn more about creating surveys on Zonka Feedback [her](https://help.zonkafeedback.com/en/articles/6389318-getting-started-with-zonka-feedback)[e](https://help.zonkafeedback.com/en/articles/6389318-getting-started-with-zonka-feedback)
{% endhint %}

## Minimum Requirements

iOS SDK enables you to collect feedback from your iOS App on iPhone and iPad.

* Recommended using Xcode 13 or above.
* Targeting iOS 12.1 or above.
* Swift 5

## Installation

### Installing using CocoaPods

Define pod in your Pod ruby file and run `pod install.`

```ruby
source "https://github.com/CocoaPods/Specs.git"
platform: ios, "12.1"
use_frameworks!

pod "ZonkaFeedback"
```

Then run

```ruby
pod install
```

### ​Adding framework directly

If you do not want to install manually then you can directly add _`ZonkaFeedback.framework`_ to your Xcode project.

[**Download**](https://zonkafeedback.com/hubfs/ZonkaFeedback.zip)

Once downloaded, follow these steps:

1. Drag ZonkaFeedback.framework into your project. Make sure "Copy items if needed" is selected and click Finish.
2. In the target settings for your app, set the ZonkaFeedback.framework to “Embed & Sign”. You'll find it in the “Frameworks, Libraries, and Embedded Content” section of the “General” tab.

### Setup <a href="#setup" id="setup"></a>

Create an In-App SDK token for the required survey from Distribute menu and use that to initialize the survey using the SDK

#### Initialize ZFSurvey <a href="#initialize-zfsurvey" id="initialize-zfsurvey"></a>

Create an SDK token for the required survey from Distribute menu and use that to initialize the ZFSurvey object in your AppDelegate Class. Also, specify the region of your Zonka Feedback account.\


For specifying the region use `US` for the US region and `EU` for EU region.

**Swift**

```swift
import ZonkaFeedback

class AppDelegate: UIResponder, UIApplicationDelegate 
{
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool
     {
          ZFSurvey.sharedInstance().initializeSDK(token: "<<SDK_TOKEN>>",zfRegion: "<<REGION>>")
     
          return true
     }
}

```

**Initialization in SwiftUI projects, with no AppDelegate class**

ZonkaFeedback iOS SDK can be used in SwiftUI projects. If your SwiftUI project doesn’t use the AppDelegate class, the initialization can be done in the constructor of the main application class:

```swift
import ZonkaFeedback

@main
struct SwiftUIApp: App 
{
    init() 
    {
          ZFSurvey.sharedInstance().initializeSDK(token: "<<SDK_TOKEN>>",zfRegion: "<<REGION>>")
    }
}

```

**Objective-C**

```objectivec
 #import <ZonkaFeedback-Swift.h>


-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     [[ZFSurvey sharedInstance] initializeSDKWithToken:@"<<SDK_TOKEN>>" zfRegion:@"<<REGION>>"];
}

```

## Identifying Logged in Visitors <a href="#identifying-logged-in-visitors" id="identifying-logged-in-visitors"></a>

If you have an app where users are able to log in or signup then you can add the following code to automatically add the contacts in Zonka Feedback. You can pass at least one of the following parameters to identify the users.

#### &#x20;<a href="#example" id="example"></a>

| Parameter         | Type   | Example               |
| ----------------- | ------ | --------------------- |
| contact\_name     | string | "Josh Holland"        |
| contact\_email    | string | "example@company.com" |
| contact\_mobile   | string | "+14532323223"        |
| contact\_uniqueid | string | "k2334"               |

**Swift**

```swift
   import ZonkaFeedback
    
   let userInfoDict = NSMutableDictionary()
   userInfoDict.setValue("james@examplemail.com", forKey: "contact_email")
   userInfoDict.setValue("James Robinson", forKey: "contact_name")
   userInfoDict.setValue("+919191919191”, forKey: "contact_mobile")
   ZFSurvey.sharedInstance().userInfo(dict: userInfoDict)
   
```

**Objective-C**

```objectivec
  #import <ZonkaFeedback-Swift.h>

  NSMutableDictionary *userInfoDict = [[NSMutableDictionary alloc]init]; 
  [userInfoDict setValue:@"james@examplemail.com" forKey:@"contact_email"];  
  [userInfoDict setValue:@"James Robinson" forKey:@"contact_name"];
  [userInfoDict setValue:@"+919191919191" forKey:@"contact_mobile"];      
  [[ZFSurvey sharedInstance] userInfoWithDict:userInfoDict];
  
```

### Using ZonkaFeedback SDK <a href="#using-zonkafeedback-sdk" id="using-zonkafeedback-sdk"></a>

ZonkaFeedback SDK allows you to launch precisely targeted surveys inside your app. In the Zonka Feedback web Panel you can create a survey and use it on anywhere within your app.

Create an instance of ZFSurveyViewController in any ViewController you want to integrate the survey.

```swift
let surveyViewController = ZFSurveyViewController()
```

## Optional Parameters <a href="#parameters" id="parameters"></a>

### **Using `sendDeviceDetails`  (Optional)**

You can set the value of `sendDeviceDetails` to true if you want to submit details of your device along with the Zonka Feedback survey response. This would send the details of the device such as OS, OS version, IP address, and type of device. When you implement SDK it’s true by default.



### **Using `sendCustomAttributes` (Optional)**

You can pass additional data about your users to provide more meaningful data along with the response. Some of the examples can be screen name, order Id, or transaction Id which can be associated with the response.

Attributes can be used to do the following:

* Identify respondents (by default survey responses are anonymous)
* Trigger surveys
* Filter survey results

**Swift**

```swift
    import ZonkaFeedback
    
    func openSurvey()
    {
        let surveyViewController = ZFSurveyViewController()
        surveyViewController.sendDeviceDetails = true
        
        let attributesDict = NSMutableDictionary()
        attributesDict.setValue("james@examplemail.com", forKey: "contact_email")
        attributesDict.setValue("James Robinson", forKey: "contact_name")
        attributesDict.setValue("+919191919191”, forKey: "contact_mobile")
        surveyViewController.sendCustomAttributes = attributesDict
        self.view.addSubview(surveyViewController.view)
    }

```

**Objective-C**

```objectivec
   #import <ZonkaFeedback-Swift.h>

  -(void)openSurvey
  {                    
        ZFSurveyViewController *surveyViewController = [ZFSurveyViewController new];
        surveyViewController.sendDeviceDetails = true;
       
        NSMutableDictionary *attributesDict = [[NSMutableDictionary alloc]init];
        [attributesDict setValue:@"james@examplemail.com" forKey:@"contact_email"];  
        [attributesDict setValue:@"James Robinson" forKey:@"contact_name"];
        [attributesDict setValue:@"+919191919191" forKey:@"contact_mobile"]; 
         surveyViewController.sendCustomAttributes = attributesDict;
        [self.view addSubview:surveyViewController.view];
  }
  

```

## Reset Visitor Attributes <a href="#reset-visitor-attributes" id="reset-visitor-attributes"></a>

If you are using the above code to identify users, then it might be a good idea to clear visitor data on logout. Use the below code to clear the data.

**Swift**

```swift
    import ZonkaFeedbackSDK
    
    func logout()
    {
        ZFSurvey.sharedInstance().clear()
    }

```

**Objective-C**

```objectivec
   #import <ZonkaFeedback-Swift.h>

  -(void)logout
  {
     [[ZFSurvey sharedInstance] clear];
  }
  
```


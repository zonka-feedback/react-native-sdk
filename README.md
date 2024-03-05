# React Native SDK

#### 

**Pre Requisites**[](#pre-requisites)

Zonka Feedback Mobile SDK requires an active [Zonka Feedback](https://www.zonkafeedback.com/) account. In order to successfully run and test out the survey you would need to have an SDK token for the survey you want to implement. If you are already a user and have access to your SDK token you can directly jump to the Installation section. If not, read on and follow the following steps:

-   Create a [new account](https://www.zonkafeedback.com/free-trial-signup) on Zonka Feedback
    

-   Create a new survey with a choice of questions you would like to implement
    

-   Once your survey is created go to Distribute menu and click on the In-App tab
    

-   Enable the toggle to view the SDK token
    

-   Follow the below-mentioned steps to implement it in your app

    Learn more about creating surveys on Zonka Feedback [here](https://help.zonkafeedback.com/en/articles/6389318-getting-started-with-zonka-feedback)
    

#### Minimum Requirements

The react-native version should be 0.60 or more.

#### Installation

For installation, run the following

    npm install react-native-zonkafeedback
    npm install react-native-device-info
    npm install @react-native-community/netinfo


Minimum version of react-native-community/netinfo should be 6.0.2.
Minimum version of react-native-device-info should be 9.0.2.

#### ​Initialization

Create an SDK token for the required survey from Distribute menu and use that to initialize the SDK.
For specifying the region use US for the US region and EU for EU region.
Wrap the portion of your app inside HOC i.e Zonka Provider with token and region.

    import {ZonkaFeedback} from "react-native-zonkafeedback";
     const AppWithZonkaFeedback = () => {
     return (
     <ZonkaFeedback value={{token:"TOKEN", region:"REGION"}}>
     <YourApp />
     </ZonkaFeedback>
     );
    }; 

**Optional Parameters**

#### 

**Using** **`sendDeviceDetails`**[](#using-senddevicedetails)

You can set the value of sendDeviceDetails to true if you want to submit details of your device along with the Zonka Feedback survey response. This would send the details of the device such as OS, OS version, IP address, and type of device. When you implement SDK it's true by default.

    import {useZFSurvey} from "react-native-zonkafeedback";
    const HomeScreen = () => {
     const { sendDeviceDetails} = useZFSurvey();
     sendDeviceDetails(true).startSurvey();
    }

**Using** **`sendCustomAttributes`**

You can pass additional data about your users to provide more meaningful data along with the response. Some of the examples can be screen name, order Id, or transaction Id which can be associated with the response.

Attributes can be used to:

-   Identify respondents (by default survey responses are anonymous)
-   Trigger surveys
-   Filter survey results

    ```
    import {useZFSurvey} from "react-native-zonkafeedback";
    const HomeScreen = () => {
    const { sendCustomAttributes} = useZFSurvey();
    const hash = {contact_email:"james@examplemail.com", 
                  contact_name:"James Robinson", 
                  contact_mobile:"+91019019010"}
     sendCustomAttributes(hash).startSurvey();
    }

    ```


**Identifying Logged in Visitors**

If you have an app where users are able to log in or signup then you can add the following code to automatically add the contacts in Zonka Feedback. You can pass at least one of the following parameters to identify the users.

|         Parameter       |Type|Example|
|----------------|-------------------------------|-----------------------------|
|contact_name|string           |"Josh Holland"         |
|contact_email|string            |"example@company.com"            |
|contact_mobile          |string|"+14532323223"|
|contac_uniqueid   | string|"k2334"|


    import {useZFSurvey} from "react-native-zonkafeedback";
    const HomeScreen = () => {
     const {userInfo} = useZFSurvey();
     const hash = {contact_email:"james@examplemail.com",
     contact_name:"James Robinson",
     contact_mobile:"+91019019010"
     }
     userInfo(hash)
    }


**Reset Visitor Attributes**

If you are using the above code to identify users, then it might be good idea to clear visitor data on logout. Use the below code to clear the data.

    import {useZFSurvey} from "react-native-zonkafeedback";
    const HomeScreen = () => {
     const {clear} = useZFSurvey();
     clear()
    }

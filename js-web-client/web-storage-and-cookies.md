# Web Storage and Cookies

### **Usage of Web Storage**

The Zonka Feedback Web client makes use of the Local Storage of the web browser to store data related to the users/visitors of your web page. The type of data that is stored in the local storage as follows:

* First Seen: Time Stamp of when this browser was first seen
* User Agent: Full details of the user agent used by the visitor/user
* Pages Viewed details: All the pages the user has navigated with domain names and URLs
* Device details: Device details such as type and resolution

### **Usage of Cookies**

The Zonka Feedback web client uses Cookies to store data locally in the browser of your visitors and users. This is to ensure that the Zonka Feedback client works in the right manner.

When the JS Client is loaded, the following two cookies are dropped. The description of each is provided below.

<table><thead><tr><th width="229"></th><th></th></tr></thead><tbody><tr><td>zfm_cnt_ck_id</td><td>This id is used to identify a unique visitor on the web page. This id is referenced to decide the behavior of the widget on configuration and settings</td></tr><tr><td>zfm_usr_sess_ck_id</td><td>This id is used to identify the current session of the visitor and expires automatically when expiring conditions are met</td></tr><tr><td>Dynamic Cookies</td><td>These cookies are created as per the requirement and behavior settings of the widget. The data stored consists of random strings and timestamps which are used to make the widget behave based on the settings you have set up while configuring and activating it in your Zonka Feedback account. For example, if you have set up the widget to show only once to a user even if they have not submitted a response it is tracked based on data stored locally.</td></tr></tbody></table>

The above cookies share the following characteristics

* The expiration date of the Cookies if 365 days which is renewed on every visit
* The cookies can be only accessed using a secured connection only
* The cookies are only applicable to your domain name and cant be used by any other domain or service

---
description: Install the web client by copying & pasting workspace based JS code snippet.
---

# Installation

The installation consists of five steps

* Find the Code Snippet
* Choose between Anonymous and Logged-In Mode
* Add Identify variables in case of Logged-In Mode&#x20;
* Inserting the Code in your web pages
* Testing the Installation

Completion of these steps successfully will let you embed your survey within your web pages and start collecting responses right away.&#x20;

## Step 1: Find the Code Snippet  <a href="#h_559435459c" id="h_559435459c"></a>

Installing our JavaScript Web-Client is required before you can use Zonka Feedback surveys inside of your application. It normally takes a few minutes to install the required code snippet, and you only need to do it once.

Navigate to 'Settings' on the Zonka Feedback platform. In the Settings menu, go to the 'Developers' section from the left navigation. In Developers, click on 'JS Client Code'.

## Step 2: Choose Anonymous Visitors or Logged in Users&#x20;

Please make sure while adding your web client code to your web pages if you wish to operate the client in Anonymous Mode or Logged In Mode.

**Anonymous User Mode**

When you want to embed surveys for your public website visitors to record their preferences, behaviors, or simply feedback **Choose Anonymous Users Mode.**

Anonymous visitors may be new to your website or returning visitors who haven't given their personal information previously like any contact information such as name, email, or phone number. To collect survey responses from such users, you can simply insert your web client in anonymous mode.

```javascript
<!-- Zonka Feedback Embed Script -->
<script id="zfEmbed">

window._zfQueue = window._zfQueue || []; function _zf(){_zfQueue.push(arguments); }
(function() { ZonkaFeedback = function (en, fb ){document.body.addEventListener(en, 
fb , false); }; var sc, w, d = document, ce = d.createElement, gi = d.getElementById, 
gt = d.getElementsByTagName, id = "zfEmbedScript"; if (!gi.call(d, id)) 
{ sc = ce.call(d, "script"); sc.async=!0;sc.id = id; 
sc.src = "https://us1.zonkasurvey.com/api/v1/embedjs/<YOUR WORKSPACE ID>";
w = gt.call(d, "script")[0]; w.parentNode.insertBefore(sc, w); }})(); 

</script>
```

**Logged In User Mode**

If you want to survey your users our product or web app when logged in **Choose Logged In Users Mode.**

In addition to the web client code as above, the following code block is responsible for identifying your users. When using the Identify User code, make sure that you replace the static code values with dynamic user data.

```javascript
_zf('variables', {  
contact_email: "abc@somecompany.com",  // Replace with User Email 
contact_name: "Robert Hopkins",  // Replace with User Name
})
```

You can pass variables such as name, phone, email, and user ID to identify the logged-in user of your application.

## Step 3: Insert code snippet&#x20;

Copy the code and paste it into the HTML of your web app. The ideal location is right before the closing \</HEAD> tag. If you are identifying your users, make sure to replace the static values from the logged In method with real user data (id, email or name, …).

```javascript
<head>
    <meta charset="UTF-8">
    .
    .
    .
<!-- Zonka Feedback Embed Script -->
<script id="zfEmbed">
    window._zfQueue = window._zfQueue || []; function _zf(){_zfQueue.push(arguments); }(function() { ZonkaFeedback = function (en, fb )
    {document.body.addEventListener(en, fb , false); }; var sc, w, d = document, ce = d.createElement, gi = d.getElementById, 
    gt = d.getElementsByTagName, id = "zfEmbedScript"; if (!gi.call(d, id)) { sc = ce.call(d, "script"); sc.async=!0;sc.id = id; 
    sc.src = "https://us1.zonkasurvey.com/api/v1/embedjs/<YOUR WORKSPACE CODE>";w = gt.call(d, "script")[0]; w.parentNode.insertBefore(sc, w); }})();
    </script>
    .
</head>
```

Save and publish your changes to get the surveys working.

## Step 4: Testing the Installation

With the help of the built-in Debug Mode in our Javascript Client, you can immediately identify any problems. To enable debug mode add ‘#zf\_debug’ hash to your URL and reload the page

```jsx
https://yourdomain.com#zf_debug=true
```

OR you can use ‘_zf\_debug=true’_ parameter to your URL

```jsx
https://yourdomain.com?zf_debug=true
```

Once you reload with any of the above debug modes then you would see a Debug Window in the browser. It will provide you with some basic information about the client and if it's functioning properly and is able to communicate with our servers.

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

Try reloading the window if the debug does not appear. If it still does not load then it means that the widget has not been installed properly or has not been installed at all. As a manual alternative, you can try searching for “zf” in the HTML and see if you are able to find it and it has been installed in the right place on the page.

**Disable Debug Mode**

The debug mode remains active until turned off. To turn off debug mode do the following

```jsx
https://yourdomain.com#zf_debug=false
```

## Troubleshooting your installation

**Try it out in an Incognito Browser**

To minimize the amount of data sent between the browser and our servers, our Javascript client makes use of the local storage of your browser. If opened previously, our client will recognize that a particular "Logged In User" call has already been sent to our servers. A hash value is kept in your browser's local storage to do this.

We recommend testing our web client after installation in a fresh incognito browser window at all times to prevent any problems related to cache and session.

**Examine your network in the network tab**

You can examine all network traffic between your browser and our backend servers using the developer console of your browser. Every request made from the Zonka Feedback server must terminate with a 200 or 201 status code.


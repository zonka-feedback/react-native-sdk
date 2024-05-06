# Content Security Policy

CSP provides a layer of security for you by protecting you from unwanted Scripts and XSS attacks. If your website or web app makes use of CSP then add the following domain names to your policy to help run the Zonka Feedback widget smoothly.

```javascript
connect-src: 
'self' ws:;

script-src: 
https://us-js.zonka.co 
https://e-js.zonka.co

frame-src: 
https://us1.zonka.co 
https://e.zonka.co


worker-src blob:
https://cdn.socket.io/4.3.2/socket.io.min.js



```

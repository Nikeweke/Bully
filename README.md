## Bully - in production mode
[![Build Status](https://travis-ci.org/Nikeweke/Bully.svg?branch=master)](https://travis-ci.org/Nikeweke/Bully)

### Express notes
* [Express middlewares](https://expressjs.com/en/resources/middleware.html)
* [Express - perfomance](https://expressjs.com/ru/advanced/best-practice-performance.html)
* [Express - security](https://expressjs.com/ru/advanced/best-practice-security.html)

---

### Perfomance features
* Production mode - `cross-env NODE_ENV=production`
* Compression(middleware) - gzip content


### Security features
* Helmet (middleware) - представляет собой набор из девяти более мелких функций промежуточной обработки, обеспечивающих настройку заголовков HTTP, связанную с защитой
* Disable X-powered 


### Not included in production now
* Http2 - its complicated to include now
* Express-session - use when its specific task for it
* Nginx
* Clusters

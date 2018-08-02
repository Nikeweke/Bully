## Bullz - simple framework for Node

<p align="center" style="text-align:center;">
  <img src="https://github.com/Nikeweke/Nomad.js/blob/master/public/assets/bull.png?raw=true" width="300" />
</p>

### Quick start
```bash
# install dependecies
npm i

# start dev mode
node app

# start prod mode
node app prod

# start supervisor for app
npm start

# it will watch for also nunjucks templates and reload them when you changing it
# Be sure: config.js -> reload: true
npm run hrm

# show routes
node app routes
```

#### Содержание
* [Пакеты](#packages)
* [Структура](#structure)
* [Шаблонизатор](#templater)
* [Контроллеры](#ctrls)
* [Модели](#models)
* [Маршруты](#rroutes)
* [Middleware](#middleware)
* [БД](#db)
* [Sockets](#sockets)

---

## Пакеты <a id="packages"></a>

* [bcrypt](https://www.npmjs.com/package/bcrypt) - bcrypt функции для хеширования паролей
* [express](http://expressjs.com/) - framework для NodeJS
* [mysql](https://www.npmjs.com/package/mysql)   - драйвер для работы с MySQL
* [sync-mysql](https://www.npmjs.com/package/sync-mysql) - для работы с MySQL без "callback hell"
* [squel](https://www.npmjs.com/package/squel) - создание запросов(строк) цепью для выполнение
* [cron](https://www.npmjs.com/package/cron) - выполнение работ по расписанию
* [body-parser](https://www.npmjs.com/package/body-parser) - получение параметров из http запросов POST
* [nunjucks](https://www.npmjs.com/package/nunjucks) - шаблонизатор от Mozilla (похож на Blade)
* [colors](https://www.npmjs.com/package/colors) - цвета для консоли

## Структура <a id="structure"></a>
#### app
  + `controllers/`
  + `helpers/`
  + `jobs/`
  + `models/`

#### config
  + `bootstrap.js` - установка шаблонизатора, роутов, статического места, запуск приложения
  + `database.js` - данные для подключения к БД
  + `routes.js` - содержит все маршруты из папки "routes"
  + `server.js` - запуск приложения
  + `settings.js` - настройки приложение и переменные

#### public
 Здесь храняться все статические файлы - CSS, JS, IMG, etc.

#### routes
 Роуты для приложения

#### views
  Шаблоны используемые в приложении

#### app.js
  Входная точка

#### config.json
  Здесь вы можете прописать свои настройки, включить или выключить jobs, sockets, databases и т.д.  

#### run.bat
 Запуск приложение с помощью ".bat" файла




## Шаблонизатор <a id="templater"></a>

[`Nunjucks`](https://mozilla.github.io/nunjucks/templating.html) - это шаблонизатор Mozilla, очень удобный и гибкий (как Blade из Laravel).

###### IndexController.js
```js
  Index: function(req, res)
  {
     var viewArgs = {
        greeting: 'Nomad.js is greeting you!',
        words: 'Your way from anywhere',
        items: [{ title: "foo", id: 1 }, { title: "bar", id: 2}]
     }

     res.render('index', viewArgs);
  },
```


###### index.njk
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nomad.js</title>

    <!-- CSS -->
    {% include "partials/css.njk" %}

  </head>
  <body>
          <h2 class="title is-4 has-text-centered">
            {{ greeting }}
          </h2>
          <h3 class="title is-5 has-text-centered">
            {{ words }}
          </h3>

         {# This is a comment #}

          {% for item in items %}
            <li>{{ item.title }}</li>
          {% else %}
            <li>This would display if the 'item' collection were empty</li>
          {% endfor %}

        </div>
      </div>
    </section>


  </body>
</html>
```

###### partials / css.njk
```html
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.0/css/bulma.min.css">
```

## Контроллеры <a id="ctrls"></a>

1) Создаем контроллер в папке `app / controllers / TestController.js`
######  TestController.js
```js
module.exports = {

        Index: function(req, res) {
           res.send('Hello it is my controller');
        },
 };
```

2) Подключаем в роуты `routes / HomeRoutes.js`
###### HomeRoutes.js
```js
// Подключаем контроллер
var TestCtrl =  require('../app/controllers/TestController');


module.exports = function(app, urlencodedParser)
 {
     // добавляем маршрут к методу контроллера
     app.get('/test', [], function (req, res) {
        TestCtrl.Index(req, res);
     });
  ...
}
```


## Модели <a id="models"></a>

1) Создаем модель в папке `app / models / User.js`
######  User.js
```js

// Устанавливаем соедененние
var database   = require('../../config/database.js').Connect()

 module.exports = {

       getUsers: function (id) {
          return database.query('SELECT id FROM users');
       },
}

```

2) Подключаем в контроллер  `app / controllers / TestController.js`
###### TestController.js
```js
//  Models
var userModel = require('../models/User');

module.exports = {

    Index: function(req, res)
    {
       var users = User.getUsers();           // используем функции из модели
       res.render('index', {users: users});  // передаем данные на представление
    },

}

```



## Маршруты <a id="routes"></a>
1) Создаем маршрут в папке `routes / TestRoutes.js`
######  TestRoutes.js
```js
// Подключение контроллеров
// var TestCtrl =  require('../app/controllers/TestController');

module.exports = function(app, urlencodedParser)
 {
     // добавляем новый адрес
     app.get('/', [], function (req, res) {

         res.send('Hello mate');     
        // TestCtrl.Index(req, res); // это использование контроллера
     });
  ...
}


```

2) Регистрируем маршрут в  `config / routes.js`
###### routes.js
```js

module.exports = function(urlencodedParser, app){

    require('../routes/HomeRoutes')(app, urlencodedParser);

     // Новый маршрут
    require('../routes/TestRoutes')(app, urlencodedParser);
}
```






## Middleware <a id="middleware"></a>
1) Создаем Middleware в папке `routes / middleware / TestMiddleware.js`
######  TestMiddleware.js
```js
module.exports = {

    /*******************************************
    *  Будет выводить в консоль сообщение при каждом обращение к приложению
    *
    *******************************************/
    SayTest: function (req, res, next) {
        console.log('my new middleware');
        next();
    },


    /*******************************************
    *  Будет выводить в консоль сообщение при каждом обращение к приложению
    *
    *******************************************/
    CryTest: function (req, res, next) {
        console.log('my new middleware - i am crying');
        next();
    },

}

```

2) Подключаем Middleware в маршрут в  `config / routes.js / TestRoutes.js`
###### TestRoutes.js
```js
// Define your Middleware here
var AuthMiddleware =  require('./middleware/TestMiddleware');

// Define your controller here
var TestCtrl =  require('../app/controllers/TestController');

module.exports = function(app, urlencodedParser)
 {

    // Без  использования  middleware
     app.get('/', function (req, res) {
        IndexCtrl.Index(req, res);
     });


     //  Используем  middleware - SayTest
     app.get('/', TestMiddleware.SayTest, function (req, res) {
        IndexCtrl.Index(req, res);
     });


     //  Используем 2 middleware - SayTest и CryTest
     app.get('/test', [TestMiddleware.SayTest, TestMiddleware.CryTest], function (req, res) {
        res.send('Hello from test page!');
     });


      //  Используем middleware - urlencodedParser - который позволяем взять данные с тела, которые были отправлены "POST" методом
     app.post('/form', urlencodedParser,function (req, res) {
       res.send(req.body)
     });


     // Если вы обратились по маршруту так : 'localhost/tester?id=2', для перехвата параметра нужно использовать req.param('param_name')
     app.post('/tester', urlencodedParser, function (req, res) {
       var id = req.param('id');
       res.send(id)
     });


     // Определенные параметры
     app.post('/post/:id', urlencodedParser, function (req, res) {
         res.send(req.params.id);
     });
 }
```



## БД <a id="db"></a>
1) Написать свои данные для подключения к БД в `config / database.js`
```js

var mysql  = require('sync-mysql');       // mysql adapter


//.......................................................................... VARS and FNS
module.exports = {


        /****************************************
        *  Подключение к БД (MySql)
        *
        ******************************************/
        Connect: function ()
         {
           return new mysql({
             host: 'localhost',
             user: 'root',
             password: '',
             database : 'foodcontrol'
           });
        },


        /****************************************
        *  Подключение к БД (Mongodb)
        *
        ******************************************/
        //db: require('mongoose').connect('mongodb://localhost:27017/ToDoDb'),

 };
```
2) Использовать подключение в модели
```js
// Connection to db
var database   = require('../../config/database.js').Connect()

 module.exports = {

       // table database
      table: 'users',

      /***************************************
      *   Получить всех пользователей
      *
      ***************************************/
       getUsers: function (id)
       {
          return database.query('SELECT id FROM users');
       },
}
```

3) Так же можно использовать другой любой адаптер
* [mongoose](https://www.npmjs.com/package/mongoose)
* [postgres-js](https://www.npmjs.com/package/postgres-js)
* [sqlite](https://www.npmjs.com/package/sqlite3)
* и т.д.

## Sockets <a id="sockets"></a>
1) Создаем свой контроллер сокетов `app / config / sockets`
###### Test.js
```js
module.exports = function(io)
 {
   // начало работы с объектом сокетов
   io.sockets.on('connection', function(socket)
    {
       /***********************************************************
       *  Получение сообщение
       *
       ***********************************************************/
       socket.on('send words', function(data)
       {
            //  console.log(data);
            var answer = '';

            if(data == 'hello'){
              answer = 'Hello, i am Socket, I have received your message. Well done!';
            }

            else{
             answer = 'You didnt say me hello and i am confused a little bit!';
            }

            socket.emit('socket message', answer);  // запуск события

       });


        /***********************************************************
        *  Отсоедение пользователя
        *
        ***********************************************************/
        // socket.on('disconnect', function()
        //  {
        //
        //  });
    });
 };
```

2) Подключаем созданный контроллер сокетов в приложение - `config / sockets.js`
```js
var colors    = require('colors');
var http      = require('http');
var socket_io = require('socket.io');

// Sockets emit and ON actions
var Test = require('../app/sockets/Test.js');    // <!------ ВАШ КОНТРОЛЛЕР

module.exports = function(app){

    var port = 3000;

    var http_server = http.createServer(app);            // нужно для поднятия сервера. С вариантом app.listen() - не будет работать
    var io     = socket_io.listen(http_server);     // sockets object

    /*
      Так вы можете указать способ транспортировки данных в сокетах на выбор - ['polling', 'websocket'],
      By default, a long-polling connection is established first, then upgraded to "better" transports (like WebSocket) - From Socket.IO Docs
    */
    // io.set('transports', ['websocket']);

    http_server.listen(port);
    console.log(colors.cyan('Sockets') + ' is running on port: ' + colors.cyan(port))


    // SOCKETS CONTROLLERS
    Test(io);                   // <!------ ВАШ КОНТРОЛЛЕР

}
```

3) На стороне клиента в секции javascript надо подключиться к Sockets.io-client
```html
<script src="/js/lib/socket.io.js"></script> <!-- SOCKETS.IO -->

<script type="text/javascript">


    // Сокеты работают на 3000 порту,значит надо туда подключиться, порт можно изменить в "config/sockets.js"
    var socket = io.connect('http://localhost:3000');


    /*
      Так вы можете указать способ транспортировки данных в сокетах на выбор - ['polling', 'websocket'],
      By default, a long-polling connection is established first, then upgraded to "better" transports (like WebSocket) - From Socket.IO Docs
    */
    // var socket = io.connect('http://localhost:3000', {  transports: ['websocket'] });

    /*
    |--------------------------------------------------------------------------
    | Отправить сообщение на сервер с помощью сокетов (запуск события "send words")
    |--------------------------------------------------------------------------
    */
    function SendToSockets() {

      var input = $('#socket_field').val();

      socket.emit('send words', input);            // запуск события
    }


    /*
    |--------------------------------------------------------------------------
    | Ловит событие "new message"
    |--------------------------------------------------------------------------
    */
    socket.on('socket message', function (data) {    // прием события
        alert(data);
    });


</script>
```

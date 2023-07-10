const express = require("express");
const Num = require("./Numeral");
var Parser = require('expr-eval').Parser;
const parser = new Parser();

parser.consts.π = Math.PI;

// создаем объект приложения
const app = express();
app.use(express.text());
// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});

app.post('/api/data', (req, res) => {
    let mess = req.body;
    console.log('Получено сообщение от клиента: ', mess);
    mess=mess.replace(/√/g, 'sqrt');
    // Делайте что-то с полученными данными
    let result;
    try{
        result = '' + parser.evaluate(mess);
    }
    catch(err){
        result = 'Error: invalid expression';
    }
    res.send('' + result);
});
app.post('/api/prog', (req, res) => {
    let mess = req.body;
    console.log('Получено сообщение от клиента: ', mess);
    mess=mess.replace(/√/g, 'sqrt');
    // Делайте что-то с полученными данными
    let result;
    try{
        result = 'hi ' + mess;
    }
    catch(err){
        result = 'Error: invalid expression';
    }
    res.send('' + result);
});



app.get('/main/mainn.html', (request, response) => {
    response.sendFile(__dirname + '/main/mainn.html');
});
app.get('/main/style-main.css', (request, response) => {
    response.sendFile(__dirname + '/main/style-main.css');
});
app.get('/main/client-main.js', (request, response) => {
    response.sendFile(__dirname + '/main/client-main.js');
});
app.get('/fonts/Roboto-Medium.ttf', (request, response) => {
    response.sendFile(__dirname + '/fonts/Roboto-Medium.ttf');
});



app.get('/prog/prog.html', (request, response) => {
    response.sendFile(__dirname + '/prog/prog.html');
});
app.get('/prog/style-prog.css', (request, response) => {
    response.sendFile(__dirname + '/prog/style-prog.css');
});
app.get('/prog/client-prog.js', (request, response) => {
    response.sendFile(__dirname + '/prog/client-prog.js');
});




app.get('/style.css', (request, response) => {
    response.sendFile(__dirname + '/style.css');
});
app.get('/index.html', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});



// начинаем прослушивать подключения на 3000 порту
const server = app.listen(3000, ()=>console.log('Сервер начал работу на порту 3000'));

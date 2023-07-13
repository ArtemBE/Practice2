const express = require("express");
const Num = require("./Numeral");
const cn = require("./CN");
var Parser = require('expr-eval').Parser;
const parser = new Parser();



parser.consts.π = Math.PI;

// создаем объект приложения
const app = express();
app.use(express.json());
// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});

app.post('/api/data', (req, res) => {
    let mess = req.body.val;
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
    res.send({val: '' + result});
});
app.post('/api/prog', (req, res) => {
    let val1 = req.body.val1;
    let val2 = req.body.val2;
    let ss1 = req.body.ss1;
    let ss2 = req.body.ss2;
    let dig = req.body.dig;
    let button = req.body.button;
    let result;
    if(button==='&'){
        result=cn.and(val1, val2, ss1, dig);
    }
    else if(button==='|'){
        result=cn.or(val1, val2, ss1, dig);
    }
    else if(button==='XOR'){
        result=cn.xor(val1, val2, ss1, dig);
    }
    else if(button==='A→B'){
        result=cn.trans(val1, ss1, ss2);
    }
    else if(button==='¬'){
        result=cn.not(val1, ss1, dig);
    }
    else if(button==='>>'){
        result=cn.shiftRight(val1, ss1, dig);
    }
    else if(button==='<<'){
        result=cn.shiftLeft(val1, ss1, dig);
    }
    else if(button==='REV'){
        result=cn.rev(val1, ss1, dig);
    }
    else if(button==='COM'){
        result=cn.com(val1, ss1, dig);
    }
    else if(button==='+'){
        result=cn.sum(val1, val2, ss1);
    }
    else if(button==='-'){
        result=cn.dif(val1, val2, ss1);
    }
    else if(button==='*'){
        result=cn.mul(val1, val2, ss1);
    }
    else if(button==='/'){
        result=cn.div(val1, val2, ss1);
    }
    console.log(result);
    res.send({val: result});
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

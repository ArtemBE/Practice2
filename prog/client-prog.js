const inner16 = 
'<button>0</button>' +
'<button>1</button>' +
'<button>2</button>' +
'<button>3</button>' +
'<button>4</button>' +
'<button>5</button>' +
'<button>6</button>' +
'<button>7</button>' +
'<button>8</button>' +
'<button>9</button>' +
'<button>A</button>' +
'<button>B</button>' +
'<button>C</button>' +
'<button>D</button>' +
'<button>E</button>' +
'<button>F</button>';
const inner10 = inner16.slice(0, inner16.indexOf('<button>A</button>'));
const inner8 = inner16.slice(0, inner16.indexOf('<button>8</button>'));
const inner2 = inner16.slice(0, inner16.indexOf('<button>2</button>'));
const digitButtons = document.querySelector('#numbers').children;
const buttons = document.querySelectorAll('#calc > button');
console.log(buttons);

let value, oper;

let state = {
    step: 0,
    button: '',
    val1: null,
    val2: null,
};

let place = 0;
const input = document.querySelector('#calc > input');
function numSystem(inner){
    if(inner.includes('<button>F</button>')) return 16;
    if(inner.includes('<button>9</button>')) return 10;
    if(inner.includes('<button>7</button>')) return 8;
    if(inner.includes('<button>1</button>')) return 2;
}

//событие запроса на сервер
const choises = document.querySelector('#choise').children;
function requestToServer(button, val1, ...val2){
    const obj = {
        button: button,
        val1: val1,
        ss1: Number(choises[1].value),
        ss2: Number(choises[3].value),
        dig: Number(choises[5].value)
    }
    if (val2.length>0) obj.val2=val2[0];
    console.log(obj);
    fetch('/api/prog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        input.value = data.val;
        // Делайте с данными, полученными от сервера, что вам нужно
    })
    .catch(error => {
        console.log('Ошибка: ', error);
        input.value = 'Error: invalid expr';
    });
}

function paste(str)
{
    input.value = 
    input.value.slice(0, place) + '' +
    str + '' + input.value.slice(place);
    place+=str.length;
}

//клик на цифру
function clickDigit(e){
    e.preventDefault();
    if(input.value!=='' && state.step==2) {
        state.step=3;
        input.value='';
    }
    paste(e.target.textContent);
    if(input.value==='' && state.step===1) state.step=0;
    else if(input.value!=='' && state.step===0) state.step=1;
    console.log(state);
}
for(let i of digitButtons) i.addEventListener('click', clickDigit);



let numbers = document.querySelector('#numbers');
const err = new Error('Invalid expression');

//событие замены стартовой СС
function changeInput(e){
    if(input.value==='' && state.step===1) state.step=0;
    else if(input.value!=='' && state.step===0) state.step=1;
    console.log(state);
}
input.addEventListener('input', changeInput);
function changeStartSystem(e){
    let val = choises[1].value;
    
    if(val==='2') {
        numbers.innerHTML=inner2;
        numbers.className = 'calc s2';
    }
    else if(val==='8') {
        numbers.innerHTML=inner8;
        numbers.className = 'calc s8';
    }
    else if(val==='10') {
        numbers.innerHTML=inner10;
        numbers.className = 'calc s10';
    }
    else if(val==='16') {
        numbers.innerHTML=inner16;
        numbers.className = 'calc s16';
    }
    const digitButtons = document.querySelector('#numbers').children;
    for(let i of digitButtons) i.addEventListener('click', clickDigit);
}
choises[1].addEventListener('change', changeStartSystem);
//math functions

function clickButton(e){
    e.preventDefault();
    const cont=e.target.textContent;
    console.log('+-*/XOR&|'.includes(cont));
    if('+-*/XOR&|'.includes(cont)){
        if(state.step===2 || state.step===1){
            console.log(state);
            state.step=2;
            state.button = cont;
            state.val1 = input.value;
            input.value = cont;
            console.log(state);
        }
    }
    else if(cont==='C'){
        input.value = '';
        state.step=0;
        state.val1 = null;
        state.val2 = null;
        state.button = null;
        console.log(state);
    }
    else if(cont==='='){
        state.val2=input.value;
        console.log(state);
        requestToServer(state.button, state.val1, state.val2);
        //input.value = '';
        state.step=1;
        state.val1 = input.value;
        state.val2 = null;
        state.button = null;
    }
    else{
        requestToServer(cont, input.value);
        state.step=1;
        state.val1 = input.value;
        state.val2 = null;
        state.button = null;
        console.log(state);
    }
}
for(let i of buttons) i.addEventListener('click', clickButton);
setInterval(()=> 
{
    if(input===document.activeElement)
    place = input.selectionStart;
    place = place ?? 0;
}, 10);


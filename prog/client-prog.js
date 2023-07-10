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
let place = 0;
const input = document.querySelector('#calc > input');
function numSystem(inner){
    if(inner.includes('<button>F</button>')) return 16;
    if(inner.includes('<button>9</button>')) return 10;
    if(inner.includes('<button>7</button>')) return 8;
    if(inner.includes('<button>1</button>')) return 2;
}
function requestToServer(){
    fetch('/api/prog', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: input.value
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        input.value = data;
        // Делайте с данными, полученными от сервера, что вам нужно
    })
    .catch(error => {
        console.log('Ошибка: ', error);
        input.value = 'Error: invalid expression';
    });
}
function paste(str)
{
    input.value = 
    input.value.slice(0, place) + '' +
    str + '' + input.value.slice(place);
    place+=str.length;
}
function clickDigit(e){
    e.preventDefault();
    paste(e.target.textContent);
}

const choises = document.querySelector('#choise').children;
let numbers = document.querySelector('#numbers');
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
}
choises[1].addEventListener('change', changeStartSystem);
//math functions


const arr = document.querySelectorAll('#numbers > button');
for(let i of arr) i.addEventListener('click', clickDigit);
setInterval(()=> 
{
    if(input===document.activeElement)
    place = input.selectionStart;
    place = place ?? 0;
}, 10);


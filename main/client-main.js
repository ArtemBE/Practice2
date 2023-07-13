let place = 0;
const input = document.querySelector('#calc > input');

function requestToServer(){
    fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({val: input.value})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.val);
        input.value = data.val;
        // Делайте с данными, полученными от сервера, что вам нужно
    })
    .catch(error => {
        console.log('Ошибка: ', error);
        input.value = 'Error: invalid expr';
    });
}

function clickButton(e)
{
    e.preventDefault();
    function paste(str)
    {
        input.value = 
        input.value.slice(0, place) + '' +
        str + '' + input.value.slice(place);
        place+=str.length;
    }
    const text = e.target.textContent;
    if(text==='C') input.value = '';
    else if(text=='deg') e.target.textContent = 'rad';
    else if(text=='rad') e.target.textContent = 'deg';
    else if(text=='=') requestToServer();
    else {
        paste(e.target.textContent);
    }
}

const arr = document.querySelectorAll('#calc > button');
for(let i of arr) i.addEventListener('click', clickButton);
setInterval(()=> 
{
    if(input===document.activeElement)
    place = input.selectionStart;
    place = place ?? 0;
}, 10);


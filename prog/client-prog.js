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
function numSystem(inner){
    if(inner.includes('<button>F</button>')) return 16;
    if(inner.includes('<button>9</button>')) return 10;
    if(inner.includes('<button>7</button>')) return 8;
    if(inner.includes('<button>1</button>')) return 2;
}
function clickDigit(e){

}
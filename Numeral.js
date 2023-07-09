function toDecimal(val, s){
    switch (s){
        case 2:
            return Number('0b'+val);
        case 8:
            return Number('0o'+val);
        case 16:
            return Number('0x'+val);
    }
}
const digit = val => 
    isNaN(Number(val))?Number(val.charCodeAt(0)-'A'.charCodeAt(0)+10):Number(val);
const undigit = val => 
    Number(val)>9?String.fromCharCode('A'.charCodeAt(0)+Number(val)-10):Number(val);
function fromDecimal(val, s){
    let binary = "";
    let res = val;
    while (res > 0)
    {
        let remainder = res % s;
        binary = undigit(remainder) + '' + binary;
        res = Math.floor(res/s);
    }
    return binary;
}
function toBinary(val, s){
    const arr = ['0000', '0001', '0010', '0011',
                 '0100', '0101', '0110', '0111',
                 '1000', '1001', '1010', '1011',
                 '1100', '1101', '1110', '1111',];
    let a='';
    let vals = String(val);
    switch(s){
        case 10:
            return fromDecimal(val, 2);
        case 8:
            while (vals!='')
            {
                a=a+arr[digit(vals[0])].slice(1);
                vals=vals.slice(1);
            }
            return a;
        case 16:
            while (vals!='')
            {
                a=a+arr[digit(vals[0])];
                vals=vals.slice(1);
            }
            while (a[0]==='0')
            {
                a=a.slice(1);
            }
            return a;
    }
}
function fromBinary(val, s){
    const arr = ['0000', '0001', '0010', '0011',
                 '0100', '0101', '0110', '0111',
                 '1000', '1001', '1010', '1011',
                 '1100', '1101', '1110', '1111',];
    let a = '';
    let vals = String(val);
    switch(s){
        case 10:
            return Number('0b'+val);
        case 8:
            //if(vals==='0') return 0;
            if(vals.length%3===2) vals='0' + vals;
            else if(vals.length%3==1) vals='00' + vals;
            while(vals!==''){
                a=a+arr.indexOf('0' + vals.slice(0, 3));
                vals=vals.slice(3);
            }
            return a;
        case 16:
            //if(vals==='0') return 0;
            if(vals.length%4===3) vals='0' + vals;
            else if(vals.length%4==2) vals='00' + vals;
            else if(vals.length%4==1) vals='000' + vals;
            while(vals!==''){
                a=a+undigit(arr.indexOf(vals.slice(0, 4)));
                vals=vals.slice(4);
            }
            return a;
    }
}
console.log('\n' + fromBinary('1101010', 8));
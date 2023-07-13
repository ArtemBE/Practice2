function toDecimal(val, s){
    switch (s){
        case 10:
            return Number(val);
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
    if(s===10) return val;
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
        case 2: return vals;
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
        case 2: return vals;
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
/* console.log('\n' + fromBinary('1101010', 8) + '\n'); */

function trans(val, a, b){
    if(a===2) return fromBinary(val, b);
    else if(a===10) return fromDecimal(val, b);
    else if(a===8) return fromBinary(toBinary(val, 8), b);
    else if(a===16) return fromBinary(toBinary(val, 16), b);
}
function transNoZero(val, a, b){
    if(a===10) return trans(val, a, b);
    let vals=String(val);
    while(vals[0]==='0' && vals.length>1) vals=vals.slice(1);
    return trans(vals, a, b);
}

const sum = (a, b, sys) => trans(Number(trans(a, sys, 10))+Number(trans(b, sys, 10)), 10, sys);
const dif = (a, b, sys) => trans(Number(trans(a, sys, 10))-Number(trans(b, sys, 10)), 10, sys);
const mul = (a, b, sys) => trans(Number(trans(a, sys, 10))*Number(trans(b, sys, 10)), 10, sys);
const div = (a, b, sys) => trans(Number(trans(a, sys, 10))/Number(trans(b, sys, 10)), 10, sys);
function and(a, b, sys){
    let a1 = transNoZero(a, sys, 2), b1 = transNoZero(b, sys, 2), res='';
    while(a1.length>b1.length) b1='0'+b1;
    while(b1.length>a1.length) a1='0'+a1;
    while(a1!='') {
        res=res+String((a1[0]*b1[0]>0)?1:0);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return transNoZero(res, 2, sys);
}
function or(a, b, sys){
    let a1 = transNoZero(a, sys, 2), b1 = transNoZero(b, sys, 2), res='';
    while(a1.length>b1.length) b1='0'+b1;
    while(b1.length>a1.length) a1='0'+a1;
    while(a1!='') {
        res=res+String((Number(a1[0])+Number(b1[0])>0)?1:0);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return transNoZero(res, 2, sys);
}
function xor(a, b, sys){
    let a1 = transNoZero(a, sys, 2), b1 = transNoZero(b, sys, 2), res='';
    while(a1.length>b1.length) b1='0'+b1;
    while(b1.length>a1.length) a1='0'+a1;
    while(a1!='') {
        res=res+String((a1[0]===b1[0])?0:1);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return transNoZero(res, 2, sys);
}
function not(val, sys){
    let res='';
    let vals = String(val);
    if(sys===2) while(vals!==''){
        res=res+String((vals[0]==='0')?'1':'0');
        vals=vals.slice(1);
    }
    else{
        vals=String(transNoZero(val, sys, 2));
        while(vals!==''){
            res=res+String((vals[0]==='0')?'1':'0');
            vals=vals.slice(1);
        }
        res=transNoZero(res, 2, sys);
    }
    return res;
}
function rev(val, sys){
    let vals;
    if(sys===2) vals=String(val);
    else vals=transNoZero(val, sys, 2);
    const sign = vals[0];
    vals=vals.slice(1);
    if(sign==='0') return val;
    else return trans('1' + String(not(vals, 2)), 2, sys);
}
function add1(val){
    if(!val.includes('0')) return '1' + val.replace(/1/g, '0');
    let vals = String(val).split('');
    let res = '';
    let a;
    while(true){
        a=vals.pop();
        if (a==='0') {
            res='1'+res;
            break;
        }
        else res='0'+res;
    }
    res=vals.join('')+res;
    return res;
}
function com(val, sys){
    let vals;
    if(sys===2) vals=String(val);
    else vals=transNoZero(val, sys, 2);
    const sign = vals[0];
    vals=vals.slice(1);
    if(sign==='0') return val;
    else return trans(add1('1' + String(not(vals, 2))), 2, sys);
}
module.exports = {
    trans, sum, dif, mul, div,
    and, or, xor, transNoZero,
    not, add1
};
/* 
console.log(or('1011001', '0110011', 2) + '\t' + trans(or('1011001', '0110011', 2), 2, 16) + '\t' + trans(or('1011001', '0110011', 2), 2, 10));
console.log(and('1011001', '0110011', 2) + '\t' + trans(and('1011001', '0110011', 2), 2, 16) + '\t' + trans(and('1011001', '0110011', 2), 2, 10));
console.log(xor('1011001', '0110011', 2) + '\t' + trans(xor('1011001', '0110011', 2), 2, 16) + '\t' + trans(xor('1011001', '0110011', 2), 2, 10));
console.log();
console.log('1011001\t' + trans('1011001', 2, 16) + '\t' + trans('1011001', 2, 10));
console.log('0110011\t' + trans('0110011', 2, 16) + '\t' + trans('0110011', 2, 10));
console.log();
console.log(trans('000123', 8, 10));
console.log(trans('00051', 8, 10));
console.log(xor('89', '51', 10));
console.log(not('64', 10));
console.log();
console.log(add1('11111')); */
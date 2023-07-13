const n = require('./Numeral');
function digit(val, a){
    if(val.length>a) return val.slice(val.length-a);
    let vals=String(val);
    while(vals.length<a)
    vals='0'+vals;
    return vals;
}

function deleteZero(a){
    val = String(a);
    while(val[0]==='0' && val.length>1) val=val.slice(1);
    return val;
}
/* console.log(digit('11010', 4)); */
function trans(val, a, b){
    let vals=String(val);
    if(vals[0]==='-') return '-' + deleteZero(n.transNoZero(vals.slice(1), a, b));
    else return deleteZero(n.transNoZero(vals, a, b));
}

function and(a, b, sys, dig){
    let res = '';
    let a1=digit(n.trans(a, sys, 2), dig);
    let b1=digit(n.trans(b, sys, 2), dig);
    while(a1!='') {
        res=res+String((a1[0]*b1[0]>0)?1:0);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return n.transNoZero(res, 2, sys);
}
function or(a, b, sys, dig){
    let res = '';
    let a1=digit(n.trans(a, sys, 2), dig);
    let b1=digit(n.trans(b, sys, 2), dig);
    while(a1!='') {
        res=res+String((Number(a1[0])+Number(b1[0])>0)?1:0);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return n.transNoZero(res, 2, sys);
}
function not(val, sys, dig){
    let res='';
    let vals = String(val);
    if(sys===2) vals=digit(vals, dig);
    if(sys===2) while(vals!==''){
        res=res+String((vals[0]==='0')?'1':'0');
        vals=vals.slice(1);
    }
    else{
        vals=digit(n.transNoZero(vals, sys, 2), dig);
        while(vals!==''){
            res=res+String((vals[0]==='0')?'1':'0');
            vals=vals.slice(1);
        }
        res=n.transNoZero(res, 2, sys);
    }
    return res;
}

function xor(a, b, sys, dig){
    let res = '';
    let a1=digit(n.trans(a, sys, 2), dig);
    let b1=digit(n.trans(b, sys, 2), dig);
    while(a1!='') {
        res=res+String((a1[0]===b1[0])?0:1);
        a1 = a1.slice(1);
        b1 = b1.slice(1);
    }
    return n.transNoZero(res, 2, sys);
}
//function com(a, b, c)
/* console.log(xor('59', '33', 10, 20)); */
function com(val, sys, dig){
    let vals = String(val);
    
    let sign = 0;
    if(val[0]==='-'){
        sign=1;
        vals=vals.slice(1);
    }
    vals=digit(n.transNoZero(vals, sys, 2), dig-1);
    if(sign===1) vals=digit(n.add1(n.not(vals, 2)), dig-1);
    return String(sign)+vals;
}
function rev(val, sys, dig){
    let vals = String(val);
    
    let sign = 0;
    if(val[0]==='-'){
        sign=1;
        vals=vals.slice(1);
    }
    vals=digit(n.transNoZero(vals, sys, 2), dig-1);
    if(sign===1) vals=digit(n.not(vals, 2), dig-1);
    return String(sign)+vals;
}

function shiftLeft(a, sys, dig){
    let val = trans(a, sys, 2);
    val = digit(val, dig);
    val = val + '0';
    val = val.slice(1);
    return trans(val, 2, sys);
}
function shiftRight(a, sys, dig){
    let val = trans(a, sys, 2);
    val = digit(val, dig);
    val = val.slice(0, val.length-1);
    val = '0' + val;
    return trans(val, 2, sys);
}

const sum = (a, b, sys) => trans(Number(trans(a, sys, 10))+Number(trans(b, sys, 10)), 10, sys);
const dif = (a, b, sys) => trans(Number(trans(a, sys, 10))-Number(trans(b, sys, 10)), 10, sys);
const mul = (a, b, sys) => trans(Number(trans(a, sys, 10))*Number(trans(b, sys, 10)), 10, sys);
const div = (a, b, sys) => trans(Math.floor(Number(trans(a, sys, 10))/Number(trans(b, sys, 10))), 10, sys);

module.exports = {
    sum, dif, mul, div,
    trans, and, not, or,
    xor, com, rev, shiftLeft,
    shiftRight
}

/* console.log('\n'+com('-146', 8, 8));
console.log('\n'+rev('-146', 8, 8));
console.log('\n'+com('146', 8, 8));
console.log('\n'+rev('146', 8, 8));
console.log(trans('-186', 10, 2));
console.log();
console.log(div('110000100', '1001', 2)); */
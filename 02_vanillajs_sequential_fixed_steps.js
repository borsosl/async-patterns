'use strict';

function async(useResult)
{
    setTimeout(step1.bind(null, useResult), 500);
}


function step1(useResult)
{
    console.log('Step 1');
    var x = Math.random();
    setTimeout(step2.bind(null, x, useResult), 500);
}


function step2(x, useResult)
{
    console.log('Step 2');
    var y = x * 2;
    setTimeout(step3.bind(null, y, useResult), 500);
}


function step3(y, useResult)
{
    console.log('Step 3');
    var z = y + 2;
    useResult(z);
}


function print(res)
{
    console.log('Result is ' + res);
}

async(print);

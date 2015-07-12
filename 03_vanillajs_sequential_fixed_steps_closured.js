'use strict';

function async(useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(step2.bind(null, x), 500);
    }


    function step2(x)
    {
        console.log('Step 2');
        var y = x * 2;
        setTimeout(step3.bind(null, y), 500);
    }


    function step3(y)
    {
        console.log('Step 3');
        var z = y + 2;
        useResult(z);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

async(print);

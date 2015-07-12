'use strict';

/*
 * Step 2 is now repeated variable times based on input array of multipliers.
 */
function async(multipliers, useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(step2.bind(null, 0, x), 500);
    }


    function step2(index, x)
    {
        if(index === multipliers.length)
            return useResult(x);

        console.log('Step 2, call #' + (index+1));
        x *= multipliers[index];
        setTimeout(step2.bind(null, index+1, x), 500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

async([5,7,2,4], print);

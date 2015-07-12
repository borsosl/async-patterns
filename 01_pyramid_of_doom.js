'use strict';

/**
 * Async tasks:
 * 1. create random number
 * 2. multiply by 2
 * 3. add 2
 */

function async(useResult)
{
    setTimeout(function()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(function()
        {
            console.log('Step 2');
            var y = x * 2;
            setTimeout(function()
            {
                console.log('Step 3');
                var z = y + 2;
                useResult(z);
            }, 500);
        }, 500);
    }, 500);
}


function useResult(res)
{
    console.log('Result is ' + res);
}

async(useResult);

'use strict';

/*
 * sequence() is a generic function to iterate async operations sequentially.
 */
function async(multipliers, useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(sequence.bind(null, x, multipliers, step2, useResult), 500);
    }


    function step2(x, multipliers, index, next)
    {
        console.log('Step 2, call #' + (index+1));
        x *= multipliers[index];
        setTimeout(next.bind(null, x), 500);
    }
}


function sequence(data, coll, stepCb, resolveCb)
{
    function iterate(index, data)
    {
        if(index === coll.length)
            return resolveCb(data);

        stepCb(data, coll, index, iterate.bind(null, index+1));
    }

    iterate(0, data);
}


function print(res)
{
    console.log('Result is ' + res);
}

async([5,7,2,4], print);

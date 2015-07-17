'use strict';

var async = require('async');

function run(multipliers, useResult)
{
    var steps = [step1, step2];
    async.waterfall(steps, function(err, res)
    {
        if(err)
            return console.log(err);

        useResult(res);
    });


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var x = Math.random();
            done(null, x);
        }, 500);
    }


    function step2(x, done)
    {
        console.log('Step 2');
        step2index = 0;
        async.reduce(multipliers, x, step2iter, done);
    }

    var step2index;

    function step2iter(x, item, done)
    {
        console.log('Step 2, call #' + (++step2index));
        setTimeout(function()
        {
            var err = Math.random()*8 < 1 ? 'error in step 2 ix '+step2index : null;
            x *= item;
            done(err, x);
        }, 500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run([5,7,2,4], print);

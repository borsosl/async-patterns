'use strict';

var async = require('async');

function run(multipliers, useResult)
{
    var x;
    var steps = [step1, step2];
    async.series(steps, function(err)
    {
        if(err)
            return console.log(err);

        useResult(x);
    });


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            x = Math.random();
            done(null, x);
        }, 500);
    }


    function step2(done)
    {
        console.log('Step 2');
        async.forEachOf(multipliers, step2iter, done);
    }


    function step2iter(item, index, done)
    {
        setTimeout(function()
        {
            console.log('Step 2, call #' + (index+1));
            var err = Math.random()*8 < 1 ? 'error in step 2 ix '+(index+1) : null;
            x *= item;
            done(err);
        }, 500 + Math.random()*500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run([5,7,2,4], print);

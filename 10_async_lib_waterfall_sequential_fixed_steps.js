'use strict';

var async = require('async');

function run(useResult)
{
    var steps = [step1, step2, step3];
    async.waterfall(steps, useResult);


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            done(null, Math.random());
        }, 500);
    }


    function step2(x, done)
    {
        console.log('Step 2');
        setTimeout(function()
        {
            done(null, x * 2);
        }, 500);
    }


    function step3(x, done)
    {
        console.log('Step 3');
        setTimeout(function()
        {
            done(null, x + 2);
        }, 500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run(function(err, res)
{
    if(err)
        return console.log(err);

    print(res);
});

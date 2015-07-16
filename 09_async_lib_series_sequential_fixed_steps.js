'use strict';

var async = require('async');

function run(useResult)
{
    var x = 0;
    var steps = [step1, step2, step3];
    async.series(steps, useResult);


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
        setTimeout(function()
        {
            x *= 2;
            done(null, x);
        }, 500);
    }


    function step3(done)
    {
        console.log('Step 3');
        setTimeout(function()
        {
            x += 2;
            done(null, x);
        }, 500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run(function(err, resArr)
{
    if(err)
        return console.log(err);

    print(resArr[resArr.length-1]);
});

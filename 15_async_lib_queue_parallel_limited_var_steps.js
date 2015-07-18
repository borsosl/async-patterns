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
        step2index = 0;
        var q = async.queue(step2iter, 2);
        var erred = false;
        for(var i in multipliers)
            q.push(multipliers[i], function(err)
            {
                if(!erred && err)
                {
                    erred = true;
                    q.kill();
                    return done(err);
                }
            });
        q.drain = function()
        {
            if(!erred)
                done(null, x);
        };
    }

    var step2index;

    function step2iter(taskOrData, done)
    {
        var ix = ++step2index;
        console.log('Step 2, call #' + ix + ' started');
        setTimeout(function()
        {
            var err = Math.random()*8 < 1 ? 'error in step 2 ix '+ix : null;
            x *= taskOrData;
            console.log('Step 2, call #' + ix + ' finished');
            done(err);
        }, 500 + Math.random()*500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run([5,7,2,4], print);

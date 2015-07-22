'use strict';

var promisify = require("es6-promisify");

function run(multipliers, useResult)
{
    promisify(step1)()
        .then(promisify(step2))
        .then(done.bind(this, null))
        .catch(done);


    function done(err, res)
    {
        if(err)
            return console.log('Catch: ' + err);

        useResult(res);
    }


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var err = Math.random()*6 < 1 ? 'error in step 1' : null;
            var x = Math.random();
            done(err, x);
        }, 500);
    }


    function step2(x, done)
    {
        console.log('Step 2');
        var pr = Promise.resolve(x);
        for(var i in multipliers)
            pr = pr.then(promisify(step2iter.bind(this, multipliers, i)));
        pr.then(done.bind(this, null))
            .catch(done);
    }


    function step2iter(multipliers, index, x, done)
    {
        var item = multipliers[index++];
        console.log('Step 2, call #' + index);
        setTimeout(function()
        {
            var err = Math.random()*8 < 1 ? 'error in step 2 ix ' + index : null;
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

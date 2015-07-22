'use strict';

var promisify = require("es6-promisify");

function run(useResult)
{
    promisify(step1)()
        .then(promisify(step2))
        .then(promisify(step3))
        .then(useResult.bind(this, null))
        .catch(useResult);


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var err = Math.random()*3 < 1 ? 'error in step 1' : null;
            var x = Math.random();
            done(err, x);
        }, 500);
    }


    function step2(x, done)
    {
        console.log('Step 2');
        setTimeout(function()
        {
            var err = Math.random()*3 < 1 ? 'error in step 2' : null;
            x *= 2;
            done(err, x);
        }, 500);
    }


    function step3(x, done)
    {
        console.log('Step 3');
        setTimeout(function()
        {
            var err = Math.random()*3 < 1 ? 'error in step 3' : null;
            x += 2;
            done(err, x);
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
        return console.log('Catch: ' + err);

    print(res);
});

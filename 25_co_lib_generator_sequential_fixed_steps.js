'use strict';


var co = require("co"),
    promisify = require("es6-promisify");


function run(useResult)
{
    co(process);


    function* process()
    {
        try {
            var res = yield promisify(step1)();
            res = yield promisify(step2)(res);
            res = yield promisify(step3)(res);
            useResult(null, res);
        } catch(err) {
            useResult(err);
        }
    }


    function step1(done)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var err = Math.random()*6 < 1 ? 'error in step 1' : null;
            if(err)
                return done(err);
            var x = Math.random();
            done(null, x);
        }, 500);
    }


    function step2(x, done)
    {
        console.log('Step 2');
        setTimeout(function()
        {
            var err = Math.random()*6 < 1 ? 'error in step 2' : null;
            if(err)
                return done(err);
            x *= 2;
            done(null, x);
        }, 500);
    }


    function step3(x, done)
    {
        console.log('Step 3');
        setTimeout(function()
        {
            var err = Math.random()*6 < 1 ? 'error in step 3' : null;
            if(err)
                return done(err);
            x += 2;
            done(null, x);
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

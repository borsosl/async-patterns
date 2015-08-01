'use strict';


var thunkify = require('thunkify');


function thunkGeneratorRunner(generatorFn)
{
    function callback(err)
    {
        if(err)
            return gen.throw(err);

        var res = Array.prototype.slice.call(arguments, 1);
        if(res.length === 1)
            res = res[0];
        else if(!res.length)
            res = undefined;

        var thunk = gen.next(res).value;
        thunk && thunk(callback);
    }

    var gen = generatorFn();
    var thunk = gen.next().value;
    thunk && thunk(callback);
}


function run(useResult)
{
    thunkGeneratorRunner(process);


    function* process()
    {
        try {
            // instead of thunkify we could just use step2.bind(this, res), etc.
            var res = yield thunkify(step1)();
            res = yield thunkify(step2)(res);
            res = yield thunkify(step3)(res);
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

'use strict';

function cpsGeneratorRunner(generatorFn)
{
    function callback(err)
    {
        if(err)
            return gen.throw(err);

        var res = [].slice.call(arguments, 1);
        if(res.length === 1)
            res = res[0];
        else if(!res.length)
            res = undefined;

        gen.next(res);
    }

    var gen = generatorFn(callback);
    gen.next();
}


function run(useResult)
{
    cpsGeneratorRunner(process);


    function* process(done)
    {
        try {
            var res = yield step1(done);
            res = yield step2(res, done);
            res = yield step3(res, done);
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

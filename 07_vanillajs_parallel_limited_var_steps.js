'use strict';

function async(values, useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(limitedParallel.bind(null, x, values, 2, nextSteps, useResult), 500);
    }


    function nextSteps(ref, values, index, done)
    {
        console.log('Starting step #' + (index+2));
        var error = Math.random()*12 < 1 ? new Error('index ' + (index+2)) : null;
        ref.data += values[index];
        setTimeout(done.bind(null, error, index+1), 500+Math.random()*1000);
    }
}


function limitedParallel(data, coll, limit, stepCb, resolveCb)
{
    // wrap data just in case it's primitive, for the processors to manipulate
    var dataRef = {
        data: data
    };
    var completed = 0,
        running = 0,
        index = 0,
        erred;


    function done(err, index)
    {
        console.log('Finished step #' + (index+1));
        ++completed;
        --running;

        if(!erred && err)
        {
            erred = true;
            return resolveCb(err);
        }

        if(!erred)
        {
            if(completed === coll.length)
                resolveCb(dataRef.data);
            else
                next();
        }
    }

    function next()
    {
        for(; running < limit && index < coll.length; ++running)
            stepCb(dataRef, coll, index++, done);
    }

    // unleash limited # of beasts
    next();
}


function print(res)
{
    if(res instanceof Error)
        return console.log('An error occured: ' + res.message);

    console.log('Result is ' + res);
}

async([5,7,2,4], print);

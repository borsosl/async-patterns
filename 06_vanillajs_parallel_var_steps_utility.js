'use strict';

/*
 * parallel() is a generic function to iterate async operations in parallel.
 */
function async(values, useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(parallel.bind(null, x, values, step2, useResult), 500);
    }


    function step2(ref, values, index, done)
    {
        var error = Math.random()*10 < 1 ? new Error('index ' + (index+1)) : null;
        ref.data += values[index];
        setTimeout(done.bind(null, error, index), 500+Math.random()*50);
    }
}


function parallel(data, coll, stepCb, resolveCb)
{
    // wrap data just in case it's primitive, for the processors to manipulate
    var dataRef = {
        data: data
    };
    var completed = 0,
        erred;


    function done(err, index)
    {
        console.log('Finished process #' + (index+1));
        ++completed;
        if(!erred && err)
        {
            erred = true;
            return resolveCb(err);
        }

        if(!erred && completed === coll.length)
            resolveCb(dataRef.data);
    }

    // unleash the beasts all at once
    for(var i=0; i<coll.length; ++i)
        stepCb(dataRef, coll, i, done);
}


function print(res)
{
    if(res instanceof Error)
        return console.log('An error occured: ' + res.message);

    console.log('Result is ' + res);
}

async([5,7,2,4], print);

'use strict';

function run(useResult)
{
    new Promise(step1)
        .then(step2)
        .then(step3)
        .then(useResult.bind(this, null))
        .catch(useResult);


    function step1(fulfil, reject)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var err = Math.random()*3 < 1 ? 'error in step 1' : null;
            if(err)
                return reject(err);
            var x = Math.random();
            fulfil(x);
        }, 500);
    }


    function step2(x)
    {
        console.log('Step 2');
        return new Promise(function(fulfil, reject)
        {
            setTimeout(function()
            {
                var err = Math.random()*3 < 1 ? 'error in step 2' : null;
                if(err)
                    return reject(err);
                x *= 2;
                fulfil(x);
            }, 500);
        });
    }


    function step3(x, done)
    {
        console.log('Step 3');
        return new Promise(function(fulfil, reject)
        {
            setTimeout(function()
            {
                var err = Math.random()*3 < 1 ? 'error in step 3' : null;
                if(err)
                    return reject(err);
                x += 2;
                fulfil(x);
            }, 500);
        });
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

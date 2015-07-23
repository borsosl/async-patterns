'use strict';


function run(multipliers, useResult)
{
    new Promise(step1)
        .then(step2)
        .then(useResult)
        .catch(function(err)
        {
            console.log('Catch: ' + err);
        });


    function step1(fulfil, reject)
    {
        console.log('Step 1');
        setTimeout(function()
        {
            var err = Math.random()*6 < 1 ? 'error in step 1' : null;
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
            var pr = Promise.resolve(x);
            for(var i in multipliers)
                pr = pr.then(step2iter.bind(this, multipliers, i));
            pr.then(fulfil)
                .catch(reject);
        });
    }


    function step2iter(multipliers, index, x)
    {
        var item = multipliers[index++];
        console.log('Step 2, call #' + index);
        return new Promise(function(fulfil, reject)
        {
            setTimeout(function()
            {
                var err = Math.random()*8 < 1 ? 'error in step 2 ix ' + index : null;
                if(err)
                    return reject(err);
                x *= item;
                fulfil(x);
            }, 500);
        });
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run([5,7,2,4], print);

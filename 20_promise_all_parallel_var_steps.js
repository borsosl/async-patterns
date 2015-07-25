'use strict';


function run(multipliers, useResult)
{
    var x;

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
            x = Math.random();
            fulfil();
        }, 500);
    }


    function step2()
    {
        console.log('Step 2');
        var prArr = [];
        for(var i in multipliers)
            prArr.push(new Promise(step2iter.bind(this, multipliers, i)));
        return Promise.all(prArr)
            .then(function(){return x;});
    }


    function step2iter(multipliers, index, fulfil, reject)
    {
        setTimeout(function()
        {
            var item = multipliers[index++];
            console.log('Step 2, call #' + index);
            var err = Math.random()*8 < 1 ? 'error in step 2 ix ' + index : null;
            if(err)
                return reject(err);
            x *= item;
            fulfil();
        }, 500 + Math.random()*500);
    }
}


function print(res)
{
    console.log('Result is ' + res);
}

run([5,7,2,4], print);

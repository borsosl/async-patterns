'use strict';

var co = require("co");


function run(multipliers, useResult)
{
    var x;

    co(process);


    function* process()
    {
        try {
            x = yield new Promise(step1);
            yield step2;
            useResult(x);
        } catch(err) {
            console.log('Catch: ' + err);
        }
    }


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


    function* step2()
    {
        console.log('Step 2');
        var prArr = [];
        for(var i in multipliers)
            prArr.push(new Promise(step2iter.bind(this, multipliers, i)));
        yield prArr;
    }


    function step2iter(multipliers, index, fulfil, reject)
    {
        setTimeout(function()
        {
            var item = multipliers[index++];
            console.log('Step 2, call #' + index);
            var err = Math.random()*6 < 1 ? 'error in step 2 ix ' + index : null;
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

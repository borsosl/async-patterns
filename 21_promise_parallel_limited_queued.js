'use strict';

function LimitedParallelTaskQueue(limit)
{
    this.limit = limit;
    this.q = [];
    this.running = 0;
    this.completed = 0;
}


LimitedParallelTaskQueue.prototype.add = function add(task)
{
    if(!this.fulfil)
        this.q.push(task);
};


LimitedParallelTaskQueue.prototype.close = function close()
{
    var o = this;
    return new Promise(function(fulfil, reject)
    {
        o.fulfil = fulfil;
        o.reject = reject;
        o.next();
    });
};


LimitedParallelTaskQueue.prototype.next = function next()
{
    var o = this;
    while(o.q.length && o.running < o.limit)
    {
        var t = o.q.shift();
        new Promise(t).then(fulfiled, rejected);
        ++o.running;
    }


    function fulfiled(val)
    {
        console.log('Successful step #' + (val.index+1));
        ++o.completed;
        --o.running;

        if(!o.erred)
        {
            if(o.q.length)
                return o.next();

            if(!o.running && o.fulfil)
                o.fulfil(val.data);
        }
    }


    function rejected(val)
    {
        console.log('Failed step #' + (val.index+1));
        if(!o.erred)
        {
            o.erred = true;
            o.reject(val.err);
        }
    }
};


function async(values, useResult)
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
        // wrap primitive in a shared object to work on
        var data = {
            x: x
        };
        // create queue for next steps
        var q = new LimitedParallelTaskQueue(2);
        for(var i in values)
            q.add(step2iter.bind(null, data, values[i], parseInt(i)));
        return q.close();
    }


    function step2iter(data, value, index, fulfil, reject)
    {
        console.log('Step 2, call #' + (index+1));
        setTimeout(function()
        {
            var err = Math.random()*8 < 1 ? 'error in step 2 ix ' + (index+1) : null;
            if(err)
                return reject({
                    index: index,
                    err: err
                });
            data.x *= value;
            fulfil({
                index: index,
                data: data.x
            });
        }, 500 + Math.random()*500);
    }
}


function print(x)
{
    console.log('Result is ' + x);
}

async([5,7,2,4], print);

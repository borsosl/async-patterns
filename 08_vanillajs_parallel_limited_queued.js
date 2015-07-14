'use strict';

function LimitedParallelTaskQueue(limit, resolveCb)
{
    this.limit = limit;
    this.resolveCb = resolveCb;
    this.q = [];
    this.running = 0;
    this.completed = 0;
    this.closed = false;
    this.erred = false;
}


LimitedParallelTaskQueue.prototype.add = function(task)
{
    if(!this.closed)
        this.q.push(task);
};


LimitedParallelTaskQueue.prototype.close = function()
{
    this.closed = true;
};


LimitedParallelTaskQueue.prototype.next = function()
{
    var o = this;
    while(o.q.length && o.running < o.limit)
    {
        var t = o.q.shift();
        t(done);
        ++o.running;
    }


    function done(err, data, index)
    {
        console.log('Finished step #' + (index+1));
        ++o.completed;
        --o.running;
        if(!o.erred && err)
        {
            o.erred = true;
            return o.resolveCb(err);
        }

        if(!o.erred)
        {
            if(o.q.length)
                return o.next();

            if(!o.running && o.closed)
                o.resolveCb(null, data);
        }
    }
};


function async(values, useResult)
{
    setTimeout(step1, 500);


    function step1()
    {
        console.log('Step 1');
        var x = Math.random();
        setTimeout(step1done.bind(null, x), 500);

    }


    function step1done(x)
    {
        // wrap primitive in a shared object to work on
        var data = {
            x: x
        };
        // create queue for next steps
        var q = new LimitedParallelTaskQueue(2, useResult);
        for(var i in values)
            q.add(step2.bind(null, data, values[i], parseInt(i)));
        q.close();
        q.next();
    }


    function step2(data, value, index, done)
    {
        console.log('Starting step #' + (index+2));
        var err = Math.random()*6 < 1 ? new Error('index ' + (index+2)) : null;
        data.x += value;
        setTimeout(done.bind(null, err, data, index+1), 500+Math.random()*1000);
    }
}


function print(err, data)
{
    if(err)
        return console.log('An error occured: ' + err.message);

    console.log('Result is ' + data.x);
}

async([5,7,2,4], print);

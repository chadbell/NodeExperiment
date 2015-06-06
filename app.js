var seneca = require('seneca')()

var request = {
    "id":"1040A",
    "functions":[{
        "cmd":"add",
        "parms" : {
            "num1": 1,
            "num2": 2
        }
    },
    {
        "cmd":"subtract",
        "parms" : {
            "num1": 1,
            "num2": 2
        }
    }
    ]
}
seneca.add( {role:'math', cmd:'add'}, function(args,callback) {
    var sum = args.request.num1 + args.request.num2
    callback(null,sum)
})

seneca.add( {role:'math', cmd:'subtract'}, function(args,callback) {
    var sum = args.request.num1 - args.request.num2
    callback(null,sum)
})

function runRequest(request) {
    var cmd = request.functions[0].cmd;
    var parms = request.functions[0].parms;
    var callback
    for (var i=0;i<request.functions.length;i++) {

        seneca.act({
            role: 'math',
            cmd: cmd,
            request: parms
        }, function (err, result) {
            if (err) return console.error(err)
            console.log(result)
        });
    }
}


runRequest(request);
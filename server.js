var http = require('http');
var fs = require('fs');
var gifList = require('./gifList');

fs.readFile('reader.html', function (err, html) {
    if (err) {
        throw err; 
    }  
	http.createServer(function (req, res) {
	    //authenticate request
	    //send message
	    //console.log(req);
	    if(req.url=="/reader.html"){
	    		res.writeHeader(200, {"Content-Type": "text/html"});  
	        res.write(html);  
	        res.end();  
	    }else{
	    	res.writeHead(200, {'Content-Type':'application/json'});
	    	gifList.poll_gifs(function(data){
	    		res.end(JSON.stringify(data));
	    	});
	    
	    }
	    
	    

	}).listen(8080);
});
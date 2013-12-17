 var jQuery = require('jQuery');

jQuery(function() {
        var existing_ids = {};
        var future_queue = [];
        var poll_interval = 10000;
        var queue_interval = 1500;
        var is_paused = false;
        var poll_timeout_id = -1;
        var gif_queue_timeout_id = -1;
        var gifsURL= [];

 function poll_gifs(callBack) {
             jQuery.get('http://gifhell.com/time/', {}, function(data) {
                var data = jQuery(data);
                var this_queue = []; 
                gifsURL= [];            
                data.find('li').each(function(index, element) {
                    var gif_id = jQuery(element).data('gifid');
                    if (gif_id && !(gif_id in existing_ids)){
                        existing_ids[gif_id] = true;
                        this_queue.unshift(element);
                    }
                    if(element.childNodes[1]){
                        if(element.childNodes[1]._attributes['src']){
                            var gifURL=element.childNodes[1]._attributes['src']._nodeValue;
                            //console.log(gifURL);
                            gifsURL.push(gifURL);
                        }
                         
                    }
                   
                    //console.log(element.getElementById('img').attributes['src']);
                    //gifsURL.push(jQuery(element).find('img').attributes[src]);

                });
                if (this_queue) {
                    future_queue = this_queue;
                }
                callBack ({gifsURL : gifsURL});
                 //console.log({gifsURL : gifsURL});
            }, 'html');
            
        }
        exports.poll_gifs=poll_gifs;

       //poll_gifs();

});
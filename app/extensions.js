//Adding some functionaity that will help make our code cleaner in the future
//Trying to use plain JavaScript if it is possible, making no dependencies
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments, empty = '';
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
                    ? args[number]
                    : empty
                ;
        });
    };
}
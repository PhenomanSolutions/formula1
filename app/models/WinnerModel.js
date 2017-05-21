APP.factory('WinnerModel', ['modelUtils', function (modelUtils) {

    //Default Pattern for Name and Surname toString
    var _FULL_NAME_PATTERN = '{0} {1}';
    
    function WinnerModel(data) {
        this.id = data['driverId'];
        this.firstName = data['familyName'] || '';
        this.lastName = data['givenName'] || '';
        this.year = data['season'] || '';
        this.round = data['round'] || '';
        this.points = data['points'] || '';
        this.wins = data['wins'] || '';
        this.infoUrl = data['url'] || '';
        this.dateOfBirth = data['dateOfBirth'] ? (new Date(Date.parse(data['dateOfBirth']))).toDateString() : ''; //Parse to Human Readable Date
        this.flagPrefix = modelUtils.parseFlagPrefix(data['nationality']); //Parse to flag Prefix

        //Car Info
        if (data['carInfo']) {
            this.manufacturer = {
                name: data['carInfo']['name'],
                info: data['carInfo']['url'],
                logo: data['carInfo']['name'].toLowerCase().replace(/\s/g, '') //Lowering and removing ALL spaces for making automatic CSS class
            }
        } else {
            this.manufacturer = null;
        }
    }

    WinnerModel.prototype.fullName = function () {
        return _FULL_NAME_PATTERN.format(this.lastName, this.firstName);
    }

    return {
        create: function (data) {
            return new WinnerModel(data);
        }
    }
}]);
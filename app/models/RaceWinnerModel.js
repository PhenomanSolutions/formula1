APP.factory('RaceWinnerModel', ['modelUtils', function (modelUtils) {

    //Default Pattern for Name and Surname toString
    var _FULL_NAME_PATTERN = '{0} {1}';
    
    function RaceWinnerModel(data) {
        this.date = data['date'];
        this.raceName = data['raceName'];
        this.laps = data['laps'];
        this.driverId = data['driverId'];
        this.firstName = data['familyName'];
        this.lastName = data['givenName'];
        this.flagPrefix = modelUtils.parseFlagPrefix(data['nationality']); //Parse to flag Prefix
        this.url = data['url'];
        this.season = data['season'];
        this.time = data['time'];
        this.status = data['status'];

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

    RaceWinnerModel.prototype.fullName = function () {
        return _FULL_NAME_PATTERN.format(this.lastName, this.firstName);
    }

    return {
        create: function (data) {
            return new RaceWinnerModel(data);
        }
    }
}]);
APP.service('modelUtils', [function () {

    return {
        parseFlagPrefix: function (natinality) {
            var _nationality = natinality.toLowerCase();

            switch (_nationality) {
            case 'british':
                return 'gb';
            case 'spanish':
                return 'es';
            case 'german':
                return 'de';

            //To keep Switch Case smaller we will use CASE only when prefix is not first 2 letters, example Netherlands -> nl
            //And we will use default for all other countries: Finland -> fi
            default: return _nationality.substr(0, 2);
            }
        }
    }
}]);
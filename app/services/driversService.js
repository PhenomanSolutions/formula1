APP.service('driversService', ['$http', '$q', 'API_INFO', function ($http, $q, API_INFO) {
    var startYear = 1950,
        _ERR_MESSAGES = {
            FROM_YEAR_IS_REQUIRED: "'fromYear' is Required.",
            TO_YEAR_IS_REQUIRED: "'fromYear' is Required.",
            YEAR_IS_REQUIRED: "'year' is Required."
        };

    return {
        //Service accepts all ranges NOT ONLY 2005 to 2015, so APP is extendable for future
        getWinnersList: function (fromYear, toYear) {
            var defered = $q.defer();

            if (fromYear && toYear) {
                var url = API_INFO.winnersUrl.format(fromYear - startYear, toYear - fromYear + 1); //+1 for including toYear value

                //We use JSONP as we are doing cross-domain request
                $http.jsonp(url, { jsonpCallbackParam: 'callback' })
                    .then(function success(response) {
                        var finalData = [];
                        //Data Structure from API is not optimized for this APP
                        //and it contains a lot of arrays
                        //that is why we use try{} catch{} to be sure that if some data structure will change in the future
                        //APP will not CRUSH but just showing 0 results, until support handles this issue
                        try {
                            //PARSE to make structure we need, as it would come if we had a dedicated SERVER for our application
                            var data = response.data['MRData']['StandingsTable']['StandingsLists'];
                            finalData = data.map(function (d) {
                                var seasonInfo = d['DriverStandings'][0],
                                    driverInfo = seasonInfo['Driver'];

                                driverInfo.season = d['season'];
                                driverInfo.round = d['round'];
                                driverInfo.points = seasonInfo['points'];
                                driverInfo.wins = seasonInfo['wins'];
                                driverInfo.carInfo = seasonInfo['Constructors'][0];
                                return driverInfo;
                            });
                        } catch (err) { }
                        finally {
                            //we need at least an empty result if connection is ok, and ERROR ONLY if no connection or BAD_REQUEST
                            defered.resolve(finalData);
                        }
                    },
                    function error(response) {
                        //we rject if error happens
                        defered.reject(response);
                    });
            } else {
                throw new Error(fromYear ? _ERR_MESSAGES['TO_YEAR_IS_REQUIRED'] : _ERR_MESSAGES['FROM_YEAR_IS_REQUIRED']);
            }

            return defered.promise;
        },

        //Getting list of Round winners in Provided year
        getSeasonWinners: function(year) {
            var defered = $q.defer();

            if (year) {
                var url = API_INFO.roundWinners.format(year);

                //We use JSONP as we are doing cross-domain request
                $http.jsonp(url, { jsonpCallbackParam: 'callback' })
                    .then(function success(response) {
                            var finalData = [];
                            //Data Structure from API is not optimized for this APP
                            //and it contains a lot of arrays
                            //that is why we use try{} catch{} to be sure that if some data structure will change in the future
                            //APP will not CRUSH but just showing 0 results, until support handles this issue
                            try {
                                //PARSE to make structure we need, as it would come if we had a dedicated SERVER for our application
                                var data = response.data['MRData']['RaceTable']['Races'];

                                finalData = data.map(function(d) {
                                    var resultInfo = d['Results'][0],
                                        driverInfo = resultInfo['Driver'],
                                        timeInfo = resultInfo['Time'],
                                        obj = {};

                                    obj.date = d['date'];
                                    obj.raceName = d['raceName'];
                                    obj.laps = resultInfo['laps'];
                                    obj.driverId = driverInfo['driverId'];
                                    obj.familyName = driverInfo['familyName'];
                                    obj.givenName = driverInfo['givenName'];
                                    obj.nationality = driverInfo['nationality'];
                                    obj.url = driverInfo['url'];
                                    obj.season = d['season'];
                                    obj.carInfo = resultInfo['Constructor'];
                                    obj.time = timeInfo ? timeInfo['time'] : '-';
                                    obj.status = resultInfo['status'];
                                    return obj;
                                });
                            } catch (err) {

                            }
                            finally {
                                //we need at least an empty result if connection is ok, and ERROR ONLY if no connection or BAD_REQUEST
                                defered.resolve(finalData);
                            }
                        },
                        function error(response) {
                            //we rject if error happens
                            defered.reject(response);
                        });
            } else {
                throw new Error(_ERR_MESSAGES['YEAR_IS_REQUIRED']);
            }

            return defered.promise;
        }
    }
}]);
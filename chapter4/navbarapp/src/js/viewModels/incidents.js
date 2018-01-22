/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojmodel', 'ojs/ojtable', 
            'ojs/ojcollectiontabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojlistview'],
        function (oj, ko, $) {

            function IncidentsViewModel() {
                var self = this;

                self.allFlightsCol = ko.observable();
                self.allFlightsDatasource = ko.observable();
                self.allDepartingFlightsDatasource = ko.observable();
                self.allDepartingFlightsCol = ko.observable();
                self.allArrivingFlightsDatasource = ko.observable();
                self.allArrivingFlightsCol = ko.observable();
                
                self.convertDateTime = function(date) {
                    var options = {pattern: 'dd/MM/yyyy hh:mm'};
                    var conv = oj.Validation.converterFactory('datetime').createConverter(options);
                    return conv.format(date);
                }
                
                self.parseAllFlights = function (response) {
                    return {Flight: response['FLIGHT_NUMBER'], Place: response['PLACE'],
                        Airline: response['AIRLINES'], Date: self.convertDateTime(response['DATE_TIME']), IsArrival: response['IS_ARRIVAL']
                        , IsArrivalClass: response['IS_ARRIVAL'] === 'N' ? 'fa-rotate-180' : ''};
                };

                self.AllFlight = oj.Model.extend({
                    parse: self.parseAllFlights,
                    idAttribute: 'Flight'
                });
                
                self.AllDepartingFlightsCollection = oj.Collection.extend({
                    url: "https://oracleDBAPIs-partnercloud17.apaas.us6.oraclecloud.com/api/getDepartingFlights",
                    model: new self.AllFlight,
                    comparator: "Flight",
                    parse: function (flights) {
                        return flights.result.rows;
                    }
                });
                
                self.AllArrvingFlightsCollection = oj.Collection.extend({
                    url: "https://oracleDBAPIs-partnercloud17.apaas.us6.oraclecloud.com/api/getArrivingFlights",
                    model: new self.AllFlight,
                    comparator: "Flight",
                    parse: function (flights) {
                        return flights.result.rows;
                    }
                });

                self.AllFlightsCollection = oj.Collection.extend({
                    url: "https://oracleDBAPIs-partnercloud17.apaas.us6.oraclecloud.com/api/getAllFlights",
                    model: new self.AllFlight,
                    comparator: "Flight",
                    parse: function (flights) {
                        return flights.result.rows;
                    }
                });


                self.allFlightsCol(new self.AllFlightsCollection());
                self.allFlightsDatasource(new oj.CollectionTableDataSource(self.allFlightsCol()));
                self.allArrivingFlightsCol(new self.AllArrvingFlightsCollection());
                self.allArrivingFlightsDatasource(new oj.CollectionTableDataSource(self.allArrivingFlightsCol()));
                self.allDepartingFlightsCol(new self.AllDepartingFlightsCollection());
                self.allDepartingFlightsDatasource(new oj.CollectionTableDataSource(self.allDepartingFlightsCol()));


                self.arivalOrDepartureFunc = function (context) {
                    var link = $(document.createElement('div'));
                    var faclass = "";
                    var style="color:green;"
                    if(context.row.IsArrival === 'Y') {
                        faclass = "fa-rotate-180";
                        style="color:blue;"
                        
                    }
                    link.attr('class', 'fa fa-plane ' + faclass);
                    link.attr('style', style);
                    $(context.cellContext.parentElement).append(link);
                };

                self.columnArray = [
                    {headerText: '', field: 'IsArrivalClass', id: 'column5', renderer: self.arivalOrDepartureFunc},
                    {headerText: 'Flight No.', field: 'Flight', id: 'column1', sortable: 'enabled'},
                    {headerText: 'To/From', field: 'Place', id: 'column2', sortable: 'enabled'},
                    {headerText: 'On/At', field: 'Date', id: 'column4'}
                ];


                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new IncidentsViewModel();
        }
);

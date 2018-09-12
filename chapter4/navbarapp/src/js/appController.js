/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'home': {label: 'Home', isDefault: true},
         'flights': {label: 'Flights'},
         'checkin': {label: 'Check-In'},
         'transportation': {label: 'Transportation'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Get Around', id: 'home',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-home fa-2x'},
      {name: 'Flights', id: 'flights',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-plane fa-2x'},
      {name: 'Check-In', id: 'checkin',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-check fa-2x'},
      {name: 'Transportation', id: 'transportation',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa-exchange fa fa-2x'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("The Awesome Airport");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About JET', 'aboutOracle', 'http://www.oracle.com/webfolder/technetwork/jet/index.html'),
        new footerLink('Contact Us', 'contactUs', 'https://www.packtpub.com/virtualization-and-cloud/professional-oracle-mobile')
      ]);
     }

     return new ControllerViewModel();
  }
);

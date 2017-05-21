[NOTE]
As we are using Angular and ofcourse we need to download angular templates,
it is impossible to do it by only clicking on index.html as it will cause CrossOrigin exception

[HOW TO USE]
In order to use the application, you simply need to deploy to any server, it doesn't need a back-end to work,
as it is using "http://ergast.com" as API

Application is also published on my azure machine with my own domain as:
http://f1.phenomansolutions.com/
or
http://formulaapp.azurewebsites.net/

[TECH INFO]
Application is devided into 5 parts:
1) configurations (config, first-run config)
2) services
3) directives
4) controllers
5) models

[Components (directives)]
1) formulaSearchInputDirective - Search Bar with animation and Search Icon
2) menuLinkDirective - Left menu items
3) winLoadingDirective - loading animation like in windows 8 with rotating dots
4) winnerItemDirective - The first page UserInfo items

Styles of each component are located in the "css/components" folder with the same name.

There is a extensions.js file, which contains javascript extensions for our application,
it is writen using pure javascript to make no dependencies. Extensions make code clear.

![logo](https://github.com/cvazquezlos/TestLogAnalyzer/blob/master/resources/media/README/TestLogAnalyzer-logo.png)

[![Build Status](https://travis-ci.org/cvazquezlos/TestLogAnalyzer.svg?branch=master)](https://travis-ci.org/cvazquezlos/LOGANALYZER) [![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore) [![Maintainability](https://api.codeclimate.com/v1/badges/49620eff71270c3bdb61/maintainability)](https://codeclimate.com/github/cvazquezlos/TestLogAnalyzer/maintainability) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# TestLogAnalyzer - Log analysis module for ElasTest.

## Getting started
This repository contains a front end developed in Angular 5 and a back end developed in Spring. Each project has its own README so if you want more information, read them:

+ Front end: Developed by using the latest version of Angular 5 and Angular CLI (managed by NPM), the GUI contains a complete functionality to create and delete projects, manage projects (by adding or deleting the executions which are displayed on them) and to compare the logs of each execution. You can access to the readme by clicking [Link-TLA-GUI](https://github.com/cvazquezlos/TestLogAnalyzer/blob/master/testloganalyzer-gui/README.md "here").
+ Back end: Developed by using the latest version of Spring 3 as a Spring Boot project, this project contains a complete API REST to post, get and delete projects, executions and logs. It is really important for the new users to follow the guidelines exposed in [LINK-TLA](https://github.com/cvazquezlos/TestLogAnalyzer/blob/master/testloganalyzer/README.md "this") document.
+ Elasticsearch: The dockerized instance of Elasticsearch that I've used in the develop process is accessible for you if you want to download it.
+ Docker: The whole app is dockerized and if you want to try and run it the only thing that you need is the content of the `docker-compose.yml` file. If you want to run the whole project, follow these steps:
  1. Open the `docker` directory and the file which is inside of it and which name is `docker-compose.yml`.
  2. Copy or download it and save it in your Desktop (for example).
  3. Open your cmd (don't care about if you use Windows, Linux or other OS) and navigate inside the directory where you saved the file.
  4. Run `docker-compose up`.
  5. Wait few seconds. Once all the services has started, you can:
    + Access to the GUI at `http://localhost:4200`.
    + Access to the API REST at `http://localhost:8443`.
    + Access to the Elasticsearch instance at `http://localhost:9200`.
    + Access to the Kibana instance at `http://localhost:5601` (useful if you want to make any analysis of the data that you ingest through the application).

### Allowed data format
TestLogAnalyzer works with the following format `%d{yyyy-MM-dd hh:mm:ss.SSS}  %5-level   --- [%t] &logger{36} : %m%n`. In the table below, you can see, in case that you don't know, what each component means:

Component | What does it mean?
:--------: | -------------
%d | Timestamp following the format yyyy-MM-dd HH:mm:ss.SSS.
%-5level | Level of logging event.
[%t] | Thread identifier between square brackets.
%logger{36} | Name of the logger at the origin of the logging event (name class and package).
%m%n | Log message.

## References
1. https://ag-grid.com/javascript-grid-properties - Grid properties.
2. https://qbox.io/blog/parsing-logs-using-logstash - Parsing logs using Logstash.
3. https://elastic.co/guide/index.html - Getting started guide, API, Pagination and Kibana requests (filtering, ranges, POST and GET requests).
4. http://jupyter.org/ - Getting started guide, kernels and design.
5. https://developer.mozilla.org/es/ - Date type in TypeScript language and CORS disable for Elasticsearch requests, HTMLElement API, RegExp.
6. https://typescriptlang.org/docs/home.html - Looking for TS simple and complex types.
7. http://getbootstrap.com/css/ - Bootstrap CSS and components guidelines.
8. https://teradata.github.io/covalent - Teradata Covalent library.
9. https://github.com/elastest/elastest-torm/tree/master/elastest-torm-gui/src/app/elastest-log-manager - Example of Covalent usage.
10. https://github.com/Teradata/covalent-quickstart - Teradata Covalent quickstart.
11. https://material.angular.io/ - Angular 2 Material Design guidelines.
12. http://codingpedia.org/ - Logging with SLF4J and Logback.
13. https://dzone.com/ - JUnit, Logback, Maven with Spring.
14. https://logback.qos.ch - Logback manual and format guidelines.
15. https://docs.spring.io/ - Spring Boot features (logging), Spring Data.
16. https://www.mkyong.com/ - Sping Boot, Spring Data and Elasticsearch.
17. http://books.sonatype.com - Maven CMD options.
18. https://beginnersbook.com/ - String to Date, Date to String Java 8 documentation.
19. http://codemirror.net/ - Requirements.
20. http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927 - An O(ND) Difference Algorithm and Its Variations (1986).
21. https://github.com/GerHobbelt/google-diff-match-patch - Google Diff Match Patch: Universal Algorithm.
22. https://code.google.com/archive/p/google-diff-match-patch/ - Google Diff Match Patch by Neil Fraser.
23. https://scotch.io/ - Dockerize Angular 4 app.
24. https://docs.docker.com/ - Dockerizing apps, update tags and images to Docker Hub, Docker Compose.
25. https://dpopescu.me/ - Dockerfile content in Angular 4 app.
26. https://github.com/taskrabbit/elasticsearch-dump - ElasticDump (moving and saving indices).
27. https://khanhicetea.com/ - Backup, add and restore Elasticsearch with Docker.
28. https://elk-docker.readthedocs.io/ - Dockerized ELK Stack.
29. https://jaxenter.com/ - Sharing Docker volumes across the Internet.
30. https://martinfowler.com/ - Refactoring with loops and collection pipelines.
31. https://forum.freecodecamp.org/ - NPM behind a proxy server.
32. https://www.quora.com/ - Reducing code complexity.
33. https://www.jhipster.tech/ - Configuring a corporate proxy.
34. https://auth0.com/blog/whats-new-in-angular5/ - Angular 5 updated.
35. https://docs.travis-ci.com/ - Pull requests and security restrictiosn.
36. http://blog.ninja-squad.com/ - Migrating Http module from Angular 4 to Angular 5.
37. https://codecraft.tv/ - HTTP with Observables in Angular 5.
38. https://angular.io/ - Angular 4 and 5 API.
39. https://github.com/bill-long/angular-rich-text-diff - Google Diff-Match-Patch.
40. https://www.w3schools.com/angular/ - AngularJS modules.
41. http://www.damirscorner.com/ - Angular await and async requests.
42. https://medium.com/@alecwazzy - Angular Promises for async requests.
43. https://docs.oracle.com/javase/8/docs/api/ - Java REGEX
44. https://github.com/compodoc/compodoc - Compodoc 

## Involved technologies
Element           | TestLogAnalyzer needs it because...                    | Official site
------------------|----------------------------------------------------|-----------------------------
Angular 5         | App development framework                          | https://angular.io/
Angular Material  | Material Design components for Angular             | https://material.angular.io/
Angular-CLI       | Command line interface for Angular                 | https://cli.angular.io/
NgBootstrap       | Bootstrap components for Angular                   | https://ng-bootstrap.github.io
CircleCI          | Continuous Integration and Delivery                | https://circleci.com/
CODEBEAT          | Automated code review for the browser              | https://codebeat.co
CodeMirror        | Text editor for the browser                        | https://codemirror.net/
Code Climate      | Code quality test                                  | https://codeclimate.com/
Compodoc          | Missing documentation tool for Angular app         | https://compodoc.github.io/website/
Docker            | Project packaging and virtualization               | https://www.docker.com/
Docker Compose    | Tool for running multi-container Docker apps       | https://docs.docker.com/compose/
Elasticsearch     | Search, indexing and analytics data engine         | https://www.elastic.co/products/elasticsearch
Github            | Software development platform                      | https://github.com/
Java              | Programming language (ES client and log generator) | https://www.java.com
Kibana            | ES Data visualization and ES Stack navigation      | https://www.elastic.co/products/kibana
Maven             | Software project management and comprehension tool | https://maven.apache.org/
Node.js           | JavaScript run-time Environment                    | https://nodejs.org/es/
NPM               | Package manager for JavaScript                     | https://www.npmjs.com/
Postman           | API Development Environment                        | https://www.getpostman.com/
Spring            | Application development Framework                  | https://spring.io/
Spring Tool Suite | Eclipse-based development environment              | https://spring.io/tools
Teradata Covalent | Teradata UI Platform for Angular                   | https://teradata.github.io/covalent/
Travis CI         | Code testing and deploying tool                    | https://travis-ci.org/
TypeScript        | Programming language (Angular app)                 | https://www.typescriptlang.org/
Webstorm          | JavaScript IDE                                     | https://www.jetbrains.com/webstorm/

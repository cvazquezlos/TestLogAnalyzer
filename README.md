![logo](https://github.com/cvazquezlos/LOGANALYZER/blob/master/resources/media/README/LOGANALYZER-logo.png)

[![Build Status](https://travis-ci.org/cvazquezlos/LOGANALYZER.svg?branch=master)](https://travis-ci.org/cvazquezlos/LOGANALYZER)
[![CircleCI](https://circleci.com/gh/cvazquezlos/LOGANALYZER.svg?style=shield)](https://circleci.com/gh/cvazquezlos/LOGANALYZER)
[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore)
[![Dependency Status](https://dependencyci.com/github/cvazquezlos/LOGANALYZER/badge)](https://dependencyci.com/github/cvazquezlos/LOGANALYZER)

[![Code Climate](https://codeclimate.com/github/cvazquezlos/LOGANALYZER.png)](https://codeclimate.com/github/cvazquezlos/LOGANALYZER)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# LOGANALYZER - Product development

## Getting started
You need ELK system to run this web application. [ELK](https://www.elastic.co/blog/getting-started-with-elk) is Elasticsearch + Logstash + Kibana (the last one is not necessary). Follow these steps to run ELK stack:
1. Create a directory inside root directory (f.e. in Windows is C:) called "Elk".
2. Download [Elasticsearch](https://www.elastic.co/downloads/elasticsearch), [Logstash](https://www.elastic.co/downloads/logstash) and [Kibana](https://www.elastic.co/downloads/kibana) and install it inside "Elk" directory (just unzip them inside of it). *You can skip these steps by downloading the [Elk installer](https://github.com/gigi81/elk-windows-installer).*
3. Each component needs its own command prompt, so you have to open 3 (doesn't matter if you open it with normal priviledges).

Once you have three cmd openned, follow these steps (it is important to follow the order):
1. **Elasticsearch**: Navigate to Elk directory and then execute `cd elasticsearch` (navigate into elasticsearch directory) and then `bin/elasticsearch`(Linux) or `bin\elasticsearch.bat`(Windows) and the process will start.
2. **Kibana**: Open *config/kibana.yml* and modify *elasticsearch.url* value to point at your Elasticsearch instance. Navigate to Elk directory and then execute `cd kibana` (navigate into kibana directory) and then `bin/kibana`(Linux) or `bin\kibana.bat`(Windows) and the process will start. Before start using Kibana, you must upload data from Logstash (see below steps).
3. **Logstash**: Execute `cd logstash`. At the root directory, create *logstash.conf*, a file which must contain the *input, filter* and *output* declaration. You can find my own declaration [here](https://github.com/cvazquezlos/LOGANALYZER/blob/master/resources/logstash/logstash.conf) (note that I am using Windows OS while the development of this product, so change properly your path to data according your OS). You need a file which contains data. Right now, this file contains Apache logs and you can find it [here](https://github.com/cvazquezlos/LOGANALYZER/blob/master/resources/logstash/access.log). Once all is ready, execute `bin/logstash -f logstash.conf`(Linux) or `bin\logstash -f logstash.conf`(Windows).
4. Navigate to `localhost:5601`, create an index, `logstash-*`, and now, all your data is avaible.

For further information about how to prepare ELK in this project, you can read my [Jupyter Notebook guide](https://github.com/cvazquezlos/LOGANALYZER-Jupyter-Notebook/). Once your Elastic Stack is properly working, follow these steps:
1. Clone this repository.
2. Open a cmd and navigate to project location, then execute `npm install`(this repo doesn't contain node-modules folder).
3. Make sure that your Elasticsearch instance is active on port 9200 (if your instance doesn't, change *URL* variable value in elasticsearch.service.ts or in your config file) and you have imported data from Logstash or Beats following this format.
4. Execute `ng serve` in your root project directory and loganalyzer will start.

## LOGANALYZER
LOGANALYZER allows you to work with determinate kinds of logs. In this moment, `Beta version`, LOGANALYZER works with Apache logs.

### Data format allowed
#### Logback format
LOGANALYZER works with the following format `%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\`. In the table below, you can see, in case that you don't know, what each component means:

Component | What does it mean?
:--------: | -------------
%d | Timestamp following the format yyyy-MM-dd HH:mm:ss.SSS.
[%t] | Thread identifier between square brackets.
%-5level | Level of logging event.
%logger{36} | Name of the logger at the origin of the logging event (name class and package).
%m%n | Log message.

### Content of pages
#### Home
In the home page, you can find the grid which contains paginated data (each page contains 50 logs), some filtering criteria and buttons which allow you to search, hide the table or recreate it and show more logs.

![Home](https://github.com/cvazquezlos/LOGANALYZER/blob/master/resources/media/README/version0.png)

## Getting started with Spring Logs Generator
Ensure `JAVA_HOME` environment variable is se and points to your JDK installation directory. Follo these steps:
1. Go to Apache Maven Project [download](https://maven.apache.org/download.cgi) page and download the Binary tar.gz archive.
2. Extract it to the directory you wish to install Maven. The best way to do it is inside Program Files directory.
3. Set the environment variables: `M2_HOME=C:\Program Files\apache-maven-version`, `M2=%M2_HOME%\bin`.
4. Append the string `%M2` to the end of the system variable *Path*.
5. Open Command Console and type `mvn --version`.
6. Go to Spring Logs Generator project in [Github](https://github.com/cvazquezlos/LOGANALYZER-SpringLogsGenerator) and clone or download it.
7. Open the Command Console and navigate inside project. Then, execute `mvn clean install --log-file log.txt` to save all the information about the test.

## Bibliography
1. https://ag-grid.com/javascript-grid-properties - Grid properties.
2. https://qbox.io/blog/parsing-logs-using-logstash - Parsing logs using Logstash.
3. https://elastic.co/guide/index.html - Getting started guide, API, Pagination and Kibana requests (filtering, ranges, POST and GET requests).
4. http://jupyter.org/ - Getting started guide, kernels and design.
5. https://developer.mozilla.org/es/ - Date type in TypeScript language and CORS disable for Elasticsearch requests.
6. https://typescriptlang.org/docs/home.html - Looking for TS simple and complex types.
7. http://getbootstrap.com/css/ - Bootstrap CSS and components guidelines.
8. https://teradata.github.io/covalent - Teradata Covalent library.
9. https://github.com/elastest/elastest-torm/tree/master/elastest-torm-gui/src/app/elastest-log-manager - Example of Covalent usage.
10. https://github.com/Teradata/covalent-quickstart - Teradata Covalent quickstart.
11. https://material.angular.io/ - Angular 2 Material Design guidelines.
12. http://codingpedia.org/ - Logging with SLF4J and Logback.
13. https://dzone.com/ - JUnit, Logback, Maven with Spring.
14. https://logback.qos.ch - Logback manual and format guidelines.
15. https://docs.spring.io/ - Spring Boot features (logging).
16. https://www.mkyong.com/ - Sping Boot, Spring Data and Elasticsearch.
17. http://books.sonatype.com - Maven CMD options.
18. 

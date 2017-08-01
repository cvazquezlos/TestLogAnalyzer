![logo](http://i67.tinypic.com/5ceg5l.png)

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
3. **Logstash**: Execute `cd logstash`. At the root directory, create *logstash.conf*, a file which must contain the *input, filter* and *output* declaration. You can find my own declaration here. You need a file which contains data. Right now, this file contains Apache logs and you can find it here. Once all is ready, execute `bin/logstash -f logstash.conf`(Linux) or `bin\logstash -f logstash.conf`(Windows).
4. Navigate to `localhost:5601`, create an index, `logstash-*`, and now, all your data is avaible.

For further information about how to prepare ELK in this project, you can read my [Jupyter Notebook guide](https://github.com/cvazquezlos/LOGANALYZER-Jupyter-Notebook/). Once your Elastic Stack is properly working, follow these steps:
1. Clone this repository.
2. Open a cmd and navigate to project location, then execute `npm install`(this repo doesn't contain node-modules folder).
3. Make sure that your Elasticsearch instance is active on port 9200 (if your instance doesn't, change *URL* variable value in elasticsearch.service.ts or in your config file) and you have imported data from Logstash or Beats following this format.
4. Execute `ng serve` in your root project diretory and app will start.

## Bibliography
1. https://www.ag-grid.com/javascript-grid-properties
2. https://qbox.io/blog/parsing-logs-using-logstash
3. https://www.elastic.co/guide/index.html - Getting started guide, API, Pagination and Kibana requests (filtering, ranges, POST and GET requests).
4. http://jupyter.org/ - Getting started guide, kernels and design.
5. https://developer.mozilla.org/es/ - Date type in TypeScript language and CORS disable for Elasticsearch requests.
6. https://www.typescriptlang.org/docs/home.html - Looking for TS simple and complex types.

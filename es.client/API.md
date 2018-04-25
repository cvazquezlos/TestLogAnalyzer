# TestLogAnalyzer - API REST System

## About our API
All you can find in our API Rest is information about projects, executions, logs, file and diffs. All you need to do is simply; you have to follow the API rules. If you try to do following a different way, it's probably what you will receive an error.

## How to use our API
1. Download [Postman][Postman link].
2. You only can send GET, POST and DELETE requests.
3. Our API has a public side where you can make very simple requests.

## API requests
### Project
Projects API has GET(2), POST(1) and DELETE(1) methods.
All Request URLs can be send by typing `http://localhost:8443/api/projects` followed by the request URL content in the following tables.

#### GET methods

|Type|Request description|Request URL|Success response|Error response|
|----|-------------------|-----------|----------------|--------------|
|1|Shows all projects.||Project list and *OK* (200).|*NOT_FOUND* (404)|
|2|Shows a concrete project by its name.|/name/{name}|Project and *OK* (200).|*NOT_FOUND* (404)| 

#### POST method

|Type|Request description|Request URL|Request body|Success response|Error response|
|----|-------------------|-----------|------------|----------------|--------------|
|1|Creates a new resource.||See below|New resource and *CREATED* (201)|*BAD_REQUEST* (406)|

##### Type 1 method Request body example:
```json
{
  "id": 2,
  "name": "ElasTest",
  "num_execs": 0,
  "recently_deleted": -1
}
```
#### DELETE method

|Type|Request description|Request URL|Success response|Error response|
|----|-------------------|-----------|----------------|--------------|
|1|Deletes a project (and its executions) by its id.|/id/{id}|Deleted project and *OK* (200)|*NOT_FOUND* (404)|

### Executions
Executions API has GET(2) and DELETE(1) methods.
All Request URLs can be send by typing `http://localhost:8443/api/executions` followed by the request URL content in the following tables.

#### GET methods

|Type|Request description|Request URL|Success response|Error response|
|----|-------------------|-----------|----------------|--------------|
|1|Shows executions by its project.|/project/{project}|Execution list and *OK* (200).|*NOT_FOUND* (404)|
|2|Shows a concrete execution by its test.|/test/{test}|Execution and *OK* (200).|*NOT_FOUND* (404)|

#### DELETE method

|Type|Request description|Request URL|Success response|Error response|
|----|-------------------|-----------|----------------|--------------|
|1|Deletes an execution (and its logs).|/id/{id}|Deleted execution and *OK* (200)|*NOT_FOUND* (404)|

### Logs
Logs API has GET(2) and DELETE(1) methods.
All Request URLs can be send by typing `http://localhost:8443/api/logs` followed by the request URL content in the following tables.

#### GET methods

|Type|Request description|Request URL|Success response|Error response|
|----|---------------|-----------|----------------|--------------|
|1|Shows logs by its logger.|/logger/{logger}|Log list and *OK* (200).|*NOT_FOUND* (404)|
|2|Shows logs by its test.|/test/{test}|Log list and *OK* (200).|*NOT_FOUND* (404)|

#### DELETE method

|Type|Request description|Request URL|Success response|Error response|
|----|-------------------|-----------|----------------|--------------|
|1|Deletes a log by its id.|/id/{id}|Deleted log and *OK* (200)|*NOT_FOUND* (404)|

### Files
Files API has POST(3) methods.
All Request URLs can be send by typing `http://localhost:8443/api/files` followed by the request URL containt in the following tables.

#### POST method

|Type|Request description|Request URL|Request body|Success response|Error response|
|----|-------------------|-----------|------------|----------------|--------------|
|1|Charges a list of files.|/file|List of files (.xml and .txt)|*CREATED* (201)|*BAD_REQUEST* (406)|
|2|Charges a file by its url|/url|File (.xml or .txt)|*CREATED* (201)|*BAD_REQUEST* (406)|
|3|Updates the name of the project||*CREATED* (201)|Not error possible|

[Postman link]: https://www.getpostman.com/

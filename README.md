# MelanoQ

## Requirements

Download and install Node.js for your operating system from https://nodejs.org/en/download/

Download Elasticsearch and Kibana from https://www.elastic.co/start and extract them to a folder of your choice.

Edit Elasticsearch configuration file adding the following lines to the end of the file:
```
http.cors.enabled: true
http.cors.allow-origin : "*"
```

## Run

Clone the repository to a folder of your local host and open a terminal window in this folder.

Execute:

``` npm install ```

``` node start ```

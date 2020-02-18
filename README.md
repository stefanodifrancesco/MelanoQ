# MelanoQ

## Requirements

Install Java >= 1.8

Download Elasticsearch and Kibana from https://www.elastic.co/start and extract them to a folder of your choice.

Edit Elasticsearch configuration file adding the following lines to the end of the file:
```
http.cors.enabled: true
http.cors.allow-origin : "*"
```

Install Postman for making REST calls to Elasticsearch https://www.postman.com/downloads/

Download and install Node.js for your operating system from https://nodejs.org/en/download/


## Run

Clone the repository to a folder of your local host.

Run Postman and import the MelanoQ.postman_collection.json file containing the REST calls to create the database.

Open a terminal window in this folder.

Run the following command to install all dependencies:

``` npm install ```

Run the following command to run the application:

``` node start ```



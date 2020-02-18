# MelanoQ

You can follow these instructions or watch the video tutorial https://youtu.be/_Ty7pbkTNu8 or both.

## Requirements

Install Java >= 11

Download Elasticsearch and Kibana from https://www.elastic.co/start and extract them to a folder of your choice.



Install Postman for making REST calls to Elasticsearch https://www.postman.com/downloads/

Download and install Node.js for your operating system from https://nodejs.org/en/download/


## Configuration

Edit Elasticsearch configuration file adding the following lines to the end of the file:
```
http.cors.enabled: true
http.cors.allow-origin : "*"
```

Clone the repository to a folder of your local host.

Run Elasticsearch.

Run Postman and import the MelanoQ.postman_collection.json file containing the REST calls to create the database.
Execute all the imported REST calls in the order they are.

Run Kibana. Open localhost:5601.
Go to Management -> Saved objects -> Import, then choose the file Kibana_export.ndjson from the repository.

## Running the application

Run Elasticsearch, if not already running.

Run Kibana, if not already running.

Open a terminal window in the repository folder.

Run the following command to install all dependencies:

``` npm install ```

Run the following command to run the application:

``` node start ```

Login using:

User: claire
Password: 12345678

or

User: max
Password: 12345678

A demo video of the application is here https://youtu.be/8A04m54p2NM

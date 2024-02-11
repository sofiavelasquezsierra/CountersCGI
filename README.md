# CountersCGI
Counter project for CGI

REST API
POSTMAN Requests + Code
All counters are maintained in memory.
 
GET /counters/  List of counters in a map/dictionary format ({ “abc”: 5, “xyz”: 3 })
POST /counters  Creates a new counter with an initial value { “counter”: initialValue }
PUT /counters/:counter  Increases a counter value by one (no body required). Fails if counter does not exist (404 Not found)
DEL /counters/:counter  Decreases a counter value by one, if value <= 0 the counter disappears. Does fail if the counter does not exist.
GET /counters/:counter  Returns value of counter {“counter1”: 5}. Fails if the counter does not exist (404 Not found)
 
Bonus 1
Write your unit tests
 
Bonus 2
Submit a pull request in github for review
 
Bonus 3
create a seperate branch



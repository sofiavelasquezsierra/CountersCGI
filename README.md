# CountersCGI
Counter project for CGI

REST API <br/>
POSTMAN Requests + Code <br/>
All counters are maintained in memory. <br/>
 
GET /counters/  List of counters in a map/dictionary format ({ “abc”: 5, “xyz”: 3 }) <br/>
POST /counters  Creates a new counter with an initial value { “counter”: initialValue } <br/>
PUT /counters/:counter  Increases a counter value by one (no body required). Fails if counter does not exist (404 Not found) <br/>
DEL /counters/:counter  Decreases a counter value by one, if value <= 0 the counter disappears. Does fail if the counter does not exist. <br/>
GET /counters/:counter  Returns value of counter {“counter1”: 5}. Fails if the counter does not exist (404 Not found) <br/>
 
Bonus 1 <br/>
Write your unit tests <br/>
 
Bonus 2 <br/>
Submit a pull request in github for review <br/>
 
Bonus 3 <br/>
create a seperate branch <br/>



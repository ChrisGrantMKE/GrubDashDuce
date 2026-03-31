# GrubDash Backend API

I wrote this over a few days, repo at https://github.com/ChrisGrantMKE/Grub_Dash/
I could have pushed more often, I had started some work prior to setting up the github repo.


I was able to leverage previous techniques to set up the routing and controllers for this project, adapting them for these data sets, and testing scenarios. 
AI 
While writing this there was some inline code generation as I would type out the instrucitons. 
I also leveraged AI to help me get this integrated wit hthe front end for testing, AI looked at the front end code and connect the app to my server using `REACT_APP_API_BASE_URL`.

- What was included for testing:
  Automated coverage includes both dishes and orders router tests, with 68 passing tests in total.
  Manual end-to-end smoke testing also covered: create dish, update dish, create order, change order status, confirm delete is blocked for non-pending orders, then set pending and delete successfully.

  I configured the server to use Morgan, enabled it in (`dev` format), request logs show method, route, status code, response time, and response size during live testing.

  I debated troubleshooting further by modifying some front end code to fully integrate with the locally hosted server.

- Notes about project and future updates

This project
-I looked at previous work to impliment the routes and controller files,
original contributions are in the dishes and orders folders. 
Milestones were to work on the dishes code 
second milestone was the orders code.
third was setting up a debuggin environment and looking at hte front end code
fourth was adapting the front end code for validation
fifth was testing the code online. 



future work
While I understand the reasoning for this code to have orders pull the entire data string of a dish into an order, i think possibly a better way to approach this project would be to create a "versioning" of the data. A third data set which holds a versioned data piece of a dish in an array of older versions. If the array is empty only the current version exists. And then 2 more pieces of data which will acoompany the dish, the version number and datestamp... or maybe even just the datestamp could be the version. Then an order ID would just need the dish ID and its version number and also there would be a better way to store old receipt data and data about updated dishes.  
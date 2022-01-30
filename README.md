# TRINIT_COOL_DEV02


**BUG TRACKING SYSTEM**
### Link to the demo : https://drive.google.com/file/d/1F1J5QcV25VlSGwmAAgMSoVtPv9g2_v77/view?usp=sharing

## Technologies used

- **NodeJs** -      Evented I/O for the backend
- **Express** -     Fast node.js network app framework
- **MongoDB** -     NoSQL Database
- **React.js** -    Javascript llibrary to build user frameworks.
- **GoogleOAuth** - Open Authorization from Google
- **MaterialUI** -  React components based on Material Design, responsive web application for all screen sizes.


## Features
###Authentication
The portal supports google OAuth.
![image](https://user-images.githubusercontent.com/59505795/151692588-384235dc-7af1-4ffb-a2ab-2cb6dff0e96e.png)

### Organisations
The home page consists of all the organisations that are present in the portal. Search feature is also available
![image](https://user-images.githubusercontent.com/59505795/151692638-169efac6-b77c-4366-9886-bc8be6945869.png)

### Organisation page
The organisation page consists of all the teams that are part of the organisation
![image](https://user-images.githubusercontent.com/59505795/151692777-a74971ab-0739-4d13-8c5f-04beeb8ed13f.png)

### Profile
![image](https://user-images.githubusercontent.com/59505795/151692669-79b988d5-36cd-40c3-ae4f-63d3a62908d2.png)

Click on profile to view the profile screen.
The profile page consists of the details of the user and the organisations that he/she is currently a part of.
<img width="937" alt="image" src="https://user-images.githubusercontent.com/56500864/151692981-8638a196-279f-4dab-98fe-786864d5252a.png">

### Create Organisation
The user can create a new organisation by cicking on the add button
![image](https://user-images.githubusercontent.com/59505795/151692743-b012f737-5dcd-4059-83a2-4acc3d6de2ee.png)

### Create team
Only the organisation lead can create new teams. The lead can provide high priority and low priority roles depending on which the bugs are restricted
<img width="394" alt="image" src="https://user-images.githubusercontent.com/56500864/151693137-529568de-d493-4719-8f92-115f25c23019.png">

### Team
The team page consists of all the bugs corresponding to the team based on bug visibility restriction.
  -- High priority roles can view all the bugs
  -- Low priority roles can view bugs having prioroity low or medium.
 <img width="949" alt="image" src="https://user-images.githubusercontent.com/56500864/151693032-9c80cb0b-cf1c-49f1-a0bb-177f652dce7d.png">
 ### Raise Bug
 A bug can be raised by any user irrespective of being a member of the organisation or team but the bug can only be assigned to a member by the high priority members.
 <img width="419" alt="image" src="https://user-images.githubusercontent.com/56500864/151693072-64caafc7-005b-4241-b29a-2000ce13cedb.png">

### Bug Page
The bug page consists of the details of the bug such as creator, date of creation, status, priority and who it is assigned to.
<img width="944" alt="image" src="https://user-images.githubusercontent.com/56500864/151693273-cd3af5b3-e926-494d-bef9-d4ccd7366cfb.png">

### Assign bug
This features is visible to only employees of high priority
<img width="958" alt="image" src="https://user-images.githubusercontent.com/56500864/151693326-9b9d4017-a820-4f99-a30a-837db7ce4b28.png">
<img width="264" alt="image" src="https://user-images.githubusercontent.com/56500864/151693262-ac42cd7a-8d83-4480-ba1b-26c82242dfdb.png">

### Close bug 
Clicking on the close bug option will resolve the bug. This option is available to only for high bugs.

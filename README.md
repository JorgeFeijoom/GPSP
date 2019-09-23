## Welcome to GPSP

GPSP works by using the MEAN scaffolding from Linnovate. This scaffolding has been forked and specially modified to run according to the needs of GPSP and the project itself. Important information for the developer is presented next. This information is intended to provide a simple point of start to install, run, develop and deploy the CEH project.

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **A**ngular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone https://github.com/JorgeFeijoom/GPSP.git
cd GPSP
cp .env.example .env
yarn
yarn start
```
### Docker based 
``` 
git clone https://github.com/JorgeFeijoom/GPSP.git
cd GPSP
cp .env.example .env
docker-compose up -d
```
### Credits 
- The MEAN name was coined by Valeri Karpov.
- Initial concept and development was done by Amos Haviv and sponsered by Linnovate.
- Inspired by the great work of Madhusudhan Srinivasa.
- Forked and modified by Jorge Feijoo.

The frontend directory contains the code requirs for the frontend application built using react, hooks and some 3rd party libraries. If you haven't set up the project that, please head over to projectsetupguide.md followed by backend directory's readme.md file to be able to successfully set up the project.

The frontend folder contains the following important folders:

1. Public : This folder conatins the index.html file, the entire code is compiled and served under index.html
   There are a few skins for use for the inline editor, that is optional and kept under this folder.

2. The package.json file contains required dependencies, use npm install to install them

3. Src directory structure
   /assets : contains css, img, scss files
   /components : contains master components that can be used througout the project like navbar and footer
   /environment : contains environment file that is used for configuration urls like API urls. When production API urls change, just update the API urls in this file.

4. Some sample JSONS are created to understand, what kind of JSONs the front end expects from the APIs to render results.

5. Views contains all project components and views and is segregated into different folders.
   Example:
   bookedit : component used to book editing
   bookselect : component used for selection of book
   dashboard : component for home page

6) Index.js binds all the template components that can be used in desiging the functional components.

7) App.js contains all the routing info and binds all the components.

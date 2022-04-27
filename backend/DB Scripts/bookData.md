The file contains sql commands for test data insertion for the prototype of the application, please enter these commands in sql workbench.
IMPORTANT : Some commands assume that the users for the project is already set up, and uses its userid to create records. If you haven't created a user yet, first create a user by following apicalls.md file.

For selection of gts as a table, use command
use gts;

BOOK DATA depends upon the following values from different tables and then maps the data together using the mappingbooktrans table

1. Status Values: describle the status of books:

//Status Values
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("AVL","Available","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("TIP","Translation In Progress","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("TCT","Translation Completed","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("IR", "In Review","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("RCT","Review Completed","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("TSLT","Translated and Reviewed","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("PIP","Publish In Progress","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("PCT","Publish Completed","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO Status (code, value,createdAt,updatedAt) VALUES ("REJ","Rejected","2020-05-03 15:59:04","2020-05-03 15:59:04");

2. Language Values: describe the language dataset of the all the books

// Language Values
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("ENG","English","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("FR","French","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("GER","German","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("CHI","Chinese","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("ITA","Italian","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("JPN","Japanese","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("TTN","Tetun","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("SPN","Spanish","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("DTH","Dutch","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("CRT","Croatian","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("HIN","Hindi","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("KRN","Korean","2020-05-03 15:59:04","2020-05-03 15:59:04");
INSERT INTO language (code, value,createdAt,updatedAt) VALUES ("PSN","Persian","2020-05-03 15:59:04","2020-05-03 15:59:04");

3. Now we create book info

insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("How The Rooster Found His Sound",552,"English",46,"pdf","/documents/1.pdf","Robyn Cain","children","Oink? Meow? What sound does a rooster make?","animals; farm animals; sound; senses","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Busy Little Ants",146,"English",32,"pdf","/documents/2.pdf","Timur Khairullin","children","Finding food is tricky for one ant on his own. He needs to find some friends! But can 20 busy little ants learn to work as a team?","counting; numeracy; school; growth and development.
","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Tahila The Tortoise Finds An Umbrella",527,"English", 36,"pdf","/documents/3.pdf","Claire Raylor","children","Tahila the tortoise is enjoying her new home. But suddenly something begins to fall from the sky!","weather; animals; tortoise; pets
","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("What is in the sack?",899,"English", 49,"pdf","/documents/3.pdf","Alison Gee","children","What is in the sack?","adventure; children; journey;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Yellow Bird",801,"English", 36,"pdf","/documents/3.pdf","Alison Gee","children","Happy Hunting","weather; animals; bird; fly","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Being Considerate",802,"English", 43,"pdf","/documents/3.pdf","Judith Gangai","children","Moral Values","home; morals; considerate","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("My Sister Aria",804,"English", 49,"pdf","/documents/3.pdf","Gretel Matawan","children","What all it takes to be a family?","home; morals; family; love","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("The Little Turtle",527,"English", 28,"pdf","/documents/3.pdf","Leila Parina","children","The little turtle is enjoying her new home. But suddenly something begins to rise from the water!","weather; animals; turtle; pets
","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("The Runaway Pig",956,"Spanish", 53,"pdf","/documents/3.pdf","Kym Simoncini","children","The journey of a pig.","weather; animals; pig;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("A big Heart",956,"English", 53,"pdf","/documents/3.pdf","Bojana Simic","children","The story of best friends","adventure; life; journey; friendship;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Astonishing X-Men",590,"English", 21,"pdf","/documents/3.pdf","Simic Smith","children","men represent the oppressed underdog","adventure; life; journey;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Justice League of America",591,"English", 29,"pdf","/documents/3.pdf","Brad Meltzer","children","JLA is stronger than ever.","adventure; fiction; journey;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("New Avengers",592,"English", 34,"pdf","/documents/3.pdf","Brian Michael Bendis","children","Avengers is set to new heights of popularity","adventure; space; journey;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("Batman",593,"English", 34,"pdf","/documents/3.pdf","Jeph Loeb","children","Batman's world with shocking results","adventure; superhero;","2020-05-03 15:59:04","2020-05-03 15:59:04");
insert INTO book (title,lfaId, language,pages,format,path,author,genre,metaDesc,keywords,createdAt,updatedAt) VALUES ("The Ultimates",594,"English", 58,"pdf","/documents/3.pdf","Mark Millar","children","Bryan Hitch's art is superb and highly detailed.","adventure; superhero; action;","2020-05-03 15:59:04","2020-05-03 15:59:04");

4. Once all details are created, we enter records in mappingbooktrans table that would be used to fetch book data:

insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",1,2);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",1,3);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",1,4);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",2,2);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",2,7);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",3,4);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",3,8);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",4,5);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",4,6);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",4,8);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",5,2);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",5,7);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",6,5);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",6,7);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",7,2);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",7,3);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",8,2);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",8,8);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",9,3);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",9,5);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",10,4);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",10,6);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",10,7);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",11,9);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",11,8);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",12,10);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",12,11);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",13,12);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",13,13);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",13,6);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",14,4);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",14,9);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",15,11);
insert INTO mappingbooktrans (status,file,createdBy,createdAt,updatedAt,bookId,langId) VALUES ("AVL",null,null,"2020-05-03 15:59:04","2020-05-03 15:59:04",15,13);

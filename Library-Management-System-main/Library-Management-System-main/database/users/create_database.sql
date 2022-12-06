drop database library;
create database library;

\c library;


CREATE TABLE Reader
 ( R_id INT,
   R_name VARCHAR(25),
   R_address VARCHAR(50),
   R_phone CHAR(10),
   PRIMARY KEY (R_id)
 );


CREATE TABLE Articles
( P_name VARCHAR(50) ,
  P_author  VARCHAR(25),
  P_field  VARCHAR(30),
  PRIMARY KEY (P_name)
);

CREATE TABLE Publisher
 ( P_id INT ,
   P_name VARCHAR(25),
   P_address VARCHAR(50),
   P_phone char(10),
   PRIMARY KEY (P_id)
 );


CREATE TABLE Books
( Book_id INT,
  Title  VARCHAR(25),
  Edition INT,
  Genre VARCHAR(25),
  Cost INT,
  Publisher_id INT,
  PRIMARY KEY (Book_id),
  FOREIGN KEY (Publisher_id) REFERENCES Publisher(P_id)
);

CREATE TABLE Author
 ( A_id INT,
   A_name VARCHAR(25),
   A_address VARCHAR(50),
   A_phone char(10),
   PRIMARY KEY (A_id)
 );


CREATE TABLE Authentication
(
    Login_id INT ,
    Password VARCHAR(25),
    PRIMARY KEY (Login_id)
);

CREATE TABLE Scholar
(
    Member_id INT ,
    Expiry_Date DATE,
    M_Name VARCHAR(25),
    Member_Login_id INT,
    PRIMARY KEY (Member_id),
    FOREIGN KEY (Member_Login_id) REFERENCES Authentication(Login_id)
);

CREATE TABLE Borrowed_by
(
    Issue_Date DATE,
    Return_Date DATE,
    Borrowed_Book_id INT,
    Borrowed_Member_id INT,
    Return_Status BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(Borrowed_Book_id, Borrowed_Member_id,Issue_date),
    FOREIGN KEY (Borrowed_Book_id) REFERENCES Books(Book_id),
    FOREIGN KEY (Borrowed_Member_id) REFERENCES Scholar(Member_id)
);

CREATE TABLE Contacts
(
    Contacts_P_id INT,
    Contacts_A_id INT,
    PRIMARY KEY (Contacts_P_id, Contacts_A_id),
    FOREIGN KEY (Contacts_P_id) REFERENCES Publisher(P_id),
    FOREIGN KEY (Contacts_A_id) REFERENCES Author(A_id)
);

CREATE TABLE Readby
(
    R_id INT,
    P_name VARCHAR(50) NOT NULL ,
    PRIMARY KEY (R_id, P_name),
    FOREIGN KEY (R_id) REFERENCES Reader(R_id),
    FOREIGN KEY (P_name) REFERENCES Articles(P_name)
);

CREATE TABLE Writes
(
    Writes_Book_id INT ,
    Writes_A_id INT,
    PRIMARY KEY (Writes_Book_id, Writes_A_id),
    FOREIGN KEY (Writes_Book_id) REFERENCES Books(Book_id),
    FOREIGN KEY (Writes_A_id) REFERENCES Author(A_id)
);


CREATE TABLE Studies
(
    Reads_id INT,
    R_Reads_id INT,
    PRIMARY KEY (Reads_id, R_Reads_id),
    FOREIGN KEY (Reads_id) REFERENCES Books(Book_id),
    FOREIGN KEY (R_Reads_id) REFERENCES Reader(R_id)
);

CREATE TABLE Fine
(
    Fine_Book_id INT,
    Fine_Member_id INT,
    Amount INT,
    Issue_date date,
    PRIMARY KEY (Fine_Book_id, Fine_Member_id,Issue_date),
    Foreign Key (Fine_Book_id,Fine_Member_id,Issue_date) References Borrowed_by(Borrowed_Book_id, Borrowed_Member_id,Issue_date)
);


ALTER TABLE borrowed_by  drop CONSTRAINT borrowed_by_borrowed_book_id_fkey;
ALTER TABLE borrowed_by  add CONSTRAINT borrowed_by_borrowed_book_id_fkey FOREIGN KEY (Borrowed_Book_id) REFERENCES Books(Book_id) on delete cascade on update no action;

ALTER TABLE studies  drop CONSTRAINT studies_reads_id_fkey;
ALTER TABLE studies  add CONSTRAINT studies_reads_id_fkey FOREIGN KEY (reads_id) REFERENCES Books(Book_id) on delete cascade on update no action;

ALTER TABLE Writes  drop CONSTRAINT Writes_Writes_book_id_fkey;
ALTER TABLE Writes  add CONSTRAINT Writes_Writes_book_id_fkey FOREIGN KEY (Writes_Book_id) REFERENCES Books(Book_id) on delete cascade on update no action;

ALTER TABLE fine  drop CONSTRAINT fine_fine_book_id_fkey;
ALTER TABLE fine  add CONSTRAINT fine_fine_book_id_fkey FOREIGN KEY  (Fine_Book_id,Fine_Member_id,Issue_date) REFERENCES Borrowed_by(Borrowed_Book_id, Borrowed_Member_id,Issue_date) on delete cascade on update no action;


create User admin with password 'admin123' createdb;
create User Scholar with password 'password' createdb;
create User Reader with password 'pass' createdb;

-- GRANT ALL on all tables in schema public TO librarian;
ALTER USER admin WITH SUPERUSER;
GRANT SELECT ON books TO Scholar;
GRANT SELECT ON books,articles TO Reader;

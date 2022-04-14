BEGIN;
DROP DATABASE IF EXISTS bluebison;
CREATE DATABASE bluebison;
USE bluebison;

CREATE TABLE USER (
    USER_ID INT PRIMARY KEY,
    USER_IS_TECHNICIAN BOOLEAN NOT NULL,
    USER_EMAIL VARCHAR(256) NOT NULL,
    USER_PASSWORD VARCHAR(45) NOT NULL,
    USER_FNAME VARCHAR(45) NOT NULL,
    USER_LNAME VARCHAR(45) NOT NULL
);

CREATE TABLE TECHNICIAN (
    USER_ID INT PRIMARY KEY,
    TECHNICIAN_LEVEL INT NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
);

CREATE TABLE CUSTOMER (
    USER_ID INT PRIMARY KEY,
    CUSTOMER_PHONE VARCHAR(11),
    CUSTOMER_TIME_ZONE VARCHAR(5),
    FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
);

CREATE TABLE STATUS (
    STATUS_ID INT PRIMARY KEY,
    STATUS_NAME VARCHAR(45) NOT NULL
);

CREATE TABLE TICKET (
    TICKET_ID INT PRIMARY KEY,
    TICKET_DATE DATETIME NOT NULL,
    TICKET_TITLE VARCHAR(200) NOT NULL,
    TICKET_DESCRIPTION VARCHAR(2000) NOT NULL,
    TICKET_NOTES VARCHAR(2000),
    CUSTOMER_ID INT NOT NULL,
    TICKET_LEVEL INT NOT NULL,
    TECHNICIAN_ID INT,
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(USER_ID),
    FOREIGN KEY (TECHNICIAN_ID) REFERENCES TECHNICIAN(USER_ID)
);

CREATE TABLE TICKET_STATUS (
    TICKET_STATUS_ID INT PRIMARY KEY,
    TICKET_ID INT NOT NULL,
    STATUS_ID INT NOT NULL,
    TICKET_STATUS_DATE DATETIME NOT NULL,
    FOREIGN KEY (TICKET_ID) REFERENCES TICKET(TICKET_ID),
    FOREIGN KEY (STATUS_ID) REFERENCES STATUS(STATUS_ID)
);

CREATE TABLE COMMENT (
    COMMENT_ID INT PRIMARY KEY,
    USER_ID INT NOT NULL,
    TICKET_ID INT NOT NULL,
    COMMENT_DATE DATETIME NOT NULL,
    COMMENT_CONTENT VARCHAR(2000) NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID),
    FOREIGN KEY (TICKET_ID) REFERENCES TICKET(TICKET_ID)
);

INSERT INTO STATUS VALUES (1, 'New');
INSERT INTO STATUS VALUES (2, 'In Progress');
INSERT INTO STATUS VALUES (3, 'Closed');
INSERT INTO STATUS VALUES (4, 'Awaiting Response');

INSERT INTO USER VALUES (1, TRUE, 'grantgryczan@oakland.edu', 'password1', 'Grant', 'Gryczan');
INSERT INTO TECHNICIAN VALUES (1, 2);
INSERT INTO USER VALUES (2, TRUE, 'mwmacuga@oakland.edu', 'hunter2', 'Mitch', 'Macuga');
INSERT INTO TECHNICIAN VALUES (2, 3);
INSERT INTO USER VALUES (3, TRUE, 'fjackson@oakland.edu', 'password3', 'Faristina', 'Jackson');
INSERT INTO TECHNICIAN VALUES (3, 1);

INSERT INTO USER VALUES (4, FALSE, 'janedoe@example.com', 'password4', 'Jane', 'Doe');
INSERT INTO CUSTOMER VALUES (4, NULL, 'ET');
INSERT INTO USER VALUES (5, FALSE, 'johnsmith@example.com', 'hunter5', 'John', 'Smith');
INSERT INTO CUSTOMER VALUES (5, NULL, NULL);
INSERT INTO USER VALUES (6, FALSE, 'bobbyb@example.com', 'password6', 'Bobby', 'Brown');
INSERT INTO CUSTOMER VALUES (6, '5551235678', 'CT');

INSERT INTO TICKET VALUES (
    1,
    '2022-01-07 12:45:50',
    'Keyboard won\'t work',
    'After i finished lunch, i tried logging into my computer and it wasnt working',
    'After discussing the user, we discovered that she spilled salsa on her keyboard. Ordered a replacement keyboard, waiting for it to arrive.',
    4,
    1,
    2
);
INSERT INTO TICKET_STATUS VALUES (1, 1, 1, '2022-01-07 12:45:50');
INSERT INTO COMMENT VALUES (
    1,
    2,
    1,
    '2022-01-07 13:30:49',
    'Is there anything noteworthy that happened between when it was working and when it wasn\'t?'
);
INSERT INTO TICKET_STATUS VALUES (2, 1, 4, '2022-01-07 13:30:56');
INSERT INTO COMMENT VALUES (
    2,
    4,
    1,
    '2022-01-07 13:35:56',
    'i spilled salsa on it'
);
INSERT INTO TICKET_STATUS VALUES (3, 1, 2, '2022-01-07 14:29:30');
INSERT INTO COMMENT VALUES (
    3,
    2,
    1,
    '2022-01-07 15:08:36',
    'Alright, we\'ll get a new keyboard sent over. Let us know when you receive it.'
);
INSERT INTO TICKET_STATUS VALUES (4, 1, 4, '2022-01-07 15:08:40');

INSERT INTO TICKET VALUES (
    2,
    '2022-03-10 17:58:27',
    'Outlook is not opening',
    'When I go to open outlook, it just doesn\'t load past the blue Outlook box that first pops up.',
    'After working with the user, we discovered it was a faulty Outlook plugin causing Outlook not to respond. After disabling it, it opened without issue.',
    6,
    2,
    1
);
INSERT INTO TICKET_STATUS VALUES (5, 2, 1, '2022-03-10 17:58:27');
INSERT INTO TICKET_STATUS VALUES (6, 2, 2, '2022-03-10 18:15:22');
INSERT INTO TICKET_STATUS VALUES (7, 2, 3, '2022-03-10 19:00:02');

INSERT INTO TICKET VALUES (
    3,
    '2022-03-18 01:02:17',
    'Beeping in the Server Room',
    'There\'s a beeping coming from the server room. Seems to be originating from a box that has the letters "APC" on it.',
    NULL,
    5,
    1,
    NULL
);
INSERT INTO TICKET_STATUS VALUES (8, 3, 1, '2022-03-18 01:02:17');
INSERT INTO COMMENT VALUES (
    4,
    5,
    3,
    '2022-03-18 01:12:04',
    'I put this ticket in ten minutes ago, why hasn\'t anyone called me?'
);
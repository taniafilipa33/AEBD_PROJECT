select * from database;
select * from sessions;


INSERT INTO DATABASE (ID_DB,NAME_DB,OPERATING_SYSTEM,NUM_CPU,UPTIME) VALUES (2722566360,'ORCLCDB','Linux x86 64-bit',1,'1 days(s) 23 hour(s) 51 minute(s) 22 seconds');

delete from sessions;
delete from information;
delete from database;
delete from tablespaces;
delete from datafiles;
delete from users;

INSERT INTO SESSIONS (ID_SESSION, MAX_SESSIONS, CURRENT_SESSIONS, STATUS, TIMESTAMP, ID_USER, ID_DB) VALUES(105,472,13,'ACTIVE',to_timestamp('2021-01-21 21:40:13.03','YYYY-MM-DD HH24:MI:SS.FF'),0,2722566360);


ALTER TABLE database
DISABLE CONSTRAINT database_PK;

alter table tablespaces
disable constraint tablespaces_PK;

alter table users
disable constraint users_PK;

alter table sessions
enable constraint sessions_PK;

alter table datafiles
enable constraint datafiles_PK;

alter table information
enable constraint information_PK;
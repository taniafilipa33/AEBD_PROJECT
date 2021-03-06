
-- Generated by Oracle SQL Developer Data Modeler 17.3.0.261.1541
--   at:        2021-01-22 16:25:58 GMT
--   site:      Oracle Database 12cR2
--   type:      Oracle Database 12cR2



CREATE TABLESPACE tp_tables 
--  WARNING: Tablespace has no data files defined 
 LOGGING ONLINE EXTENT MANAGEMENT LOCAL AUTOALLOCATE FLASHBACK ON;

CREATE USER TP 
    IDENTIFIED BY  
    ACCOUNT UNLOCK 
;

CREATE TABLE database (
    id_db              NUMBER(30) NOT NULL,
    name_db            VARCHAR2(20 BYTE),
    operating_system   VARCHAR2(20 BYTE),
    num_cpu            NUMBER(*,0),
    uptime             VARCHAR2(60 BYTE)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX database_pk ON
    database ( id_db ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE database
    ADD CONSTRAINT database_pk PRIMARY KEY ( id_db )
        USING INDEX database_pk;

CREATE TABLE datafiles (
    id_datafile     NUMBER(*,0) NOT NULL,
    file_name       VARCHAR2(100 BYTE),
    status          VARCHAR2(20 BYTE),
    dt_size         FLOAT(126),
    used_space      FLOAT(126),
    timestamp       TIMESTAMP,
    id_tablespace   NUMBER(*,0)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX datafiles_pk ON
    datafiles ( id_datafile ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE datafiles
    ADD CONSTRAINT datafiles_pk PRIMARY KEY ( id_datafile )
        USING INDEX datafiles_pk;

CREATE TABLE information (
    id_information   NUMBER(*,0) NOT NULL,
    storage_data     FLOAT(126),
    storage_temp     FLOAT(126),
    free_mem         FLOAT(126),
    max_size_mem     FLOAT(126),
    cache_size_mem   FLOAT(126),
    timestamp        TIMESTAMP,
    id_db            NUMBER(*,0),
    num_clients      NUMBER(*,0)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX information_pk ON
    information ( id_information ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE information
    ADD CONSTRAINT information_pk PRIMARY KEY ( id_information )
        USING INDEX information_pk;

CREATE TABLE sessions (
    id_session         NUMBER(*,0) NOT NULL,
    max_sessions       NUMBER(*,0),
    current_sessions   NUMBER(*,0),
    status             VARCHAR2(20 BYTE),
    timestamp          TIMESTAMP,
    id_user            NUMBER(*,0),
    id_db              NUMBER(*,0)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX sessions_pk ON
    sessions ( id_session ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY ( id_session )
        USING INDEX sessions_pk;

CREATE TABLE tablespaces (
    id_tablespace     NUMBER(*,0) NOT NULL,
    name              VARCHAR2(45 BYTE),
    allocated_space   FLOAT(126),
    free_space        FLOAT(126),
    used_space        FLOAT(126),
    is_temporary      VARCHAR2(20 BYTE),
    timestamp         TIMESTAMP,
    id_db             NUMBER(*,0)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX tablespaces_pk ON
    tablespaces ( id_tablespace ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE tablespaces
    ADD CONSTRAINT tablespaces_pk PRIMARY KEY ( id_tablespace )
        USING INDEX tablespaces_pk;

CREATE TABLE users (
    id_user           NUMBER(*,0) NOT NULL,
    username          VARCHAR2(45 BYTE),
    account_status    VARCHAR2(20 BYTE),
    expiration_date   DATE,
    profile           VARCHAR2(20 BYTE),
    user_type         VARCHAR2(20 BYTE),
    created_data      DATE,
    tablespace_perm   NUMBER(*,0),
    id_db             NUMBER(*,0),
    tablespace_temp   NUMBER(*,0)
)
PCTFREE 10 PCTUSED 40 TABLESPACE tp_tables LOGGING
    STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX users_pk ON
    users ( id_user ASC )
        TABLESPACE tp_tables PCTFREE 10
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE users
    ADD CONSTRAINT users_pk PRIMARY KEY ( id_user )
        USING INDEX users_pk;

ALTER TABLE users
    ADD CONSTRAINT id_db_fk FOREIGN KEY ( id_db )
        REFERENCES database ( id_db )
    NOT DEFERRABLE;

ALTER TABLE sessions
    ADD CONSTRAINT id_db_sessions_fk FOREIGN KEY ( id_db )
        REFERENCES database ( id_db )
    NOT DEFERRABLE;

ALTER TABLE tablespaces
    ADD CONSTRAINT id_db_ts_fk FOREIGN KEY ( id_db )
        REFERENCES database ( id_db )
    NOT DEFERRABLE;

ALTER TABLE information
    ADD CONSTRAINT id_dbi_fk FOREIGN KEY ( id_db )
        REFERENCES database ( id_db )
    NOT DEFERRABLE;

ALTER TABLE datafiles
    ADD CONSTRAINT id_tsp_fk FOREIGN KEY ( id_tablespace )
        REFERENCES tablespaces ( id_tablespace )
    NOT DEFERRABLE;

ALTER TABLE users
    ADD CONSTRAINT tablespace_perm_fk FOREIGN KEY ( tablespace_perm )
        REFERENCES tablespaces ( id_tablespace )
    NOT DEFERRABLE;

ALTER TABLE users
    ADD CONSTRAINT tablespace_temp_fk FOREIGN KEY ( tablespace_temp )
        REFERENCES tablespaces ( id_tablespace )
    NOT DEFERRABLE;

ALTER TABLE sessions
    ADD CONSTRAINT user_fk FOREIGN KEY ( id_user )
        REFERENCES users ( id_user )
    NOT DEFERRABLE;



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                             6
-- CREATE INDEX                             6
-- ALTER TABLE                             14
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        1
-- CREATE USER                              1
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 1

--TableSpaces Info:
--idTableSpace:
SELECT *  FROM USER_TABLESPACES;
--get info from permanent tablespace
SELECT A.tablespace_name tablespace_name,
       trunc(round(b.free/1024/1024)) free_mb,
       trunc(a.bytes/1024/1024) allocated_mb,       
       (trunc(a.bytes/1024/1024) - trunc(round(b.free/1024/1024))) Used_Space_MB,
      -- trunc((select tablespace_size from DBA_TABLESPACE_USAGE_METRICS where a.tablespace_name=tablespace_name)/1024/1024) Table_Size,
       (SELECT contents FROM dba_tablespaces where a.tablespace_name=tablespace_name) isTemporary
FROM (
     SELECT tablespace_name,
            bytes,
            decode(autoextensible,'YES',maxbytes,bytes) maxsize
     FROM   dba_data_files 
     GROUP BY file_id, file_name,
              tablespace_name,
              autoextensible,
              bytes,
              decode(autoextensible,'YES',maxbytes,bytes)
     ) a,
     (SELECT file_id,
             tablespace_name,
             sum(bytes) free
      FROM   dba_free_space
      GROUP BY file_id,
               tablespace_name
      ) b
WHERE A.tablespace_name=b.tablespace_name
ORDER BY A.tablespace_name ASC; 


--get Temporary tab info
select TABLESPACE_NAME,to_char(ALLOCATED_SPACE/1024/1024,9999.99) Allocated ,to_char(FREE_SPACE/1024/1024, 99999.99) Free ,
to_char(TABLESPACE_SIZE/1024/1024 - FREE_SPACE/1024/1024,9999.99) Used, --, to_char(TABLESPACE_SIZE/1024/1024,9999.99) Table_size
'TEMPORARY' Is_temporary
from DBA_TEMP_FREE_SPACE;

---------------------------------------------------------------------------User Info
--get user info (local -> NO), (Common -> YES)
select USERNAME, USER_ID, ACCOUNT_STATUS, CREATED,PROFILE,Common,DEFAULT_TABLESPACE, TEMPORARY_TABLESPACE, EXPIRY_DATE from dba_users A order by created DESC;

---------------------------------------------------------------------------datafiles info
select df.File_Name, df.File_ID, df.TablesPace_Name, Round(df.Bytes/1024/1024,2) "Size (M)", df.status, e.used_bytes/1024/1024 "Used (M)"  from dba_data_files df, (SELECT file_id, Sum(Decode(bytes,NULL,0,bytes)) used_bytes FROM dba_extents GROUP by file_id) E WHERE e.file_id (+) = df.file_id;

-------------------------------------------------------------------------- get number of clientes
SELECT distinct username FROM v$session 
WHERE username IS NOT NULL 
ORDER BY username ASC;

---------------------------------------------------------------------------SESSOES
SELECT count(*) FROM V$SESSION;
 -- idSessao, NumMax, NumSessoesAtuais, idUser , STatus
 select a.SID isSessao, b.value MaxSessions, (select count(*) from v$session a, v$process b where type= 'USER' and a.Creator_ADDR = b.ADDR) NumSessoesAtuais  ,a.User# idUser, a.status STATUS from v$session a , v$parameter b
 WHERE b.name = 'sessions' ; 
--num sessoes total / sessoes ativas 
select count(*) from v$session a, v$process b where type= 'USER' and a.Creator_ADDR = b.ADDR;
select * from v$session;
 select * from v$process;

  
 -----------------------------------------------------------tabela da BD - isBD / NomeBD / nomeSistemaOperativo / numCPU / Uptime
 SELECT a.DBID, a.NAME nomeBD, a.PLATFORM_NAME SO, b.CPU_CORE_COUNT_CURRENT, ( floor(sysdate - c.startup_time) || ' days(s) ' ||
   trunc( 24*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))) || ' hour(s) ' ||
   mod(trunc(1440*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))), 60) ||' minute(s) ' ||
   mod(trunc(86400*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))), 60) ||' seconds') uptime  FROM V$DATABASE a , V$LICENSE b , sys.v_$instance c;

------------------------------------------------------------------Info table

--DataStorage
SELECT sum(Bytes)/1024/1024 FROM  USER_TABLESPACES a, dba_data_files b where Contents = 'PERMANENT' and a.TABLESPACE_NAME = b.TABLESPACE_NAME;


--TemporaryStorage
select sum(A.TABLESPACE_SIZE)/1024/1024 Temporary_Storage_MB
from DBA_TEMP_FREE_SPACE A ;


select * from v$metricname where metric_name = 'Database CPU Time Ratio'; 

--Maximum size / 
select
   Name, Bytes/1024/1024 SGAMaxSize_MB from
   v$sgainfo where Name='Maximum SGA Size' or Name='Buffer Cache Size' or Name='Free SGA Memory Available'; 


select sum(df.Bytes/1024/1024) "Size (M)", sum( e.used_bytes/1024/1024) "Used (M)"  from dba_data_files df, (SELECT file_id,
Sum(Decode(bytes,NULL,0,bytes)) used_bytes 
FROM dba_extents
GROUP by file_id) E WHERE e.file_id (+) = df.file_id;


                             
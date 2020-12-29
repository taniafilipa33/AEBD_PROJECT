 SELECT a.DBID, a.NAME nomeBD, a.PLATFORM_NAME SO, b.CPU_CORE_COUNT_CURRENT, ( floor(sysdate - c.startup_time) || ' days(s) ' ||
   trunc( 24*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))) || ' hour(s) ' ||
   mod(trunc(1440*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))), 60) ||' minute(s) ' ||
   mod(trunc(86400*((sysdate-c.startup_time) -
   trunc(sysdate-c.startup_time))), 60) ||' seconds') uptime  FROM V$DATABASE a , V$LICENSE b , sys.v_$instance c;
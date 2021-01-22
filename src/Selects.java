import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;



public class Selects {
    long id_db;
    int indiceTablespaces;
    int idInformation;
    int idSessions;
    int idDatafiles;
    ArrayList<Integer> idUsersT;

    public Selects(){
        idUsersT= new ArrayList<> ();
        String getInfoDB = "SELECT a.DBID FROM V$DATABASE a ";
        String getTableSPIndex = "select count(*)-1 from TABLESPACES";
        String idInfo = "select count(*) from information";
        String idData = "select count(*) from datafiles";
        String idSess = "select count(*) from Sessions";
        String idUsers = "select ID_USER from users";
        ResultSet rs;
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getInfoDB);
            while (rs.next()) {
                id_db=rs.getLong (1);
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement ();
            rs= st2.executeQuery (getTableSPIndex);
            while (rs.next()) {
                indiceTablespaces=rs.getInt (1)+1;
            }
            Statement st3 = Conexao.getConexao_plug ().createStatement ();
            rs= st3.executeQuery (idInfo);
            while (rs.next()) {
                idInformation=rs.getInt (1)+1;
            }
            Statement st4 = Conexao.getConexao_plug ().createStatement ();
            rs= st4.executeQuery (idData);
            while (rs.next()) {
                idDatafiles=rs.getInt (1)+1;
            }
            Statement st5 = Conexao.getConexao_plug ().createStatement ();
            rs= st5.executeQuery (idSess);
            while (rs.next()) {
                idSessions=rs.getInt (1)+1;
            }
            Statement st6 = Conexao.getConexao_plug ().createStatement();
            rs = st6.executeQuery(idUsers);
            while (rs.next()) {
               idUsersT.add (rs.getInt (1));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
    }

    public String getTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss.FF");
        Date custDate = new Date ();
        return sdf.format (custDate);

    }


    public ResultSet selectUtilizadores(){
        ResultSet rs= null;
        ArrayList<String> insertsTP = new ArrayList<> ();
        String getUtiInfo = "select USERNAME, USER_ID, ACCOUNT_STATUS, CREATED,PROFILE,Common,DEFAULT_TABLESPACE, TEMPORARY_TABLESPACE, EXPIRY_DATE from dba_users A order by created DESC";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getUtiInfo);
            while (rs.next()) {
                if(idUsersT.contains (rs.getInt(2))){
                    //System.out.println ("update!!! -> "+ rs.getInt (2));
                    insertsTP.add ("UPDATE  USERS SET " +
                            " ID_USER ="+rs.getInt (2) +
                            ",USERNAME ='"+rs.getString (1)+"'" +
                            ",ACCOUNT_STATUS ='"+rs.getString (3)+"'" +
                            ", EXPIRATION_DATE=TO_DATE('"+rs.getDate (9)+"','YYYY-MM-DD')," +
                            " PROFILE='"+rs.getString (5)+"'," +
                            " USER_TYPE='"+rs.getString (6)+"', " +
                            "CREATED_DATA=TO_DATE('" + rs.getDate (4) + "','YYYY-MM-DD')," +
                            " TABLESPACE_PERM="+getTablespace_id (rs.getString (8))+"," +
                            " ID_DB="+id_db+"," +
                            "TABLESPACE_TEMP="+getTablespace_id (rs.getString (7))+" WHERE ID_USER="+rs.getInt (2));

                }
                else {
                    //System.out.println ("insert!!! -> "+ rs.getInt (2));
                    insertsTP.add ("INSERT INTO USERS (ID_USER,USERNAME,ACCOUNT_STATUS, EXPIRATION_DATE, PROFILE, USER_TYPE, CREATED_DATA, TABLESPACE_PERM, ID_DB,TABLESPACE_TEMP) VALUES ("
                            + rs.getInt (2) + ",'"
                            + rs.getString (1) + "','"
                            + rs.getString (3) + "', TO_DATE('"
                            + rs.getDate (9) + "','YYYY-MM-DD'),'"
                            + rs.getString (5) + "','"
                            + rs.getString (6) + "',TO_DATE('"
                            + rs.getDate (4) + "','YYYY-MM-DD'),"
                            + getTablespace_id (rs.getString (8)) + ","
                            + id_db + ","
                            + getTablespace_id (rs.getString (7)) + ")");
                }
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement();
            for(String a : insertsTP) {
                System.out.println (a);
                st2.executeUpdate (a);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return rs;
    }

    public ResultSet selectTablespaces(){
        ResultSet rs;
        ResultSet rs2;
        ArrayList<String> insertsTT = new ArrayList<> ();
        ArrayList<String> insertsTP = new ArrayList<> ();
        String getTablePermanent =  "SELECT A.tablespace_name tablespace_name, trunc(round(b.free/1024/1024)) free_mb,trunc(a.bytes/1024/1024) allocated_mb,(trunc(a.bytes/1024/1024) - trunc(round(b.free/1024/1024))) Used_Space_MB,(SELECT contents FROM dba_tablespaces where a.tablespace_name=tablespace_name) isTemporary FROM (SELECT tablespace_name, bytes, decode(autoextensible,'YES',maxbytes,bytes) maxsize FROM dba_data_files GROUP BY file_id, file_name, tablespace_name, autoextensible, bytes, decode(autoextensible,'YES',maxbytes,bytes)) a,(SELECT file_id,tablespace_name,sum(bytes) free FROM dba_free_space GROUP BY file_id, tablespace_name) b WHERE A.tablespace_name=b.tablespace_name ORDER BY A.tablespace_name ASC";
        String getTableTemp = "select TABLESPACE_NAME, trunc(ALLOCATED_SPACE/1024/1024) Allocated ,trunc(FREE_SPACE/1024/1024) Free , trunc(TABLESPACE_SIZE/1024/1024 - FREE_SPACE/1024/1024) Used, 'TEMPORARY' Is_temporary from DBA_TEMP_FREE_SPACE";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getTablePermanent);
            while (rs.next()) {
                String times = getTimeStamp ();
                insertsTP.add("INSERT INTO TABLESPACES (ID_TABLESPACE,NAME,ALLOCATED_SPACE,FREE_SPACE,USED_SPACE,IS_TEMPORARY,TIMESTAMP,ID_DB) VALUES ("+
                        indiceTablespaces+",'"
                        +rs.getString(1)+"',"
                        +rs.getFloat (3)+","
                        +rs.getFloat(2)+","
                        +rs.getFloat (4)+",'"
                        +rs.getString(5)+"',to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"
                        +id_db+")");
                indiceTablespaces++;
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement();
            for(String a : insertsTP) {
                st2.executeUpdate (a);
            }
            st = Conexao.getConexao_root ().createStatement();
            rs2 = st.executeQuery(getTableTemp);
            while (rs2.next()) {
                String times = getTimeStamp ();
                insertsTT.add("INSERT INTO TABLESPACES (ID_TABLESPACE,NAME,ALLOCATED_SPACE,FREE_SPACE,USED_SPACE,IS_TEMPORARY,TIMESTAMP,ID_DB) VALUES ("+
                        indiceTablespaces+",'"
                        +rs2.getString(1)+"',"
                        +rs2.getFloat (2)+","
                        +rs2.getFloat(3)+","
                        +rs2.getFloat (4)+",'"
                        +rs2.getString(5)+"',to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"
                        +id_db+")");
                indiceTablespaces++;
            }
            st2 = Conexao.getConexao_plug ().createStatement();

            for(String a : insertsTT) {
                st2.executeUpdate (a);
            }
        } catch (SQLException  throwables ) {
            throwables.printStackTrace ();
        }
        return null;
    }

    public ResultSet getDatafiles(){
        String datafiles ="select df.File_Name, df.File_ID, df.TablesPace_Name, Round(df.Bytes/1024/1024,2) Size_MB, df.status, e.used_bytes/1024/1024 Used_MB  from dba_data_files df, (SELECT file_id, Sum(Decode(bytes,NULL,0,bytes)) used_bytes FROM dba_extents GROUP by file_id) E WHERE e.file_id (+) = df.file_id";
        String datafilTemp = "SELECT  b.file_name,a.file_id,a.tablespace_name,b.bytes/1024/1024,b.status,a.bytes_used/1024/1024 FROM v$temp_extent_pool a, dba_temp_files b  where a.tablespace_name (+)=b.tablespace_name";
        ResultSet rs;
        int rs2;
        ArrayList<String> inserts = new ArrayList<> ();
        ArrayList<String> insertsT = new ArrayList<> ();
        try {
            String times = getTimeStamp ();
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(datafiles);
            while (rs.next()) {
                inserts.add( "INSERT INTO DATAFILES (ID_DATAFILE,FILE_NAME,STATUS,DT_SIZE,USED_SPACE,TIMESTAMP,ID_TABLESPACE) VALUES ("
                        +idDatafiles+",'"+rs.getString(1)+"','"+
                        rs.getString(5) +"',"
                        +rs.getFloat (4)+","+rs.getFloat(6)+
                        ",to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"+
                        getTablespace_id(rs.getString(3))+")");
                idDatafiles++;
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement();
            for(String a : inserts) {
                st2.executeUpdate (a);
            }
            st = Conexao.getConexao_root ().createStatement();
            rs=st.executeQuery(datafilTemp);
            while (rs.next()) {
                insertsT.add( "INSERT INTO DATAFILES (ID_DATAFILE,FILE_NAME,STATUS,DT_SIZE,USED_SPACE,TIMESTAMP,ID_TABLESPACE) VALUES (" +
                        idDatafiles+",'"+rs.getString(1)+"','"+
                        rs.getString(5) +"',"
                        +rs.getFloat (4)+","+rs.getFloat(6)+
                        ",to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"+
                        getTablespace_id(rs.getString(3))+")");
                idDatafiles++;
            }
            st2 = Conexao.getConexao_plug ().createStatement();
            for(String a : insertsT) {
                st2.executeUpdate (a);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return null;
    }

    public ResultSet selectSessions(){
        ResultSet rs;
        ResultSet rs2;
        String getInfoSession = "select a.SID isSessao, b.value MaxSessions, (select count(*) from v$session a, v$process b where type= 'USER' and a.Creator_ADDR = b.ADDR) NumSessoesAtuais  ,a.User# idUser, a.status STATUS from v$session a , v$parameter b WHERE b.name = 'sessions'";
        ArrayList<String> insertsIS = new ArrayList<> ();

        System.out.println(getInfoSession);
        try {
            Statement st = Conexao.getConexao_root().createStatement();
            rs = st.executeQuery(getInfoSession);
            System.out.println("ola1111");
            while (rs.next()) {
                String times = getTimeStamp ();
                insertsIS.add("INSERT INTO SESSIONS (ID_SESSION, MAX_SESSIONS, CURRENT_SESSIONS, STATUS, TIMESTAMP, ID_USER, ID_DB) VALUES("
                        + idSessions+","
                        + rs.getInt(2)+","
                        + rs.getInt(3)+",'"
                        + rs.getString(5)+"',"
                        + "to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"
                        + rs.getInt(4)+","
                        + id_db + ")");
                idSessions++;
            }

            Statement st2 = Conexao.getConexao_plug ().createStatement();
            for(String a : insertsIS) {
                //System.out.println (a);
                st2.executeUpdate (a);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return null;
    }

    public int getTablespace_id(String nome){
        String table = "select id_tablespace from tablespaces where name='"+nome+"'";
        ResultSet rs;
        try {
            Statement st = Conexao.getConexao_plug ().createStatement();
            rs = st.executeQuery (table);
            while(rs.next()){
                return rs.getInt (1);
            }
        }catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return 0;
    }
    public ResultSet selectDatabase(){
        ResultSet rs ;
        ArrayList<String> inserts = new ArrayList<> ();
        String getInfoDB = "SELECT a.DBID, a.NAME nomeBD, a.PLATFORM_NAME SO, b.CPU_CORE_COUNT_CURRENT, "
                + "( floor(sysdate - c.startup_time) || ' days(s) ' || "
                + "trunc( 24*((sysdate-c.startup_time) - trunc(sysdate-c.startup_time))) || ' hour(s) ' || "
                + "mod(trunc(1440*((sysdate-c.startup_time) - trunc(sysdate-c.startup_time))), 60) ||' minute(s) ' || "
                + "mod(trunc(86400*((sysdate-c.startup_time) - trunc(sysdate-c.startup_time))), 60) ||' seconds') uptime"
                + " FROM V$DATABASE a , V$LICENSE b , v$instance c";
        try {
            Statement st = Conexao.getConexao_root().createStatement();
            rs = st.executeQuery(getInfoDB);
            while (rs.next()){
                id_db=rs.getLong(1);
                inserts.add( "INSERT INTO DATABASE (ID_DB,NAME_DB,OPERATING_SYSTEM,NUM_CPU,UPTIME) VALUES (" +
                        rs.getLong(1)+",'"+rs.getString(2)+"','"+rs.getString(3) +"',"
                        +rs.getInt(4)+",'"+rs.getString(5)+"')");
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement ();
            String h = "SELECT * FROM TABLESPACES";
            //System.out.println (inserts.get(y));

            for (String insert : inserts){
                //st = Conexao.getConexao_plug ().prepareStatement (insert);
                st2.executeUpdate (insert);
            }
            //ResultSet a = st2.executeQuery (h);
            //System.out.println(a);
            /*
            for(String a : inserts) {
                try {
                    st2.executeQuery (a);
                }catch(Exception oi) {
                    oi.printStackTrace();
                }
            }

             */
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    public ResultSet getInfo(){
        ResultSet rs2;
        ResultSet rs1;
        ResultSet rs3;
        String insert ="INSERT INTO INFORMATION(ID_INFORMATION,STORAGE_DATA,STORAGE_TEMP,FREE_MEM,CACHE_SIZE_MEM,MAX_SIZE_MEM,TIMESTAMP,ID_DB,NUM_CLIENTS) VALUES ("+idInformation+",";

        ResultSet rs4;
        String getCli = "SELECT count(distinct username) FROM v$session WHERE username IS NOT NULL ORDER BY username ASC";
        String a = "SELECT sum(Bytes)/1024/1024 FROM  USER_TABLESPACES a, dba_data_files b where Contents = 'PERMANENT' and a.TABLESPACE_NAME = b.TABLESPACE_NAME";
        String tempStorage = "select sum(A.TABLESPACE_SIZE)/1024/1024 Temporary_Storage_MB from DBA_TEMP_FREE_SPACE A";
        String maxSize = "select Name, Bytes/1024/1024 SGAMaxSize_MB from v$sgainfo where Name='Maximum SGA Size' or Name='Buffer Cache Size' or Name='Free SGA Memory Available' order by SGAMAXSIZE_MB asc";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs1 = st.executeQuery(a);
            while (rs1.next()) {
                insert = insert + rs1.getFloat(1) +",";
            }
            rs2 = st.executeQuery(tempStorage);
            while (rs2.next()) {
                insert = insert + rs2.getFloat(1) +",";
            }
            rs3 = st.executeQuery(maxSize);
            while (rs3.next()) {
                insert = insert + rs3.getFloat(2) +",";
            }
            String times = getTimeStamp ();
            insert = insert + "to_timestamp('"+times+"','YYYY-MM-DD HH24:MI:SS.FF'),"+id_db+",";
            rs4 = st.executeQuery(getCli);
            while (rs4.next()) {
                insert = insert + rs4.getInt(1)+")";
            }
            Statement st2 = Conexao.getConexao_plug ().createStatement();
            st2.executeUpdate (insert);
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        idInformation++;
        return null;
    }
}
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Selects {
    public ResultSet selectUtilizadores(){
        ResultSet rs= null;
        String getUtiInfo = "select USERNAME, USER_ID, ACCOUNT_STATUS, CREATED,PROFILE,Common,DEFAULT_TABLESPACE, TEMPORARY_TABLESPACE, EXPIRY_DATE from dba_users A order by created DESC";
        //String getUtiInfo = "SELECT * FROM ALL_USERS";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getUtiInfo);
            while (rs.next()) {
                System.out.println(rs.getString(1)+rs.getInt(2)+rs.getString(3) +rs.getDate (4)+rs.getString(5)+rs.getString(6)+rs.getString(7)+rs.getString(8)+rs.getDate (9));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return rs;
    }

    public ResultSet selectTablespaces(){
        ResultSet rs;
        ResultSet rs2;
        String getTablePermanent =  "SELECT A.tablespace_name tablespace_name, trunc(round(b.free/1024/1024)) free_mb,trunc(a.bytes/1024/1024) allocated_mb,(trunc(a.bytes/1024/1024) - trunc(round(b.free/1024/1024))) Used_Space_MB,(SELECT contents FROM dba_tablespaces where a.tablespace_name=tablespace_name) isTemporary FROM (SELECT tablespace_name, bytes, decode(autoextensible,'YES',maxbytes,bytes) maxsize FROM dba_data_files GROUP BY file_id, file_name, tablespace_name, autoextensible, bytes, decode(autoextensible,'YES',maxbytes,bytes)) a,(SELECT file_id,tablespace_name,sum(bytes) free FROM dba_free_space GROUP BY file_id, tablespace_name) b WHERE A.tablespace_name=b.tablespace_name ORDER BY A.tablespace_name ASC";
        String getTableTemp = "select TABLESPACE_NAME, trunc(ALLOCATED_SPACE/1024/1024) Allocated ,trunc(FREE_SPACE/1024/1024) Free , trunc(TABLESPACE_SIZE/1024/1024 - FREE_SPACE/1024/1024) Used, 'TEMPORARY' Is_temporary from DBA_TEMP_FREE_SPACE";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getTablePermanent);
            while (rs.next()) {
                System.out.println(rs.getString(1)+rs.getFloat (2)+rs.getFloat(3) +rs.getFloat (4)+rs.getString(5));
            }

            rs2 = st.executeQuery(getTableTemp);
            while (rs2.next()) {
                System.out.println(rs2.getString(1)+rs2.getFloat (2)+rs2.getFloat(3) +rs2.getFloat (4)+rs2.getString(5));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return null;
    }

    public ResultSet getDatafiles(){
        String datafiles ="select df.File_Name, df.File_ID, df.TablesPace_Name, Round(df.Bytes/1024/1024,2) Size_MB, df.status, e.used_bytes/1024/1024 Used_MB  from dba_data_files df, (SELECT file_id, Sum(Decode(bytes,NULL,0,bytes)) used_bytes FROM dba_extents GROUP by file_id) E WHERE e.file_id (+) = df.file_id";
        ResultSet rs;
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(datafiles);
            while (rs.next()) {
                System.out.println(rs.getString(1)+rs.getInt(2)+rs.getString(3) +rs.getFloat (4)+rs.getString(5)+rs.getFloat(6));
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
        String getNumSessions = "select count(*) from v$session a, v$process b where type= 'USER' and a.Creator_ADDR = b.ADDR";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs = st.executeQuery(getInfoSession);
            while (rs.next()) {
                System.out.println(rs.getInt(1)+rs.getInt(2)+rs.getInt(3) +rs.getInt(4)+rs.getString(5));
            }
            rs2 = st.executeQuery(getNumSessions);
            while (rs2.next()) {
                System.out.println(rs2.getInt(1));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return null;
    }

    public ResultSet selectDatabase(){
        ResultSet rs ;
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
                System.out.println(rs.getLong (1) +" "+ rs.getString(2) +" "+ rs.getString(3) +" "+ rs.getInt(4) +" "+ rs.getString(5));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    public ResultSet getInfo(){
        ResultSet rs1;
        ResultSet rs2;
        ResultSet rs3;
        ResultSet rs4;
        ResultSet rs5;
        String getCli = "SELECT count(distinct username) FROM v$session WHERE username IS NOT NULL ORDER BY username ASC";
        String a = "SELECT sum(Bytes)/1024/1024 FROM  USER_TABLESPACES a, dba_data_files b where Contents = 'PERMANENT' and a.TABLESPACE_NAME = b.TABLESPACE_NAME";
        String tempStorage = "select sum(A.TABLESPACE_SIZE)/1024/1024 Temporary_Storage_MB from DBA_TEMP_FREE_SPACE A";
        String maxSize = "select Name, Bytes/1024/1024 SGAMaxSize_MB from v$sgainfo where Name='Maximum SGA Size' or Name='Buffer Cache Size' or Name='Free SGA Memory Available'";
        String b = "select sum(df.Bytes/1024/1024) Size_MB, sum( e.used_bytes/1024/1024) Used_MB  from dba_data_files df, (SELECT file_id, Sum(Decode(bytes,NULL,0,bytes)) used_bytes FROM dba_extents GROUP by file_id) E WHERE e.file_id (+) = df.file_id";
        try {
            Statement st = Conexao.getConexao_root ().createStatement();
            rs1 = st.executeQuery(a);
            while (rs1.next()) {
                System.out.println(rs1.getFloat(1));
            }
            rs2 = st.executeQuery(tempStorage);
            while (rs2.next()) {
                System.out.println(rs2.getFloat(1));
            }
            rs3 = st.executeQuery(maxSize);
            while (rs3.next()) {
                System.out.println(rs3.getString(1)+rs3.getFloat(2));
            }
            rs4 = st.executeQuery(b);
            while (rs4.next()) {
                System.out.println(rs4.getFloat(1)+rs4.getFloat(2));
            }
            rs5 = st.executeQuery(getCli);
            while (rs5.next()) {
                System.out.println(rs5.getInt(1));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace ();
        }
        return null;
    }
}

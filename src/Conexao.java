import java.sql.*;

public class Conexao {

    public static final String DB_DRIVER = "oracle.jdbc.driver.OracleDriver";
    public static final String DB_CONNECTION_ROOT = "jdbc:oracle:thin:@127.0.0.1:1521/orclpdb1.localdomain";
    public static final String DB_CONNECTION_PLUG = "jdbc:oracle:thin:@127.0.0.1:1521/orclpdb1.localdomain";
    public static final String DB_USER = "system";
    public static final String DB_PASSWORD = "Oradoc_db1";
    public static final String DB_USER_PDB = "TP";
    public static final String DB_PASSWORD_PDB = "tp";


    public static Connection getConexao(String conn, String user, String pw) {
        Connection oc = null;
        try {
            Class.forName(DB_DRIVER);
        } catch (ClassNotFoundException e) {
            System.out.println("Error driver JDBC: "+e.getMessage());
        }

        try {
            oc = DriverManager.getConnection(conn,user,pw);
            return oc;
        } catch (SQLException e) {
            System.out.println("Cannot open connection: "+e.getMessage());
        }

        return oc;
    }

    public static Connection getConexao_root() {
        return getConexao(DB_CONNECTION_ROOT, DB_USER, DB_PASSWORD);
    }

    public static Connection getConexao_plug() {
        return getConexao(DB_CONNECTION_PLUG, DB_USER_PDB, DB_PASSWORD_PDB);
    }

}

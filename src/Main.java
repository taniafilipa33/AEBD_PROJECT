import java.sql.Connection;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args )
    {

        //Conexao c = new Conexao ();
        Selects s = new Selects ();
        //s.selectDatabase ();
        
        s.getInfo ();
        s.selectTablespaces ();
        s.getDatafiles ();
        s.selectUtilizadores ();
        s.selectSessions ();
    }
}

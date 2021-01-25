import java.sql.Connection;
import java.sql.SQLException;

import static java.lang.Thread.sleep;

public class Main {
    public static void main(String[] args )
    {

        //Conexao c = new Conexao ();
        Selects s = new Selects ();
        //s.selectDatabase ();
        while(true) {
            System.out.println ("vol");
            s.selectTablespaces ();
            s.selectUtilizadores ();
            s.selectSessions ();
            s.getInfo ();
            s.getDatafiles ();
            try {
                sleep(15000);
            } catch (InterruptedException e) {
                e.printStackTrace ();
            }
            s= null;
            s = new Selects ();
        }
    }
}

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
            System.out.println("passT");
            s.selectUtilizadores ();
            System.out.println("passU");
            s.selectSessions ();
            System.out.println("passS");
            s.getInfo ();
            System.out.println("passI");
            s.getDatafiles ();
            System.out.println("passD");
            try {
                sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace ();
            }
            s= null;
            s = new Selects ();
        }
    }
}

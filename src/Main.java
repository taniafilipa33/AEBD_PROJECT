import java.sql.Connection;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args )
    {
        Conexao c = new Conexao ();
        Selects s = new Selects ();
        //c.connTest();
        s.getInfo();
    }
}

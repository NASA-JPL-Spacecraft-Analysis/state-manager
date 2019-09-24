package gov.nasa.jpl.fpsa.util;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

public class DatabaseUtil {
    private static ComboPooledDataSource dataSource;

    static {
        try {
            dataSource = new ComboPooledDataSource();
            dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");

            dataSource.setJdbcUrl(System.getenv("JDBC_URL"));
            dataSource.setUser(System.getenv("JDBC_USER"));
            dataSource.setPassword(System.getenv("JDBC_PASS"));

            dataSource.setInitialPoolSize(5);
            dataSource.setMinPoolSize(5);
            dataSource.setAcquireIncrement(5);
            dataSource.setMaxPoolSize(20);
            dataSource.setMaxStatements(100);
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }
    }

    public static DataSource getDataSource() {
        return dataSource;
    }
}
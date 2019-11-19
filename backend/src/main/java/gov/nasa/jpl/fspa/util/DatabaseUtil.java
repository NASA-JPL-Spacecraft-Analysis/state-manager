package gov.nasa.jpl.fspa.util;

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

            dataSource.setMinPoolSize(3);
            dataSource.setMaxPoolSize(20);
            dataSource.setAcquireIncrement(1);
            dataSource.setTestConnectionOnCheckin(true);
            dataSource.setIdleConnectionTestPeriod(300);
            dataSource.setMaxIdleTimeExcessConnections(240);
            dataSource.setMaxStatements(100);
            dataSource.setInitialPoolSize(5);
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }
    }

    public static DataSource getDataSource() {
        return dataSource;
    }
}
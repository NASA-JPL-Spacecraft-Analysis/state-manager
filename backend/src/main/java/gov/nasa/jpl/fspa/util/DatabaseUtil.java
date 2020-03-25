package gov.nasa.jpl.fspa.util;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DatabaseUtil {
    private static ComboPooledDataSource dataSource;
    private static String mysqlDateFormatString = "yyyy-MM-dd kk:mm:ss";
    private static String outputFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";

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

    public static String convertMysqlDate(String date) {
        DateFormat inputDateFormat = new SimpleDateFormat(mysqlDateFormatString, Locale.ENGLISH);
        DateFormat outputDateFormat = new SimpleDateFormat(outputFormat, Locale.ENGLISH);

        try {
            Date parsedDate = inputDateFormat.parse(date);

            return outputDateFormat.format(parsedDate);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}

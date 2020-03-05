package gov.nasa.jpl.fspa.service;

import com.opencsv.CSVWriter;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class CsvServiceImpl<T> implements CsvService<T> {
    private final Class<T> type;

    public CsvServiceImpl(Class<T> type) {
        this.type = type;
    }

    @Override
    public String outputAsCsv(List<T> objectList) {
        StringBuilder csvOutput = new StringBuilder();

        // Create columns for all the properties.
        for (Field field: type.getDeclaredFields()) {
            csvOutput.append(field.getName()).append(",");
        }

        // Delete the trailing comma.
        csvOutput.deleteCharAt(csvOutput.length() - 1);
        // Add a new line after the column headers.
        csvOutput.append("\n");

        // Add all the data.
        for (T object: objectList) {
            csvOutput.append(object.toString());
        }

        return csvOutput.toString();
    }

    @Override
    public List<T> parseCsv(InputStream inputStream) {
        List<T> parsedItems = new ArrayList<>();

        try {
            Reader reader = new InputStreamReader(inputStream);
            CsvToBean<T> csvToBean = new CsvToBeanBuilder<T>(reader).withType(this.type).build();

            parsedItems.addAll(csvToBean.parse());

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return parsedItems;
    }
}

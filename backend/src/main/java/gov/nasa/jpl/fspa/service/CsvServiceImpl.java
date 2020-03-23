package gov.nasa.jpl.fspa.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class CsvServiceImpl implements CsvService {

    @Override
    public <T> String outputAsCsv(List<T> objectList, Class<T> type) {
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
    public List<StateEnumeration> parseStateEnumerations(InputStream inputStream) {
        List<StateEnumeration> parsedStateEnumerations = new ArrayList<>();

        return parseCsv(inputStream, parsedStateEnumerations, StateEnumeration.class);
    }

    @Override
    public List<StateVariable> parseStateVariables(InputStream inputStream) {
        List<StateVariable> parsedStateVariables = new ArrayList<>();

        return parseCsv(inputStream, parsedStateVariables, StateVariable.class);
    }

    private <T> List<T> parseCsv(InputStream inputStream, List<T> parsedItems, Class<T> type) {
        try {
            Reader reader = new InputStreamReader(inputStream);
            CsvToBean<T> csvToBean = new CsvToBeanBuilder<T>(reader).withType(type).build();

            parsedItems.addAll(csvToBean.parse());

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return parsedItems;
    }
}

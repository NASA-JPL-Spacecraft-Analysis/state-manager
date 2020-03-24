package gov.nasa.jpl.fspa.service;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import gov.nasa.jpl.fspa.model.EnumerationCsv;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.io.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    public List<EnumerationCsv> parseStateEnumerations(InputStream inputStream) {
        List<EnumerationCsv> parsedStateEnumerations = new ArrayList<>();

        return parseCsv(inputStream, parsedStateEnumerations, EnumerationCsv.class);
    }

    @Override
    public List<StateVariable> parseStateVariables(InputStream inputStream) {
        List<StateVariable> parsedStateVariables = new ArrayList<>();

        return parseCsv(inputStream, parsedStateVariables, StateVariable.class);
    }

    /**
     * Generic csv to bean parser.
     * Will only parse into existing classes we have defined.
     * @param inputStream The inputStream from the uploaded .csv file.
     * @param parsedItems The list we want to parse the items into.
     * @param type The type we want to parse into.
     * @param <T> The type we want to parse into.
     * @return The list of parsed items.
     */
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

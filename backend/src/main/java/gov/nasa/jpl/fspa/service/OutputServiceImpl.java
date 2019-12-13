package gov.nasa.jpl.fspa.service;

import java.lang.reflect.Field;
import java.util.List;

public class OutputServiceImpl<T> implements OutputService<T> {
    private final Class<T> type;

    public OutputServiceImpl(Class<T> type) {
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
}

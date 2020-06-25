package gov.nasa.jpl.fspa.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import gov.nasa.jpl.fspa.model.*;

import java.io.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class CsvParseServiceImpl implements FileParseService {

    @Override
    public <T> String output(List<T> objectList, Class<T> type) {
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
    public List<Event> parseEvents(InputStream inputStream) {
        List<Event> parsedEventList = new ArrayList<>();

        return parseCsv(inputStream, parsedEventList, Event.class);
    }

    @Override
    public List<InformationTypesUpload> parseInformationTypes(InputStream inputStream) {
        List<InformationTypesUpload> parsedInformationTypes = new ArrayList<>();

        return parseCsv(inputStream, parsedInformationTypes, InformationTypesUpload.class);
    }

    @Override
    public List<RelationshipUpload> parseRelationships(InputStream inputStream) {
        List<RelationshipUpload> parsedRelationshipUploadList = new ArrayList<>();

        return parseCsv(inputStream, parsedRelationshipUploadList, RelationshipUpload.class);
    }

    @Override
    public List<StateEnumerationUpload> parseStateEnumerations(InputStream inputStream) {
        List<StateEnumerationUpload> parsedStateEnumerations = new ArrayList<>();

        return parseCsv(inputStream, parsedStateEnumerations, StateEnumerationUpload.class);
    }

    @Override
    public List<State> parseStates(InputStream inputStream) {
        List<State> parsedStateList = new ArrayList<>();

        return parseCsv(inputStream, parsedStateList, State.class);
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

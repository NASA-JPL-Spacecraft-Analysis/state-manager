package gov.nasa.jpl.fspa.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import gov.nasa.jpl.fspa.model.StateEnumerationUpload;
import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * TODO: Implement these methods as we need to use json importing.
 */
public class JsonParseServiceImpl implements FileParseService {
    @Override
    public <T> String output(List<T> objectList, Class<T> type) {
        return null;
    }

    @Override
    public List<InformationTypes> parseInformationTypes(InputStream inputStream) {
        return null;
    }

    @Override
    public List<StateEnumerationUpload> parseStateEnumerations(InputStream inputStream) {
        List<StateEnumerationUpload> parsedStateEnumerationUploadList = new ArrayList<>();

        return parseJson(inputStream, parsedStateEnumerationUploadList, new TypeToken<List<StateEnumerationUpload>>(){}.getType());
    }

    @Override
    public List<StateVariable> parseStateVariables(InputStream inputStream) {
        List<StateVariable> parsedStateVariables = new ArrayList<>();

        return parseJson(inputStream, parsedStateVariables, new TypeToken<List<StateVariable>>(){}.getType());
    }

    /**
     * Generic json to object parser.
     * Will only parse into existing classes we have defined.
     * @param <T> The type we want to parse into.
     * @param inputStream The inputStream from the uploaded .json file.
     * @param parsedItems The list we want to parse the items into.
     * @param type The type we want to parse into.
     * @return The list of parsed items.
     */
    private <T> List<T> parseJson(InputStream inputStream, List<T> parsedItems, Type type) {
        try {
            Reader reader = new InputStreamReader(inputStream);
            Gson gson = new Gson();
            parsedItems = gson.fromJson(reader, type);

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return parsedItems;
    }
}

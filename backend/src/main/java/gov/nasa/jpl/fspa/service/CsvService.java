package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.EnumerationCsv;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.io.InputStream;
import java.util.List;

public interface CsvService {
    <T> String outputAsCsv(List<T> objectList, Class<T> type);

    List<EnumerationCsv> parseStateEnumerations(InputStream inputStream);

    List<StateVariable> parseStateVariables(InputStream inputStream);
}

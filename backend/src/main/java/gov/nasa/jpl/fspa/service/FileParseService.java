package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.*;

import java.io.InputStream;
import java.util.List;

public interface FileParseService {
    <T> String output(List<T> objectList, Class<T> type);

    List<Event> parseEvents(InputStream inputStream);

    List<InformationTypesUpload> parseInformationTypes(InputStream inputStream);

    List<StateEnumerationUpload> parseStateEnumerations(InputStream inputStream);

    List<RelationshipUpload> parseRelationships(InputStream inputStream);

    List<StateVariable> parseStateVariables(InputStream inputStream);
}

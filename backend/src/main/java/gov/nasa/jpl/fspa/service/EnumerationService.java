package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateEnumerationUpload;
import gov.nasa.jpl.fspa.model.StateEnumeration;

import java.util.List;
import java.util.Map;

public interface EnumerationService {
    List<StateEnumeration> convertEnumerationCsvToEnumeration(List<StateEnumerationUpload> stateEnumerationUploadList, Map<String, Integer> identifierToVariableIdMap);

    List<String> invalidIdentifierCheck(List<StateEnumerationUpload> stateEnumerationUploadList, Map<String, Integer> identifierToVariableIdMap);
}

package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.EnumerationCsv;
import gov.nasa.jpl.fspa.model.StateEnumeration;

import java.util.List;
import java.util.Map;

public interface EnumerationService {
    List<StateEnumeration> convertEnumerationCsvToEnumeration(List<EnumerationCsv> enumerationCsvList, Map<String, Integer> identifierToVariableIdMap);

    List<String> invalidIdentifierCheck(List<EnumerationCsv> enumerationCsvList, Map<String, Integer> identifierToVariableIdMap);
}

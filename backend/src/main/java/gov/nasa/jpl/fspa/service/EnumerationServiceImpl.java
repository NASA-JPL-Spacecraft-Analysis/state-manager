package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.EnumerationCsv;
import gov.nasa.jpl.fspa.model.StateEnumeration;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EnumerationServiceImpl implements EnumerationService {
    public List<StateEnumeration> convertEnumerationCsvToEnumeration(List<EnumerationCsv> enumerationCsvList, Map<String, Integer> identifierToVariableIdMap) {
        List<StateEnumeration> enumerations = new ArrayList<>();

        for (EnumerationCsv enumerationCsv: enumerationCsvList) {
            StateEnumeration enumeration = new StateEnumeration();

            enumeration.setStateVariableId(identifierToVariableIdMap.get(enumerationCsv.getIdentifier()));
            enumeration.setLabel(enumerationCsv.getLabel());
            enumeration.setValue(enumerationCsv.getValue());

            enumerations.add(enumeration);
        }

        return enumerations;
    }

    public List<String> invalidIdentifierCheck(List<EnumerationCsv> enumerationCsvList, Map<String, Integer> identifierToVariableIdMap) {
        List<String> invalidIdentifierList = new ArrayList<>();

        for (EnumerationCsv enumerationCsv: enumerationCsvList) {
            if (identifierToVariableIdMap.get(enumerationCsv.getIdentifier()) == null) {
                invalidIdentifierList.add(enumerationCsv.getIdentifier());
            }
        }

        return invalidIdentifierList;
    }
}

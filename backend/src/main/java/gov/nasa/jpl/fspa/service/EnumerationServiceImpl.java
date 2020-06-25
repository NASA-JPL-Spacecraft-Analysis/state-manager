package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateEnumerationUpload;
import gov.nasa.jpl.fspa.model.StateEnumeration;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EnumerationServiceImpl implements EnumerationService {
    public List<StateEnumeration> convertEnumerationCsvToEnumeration(List<StateEnumerationUpload> stateEnumerationUploadList, Map<String, Integer> identifierToVariableIdMap) {
        List<StateEnumeration> enumerations = new ArrayList<>();

        for (StateEnumerationUpload stateEnumerationUpload: stateEnumerationUploadList) {
            StateEnumeration enumeration = new StateEnumeration();

            enumeration.setStateId(identifierToVariableIdMap.get(stateEnumerationUpload.getStateIdentifier()));
            enumeration.setLabel(stateEnumerationUpload.getLabel());
            enumeration.setValue(stateEnumerationUpload.getValue());

            enumerations.add(enumeration);
        }

        return enumerations;
    }

    public List<String> invalidIdentifierCheck(List<StateEnumerationUpload> stateEnumerationUploadList, Map<String, Integer> identifierToVariableIdMap) {
        List<String> invalidIdentifierList = new ArrayList<>();

        for (StateEnumerationUpload stateEnumerationUpload: stateEnumerationUploadList) {
            if (identifierToVariableIdMap.get(stateEnumerationUpload.getStateIdentifier()) == null) {
                invalidIdentifierList.add(stateEnumerationUpload.getStateIdentifier());
            }
        }

        return invalidIdentifierList;
    }
}

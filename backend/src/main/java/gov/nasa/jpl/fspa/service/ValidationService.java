package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.*;

import java.util.List;
import java.util.Map;

public interface ValidationService {
    boolean hasInvalidRelationships(Map<String, Integer> eventIdentifierMap, List<RelationshipUpload> relationshipList, Map<String, Integer> stateVariableMap,
                                    Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap);

    boolean hasInvalidStates(List<State> stateList);

    List<String> getDuplicateIdentifiers(List<State> stateList, Map<String, Integer> identifierMap);

    List<String> validateInformationTypes(List<InformationTypesUpload> informationTypesUploadList);
}

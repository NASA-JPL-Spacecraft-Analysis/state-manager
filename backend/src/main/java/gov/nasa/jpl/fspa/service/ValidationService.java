package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.*;

import java.util.List;
import java.util.Map;

public interface ValidationService {
    boolean hasInvalidRelationships(List<RelationshipUpload> relationshipList, Map<String, Integer> stateVariableMap,
                                    Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap);

    boolean hasInvalidStateVariables(List<StateVariable> stateVariableList);

    List<String> getDuplicateIdentifiers(List<StateVariable> stateVariableList, Map<String, Integer> identifierMap);

    List<String> validateInformationTypes(List<InformationTypesUpload> informationTypesUploadList);
}

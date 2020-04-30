package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;
import java.util.Map;

public interface ValidationService {
    boolean hasInvalidRelationships(List<Relationship> relationshipList,
                                    Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesEnumMap);

    boolean hasInvalidStateVariables(List<StateVariable> stateVariableList);

    List<String> getDuplicateIdentifiers(List<StateVariable> stateVariableList, Map<String, Integer> identifierMap);

    List<Relationship> validateRelationships(List<Relationship> relationshipList, Map<Integer, StateVariable> stateVariableMap,
                                             Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesEnumMap);
}

package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;
import java.util.Map;

public interface ValidationService {
    boolean hasInvalidStateVariables(List<StateVariable> stateVariableList);

    List<String> getDuplicateIdentifiers(List<StateVariable> stateVariableList, Map<String, Integer> identifierMap);
}

package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ValidationServiceImpl implements ValidationService {
    public boolean hasInvalidStateVariables(List<StateVariable> stateVariableList) {
        for (StateVariable stateVariable: stateVariableList) {
            if (isPropertyInvalid(stateVariable.getIdentifier())
                || isPropertyInvalid(stateVariable.getDisplayName())
                || isPropertyInvalid(stateVariable.getType())
                || isPropertyInvalid(stateVariable.getUnits())
                || isPropertyInvalid(stateVariable.getSource())
                || isPropertyInvalid(stateVariable.getSubsystem())) {
                return true;
           }
        }

        return false;
    }

    /**
     * Checks for duplicate identifiers for a given list of state variables..
     * @param stateVariableList The new list of state variables we are checking for duplicates.
     * @param identifierMap The list of current identifiers to check against.
     * @return A list of the duplicate identifiers.
     */
    public List<String> getDuplicateIdentifiers(List<StateVariable> stateVariableList, Map<String, Integer> identifierMap) {
        List<String> duplicateIdentifiers = new ArrayList<>();

        for (StateVariable stateVariable: stateVariableList) {
            if (identifierMap.get(stateVariable.getIdentifier()) != null
                    && !identifierMap.get(stateVariable.getIdentifier()).equals(stateVariable.getId())) {
                duplicateIdentifiers.add(stateVariable.getIdentifier());
            }
        }

        return duplicateIdentifiers;
    }

    private boolean isPropertyInvalid(String property) {
        return property == null || property.equals("");
    }
}

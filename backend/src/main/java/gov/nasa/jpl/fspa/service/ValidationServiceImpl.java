package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.*;

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
     * Checks for duplicate identifiers for a given list of state variables.
     * @param stateVariableList The new list of state variables we are checking for duplicates.
     * @param identifierMap The list of current identifiers to check against.
     * @return A list of the duplicate identifiers.
     */
    public List<String> getDuplicateIdentifiers(List<StateVariable> stateVariableList, Map<String, Integer> identifierMap) {
        List<String> duplicateIdentifiers = new ArrayList<>();
        Set<String> uploadedIdentifierSet = new HashSet<>();


        // Check the existing identifiers we have.
        for (StateVariable stateVariable: stateVariableList) {
            String currentIdentifier = stateVariable.getIdentifier();

            // Check the uploaded state variables first and make sure the user didn't upload the same identifier more than once.
            if (uploadedIdentifierSet.contains(currentIdentifier)) {
                duplicateIdentifiers.add(currentIdentifier);
            }

            if (identifierMap.get(currentIdentifier) != null
                    && !identifierMap.get(currentIdentifier).equals(stateVariable.getId())) {
                duplicateIdentifiers.add(currentIdentifier);
            }

            uploadedIdentifierSet.add(currentIdentifier);
        }

        return duplicateIdentifiers;
    }

    private boolean isPropertyInvalid(String property) {
        return property == null || property.equals("");
    }
}

package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.*;

public class ValidationServiceImpl implements ValidationService {
    /**
     * Checks each relationship to see if each field is valid.
     * @param relationshipList The relationships we are checking.
     * @param informationTypesEnumMap The enum map so we can see if the user is trying to create an invalid type.
     * @return True if there's an invalid relationship, otherwise false.
     */
    @Override
    public boolean hasInvalidRelationships(List<Relationship> relationshipList,
                                            Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesEnumMap) {
        for (Relationship relationship: relationshipList) {
            if (isPropertyInvalid(relationship.getDisplayName())
                    || (relationship.getSubjectType() == null || informationTypesEnumMap.get(relationship.getSubjectType()) == null)
                    || relationship.getSubjectTypeId() == null
                    || (relationship.getTargetType() == null || informationTypesEnumMap.get(relationship.getTargetType()) == null)
                    || relationship.getTargetTypeId() == null) {
                return true;
            }
        }

        return false;
    }

    @Override
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
    @Override
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

    /**
     * Looks at each relationship, and ensures that they are tied to valid states or information types.
     * @param relationshipList The provided relationships.
     * @param stateVariableMap the map of state variables.
     * @param informationTypesEnumMap The map of information types.
     * @return A list of invalid relationships.
     */
    @Override
    public List<Relationship> validateRelationships(List<Relationship> relationshipList, Map<Integer, StateVariable> stateVariableMap,
                                                    Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesEnumMap) {
        List<Relationship> invalidRelationshipList = new ArrayList<>();

        for (Relationship relationship: relationshipList) {
            // Check the subject type, it's either a state or information type.
            if (relationship.getSubjectType().equals(InformationTypesEnum.State)) {
                if (stateVariableMap.get(relationship.getSubjectTypeId()) == null) {
                    invalidRelationshipList.add(relationship);
                }
            } else {
                Map<Integer, InformationTypes> subjectMap = informationTypesEnumMap.get(relationship.getSubjectType());

                if (subjectMap.get(relationship.getSubjectTypeId()) == null) {
                    invalidRelationshipList.add(relationship);
                }
            }

            // Check the target type, it's either a state or information type.
            if (relationship.getTargetType().equals(InformationTypesEnum.State)) {
                if (stateVariableMap.get(relationship.getTargetTypeId()) == null) {
                    invalidRelationshipList.add(relationship);
                }
            } else {
                Map<Integer, InformationTypes> targetMap = informationTypesEnumMap.get(relationship.getTargetType());

                if (targetMap.get(relationship.getTargetTypeId()) == null) {
                    invalidRelationshipList.add(relationship);
                }
            }
        }

        return invalidRelationshipList;
    }

    private boolean isPropertyInvalid(String property) {
        return property == null || property.equals("");
    }
}

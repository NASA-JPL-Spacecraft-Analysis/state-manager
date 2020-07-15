package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.*;

import java.util.*;

public class ValidationServiceImpl implements ValidationService {
    /**
     * Checks each relationship to see if each field is valid.
     * @param eventIdentifierMap A map of identifiers to ids for events.
     * @param relationshipList The relationships we are checking.
     * @param informationTypesEnumMap The enum map so we can see if the user is trying to create an invalid type.
     * @return True if there's an invalid relationship, otherwise false.
     */
    @Override
    public boolean hasInvalidRelationships(Map<String, Integer> eventIdentifierMap, List<RelationshipUpload> relationshipList, Map<String, Integer> stateVariableMap,
                                            Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap) {
        for (RelationshipUpload relationshipUpload: relationshipList) {
            // Check required properties first.
            if (isPropertyInvalid(relationshipUpload.getDisplayName())) {
                return true;
            }

            if ((relationshipUpload.getSubjectType() == null ||
                    isRelationshipInvalid(relationshipUpload.getSubjectType(), relationshipUpload.getSubjectIdentifier(),
                            stateVariableMap, eventIdentifierMap, informationTypesEnumMap))
                || (relationshipUpload.getTargetType() == null ||
                    isRelationshipInvalid(relationshipUpload.getTargetType(), relationshipUpload.getTargetIdentifier(),
                            stateVariableMap, eventIdentifierMap, informationTypesEnumMap))) {
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean hasInvalidStates(List<State> stateList) {
        for (State state: stateList) {
            if (isPropertyInvalid(state.getIdentifier())
                || isPropertyInvalid(state.getDisplayName())
                || isPropertyInvalid(state.getType())
                || isPropertyInvalid(state.getUnits())
                || isPropertyInvalid(state.getSource())
                || isPropertyInvalid(state.getSubsystem())) {
                return true;
           }
        }

        return false;
    }

    /**
     * Checks for duplicate identifiers for a given list of items.
     * @param itemList The list of items we're checking the identifiers of.
     * @param identifierMap The list of current identifiers to check against.
     * @return A list of the duplicate identifiers.
     */
    @Override
    public <T extends IdentifierType> List<String> getDuplicateIdentifiers(List<T> itemList, Map<String, Integer> identifierMap) {
        List<String> duplicateIdentifiers = new ArrayList<>();
        Set<String> uploadedIdentifierSet = new HashSet<>();

        // Check the existing identifiers we have.
        for (IdentifierType item: itemList) {
            String currentIdentifier = item.getIdentifier();

            // Check the uploaded state variables first and make sure the user didn't upload the same identifier more than once.
            if (uploadedIdentifierSet.contains(currentIdentifier)) {
                duplicateIdentifiers.add(currentIdentifier);
            }

            if (identifierMap.get(currentIdentifier) != null
                    && !identifierMap.get(currentIdentifier).equals(item.getId())) {
                duplicateIdentifiers.add(currentIdentifier);
            }

            uploadedIdentifierSet.add(currentIdentifier);
        }

        return duplicateIdentifiers;
    }

    /**
     * Looks at each information type and checks to make sure the type provided is valid inside our {@link InformationTypesEnum}.
     * @param informationTypesUploadList The uploaded information types.
     * @return A list of the invalid upload information types.
     */
    @Override
    public List<String> validateInformationTypes(List<InformationTypesUpload> informationTypesUploadList) {
        List<String> invalidInformationTypesList = new ArrayList<>();
        Set<String> informationTypesEnumMap = new HashSet<>();

        for (InformationTypesEnum informationTypesEnum: InformationTypesEnum.values()) {
            informationTypesEnumMap.add(informationTypesEnum.name());
        }

        for (InformationTypesUpload informationTypesUpload: informationTypesUploadList) {
            if (!informationTypesEnumMap.contains(informationTypesUpload.getInformationType())) {
                invalidInformationTypesList.add(informationTypesUpload.getInformationType());
            }
        }

        return invalidInformationTypesList;
    }


    private boolean isPropertyInvalid(String property) {
        return property == null || property.equals("");
    }

    /**
     * Checks a state or information type to make sure it's valid.
     * TODO: Currently this check is case sensitive for identifiers and types. Do we want to eventually allow the user to upload
     * case insensitive types and identifiers?
     * TODO: Check and make sure we're not doing a circular relationship?
     * @param type The type we're checking.
     * @param identifier The identifier of the uploaded item we're checking.
     * @param stateVariableMap A map of state identifiers to their ids.
     * @param informationTypesEnumMap A map of information types to information type identifiers.
     * @return True if the relationship is invalid, otherwise false.
     */
    private boolean isRelationshipInvalid(String type, String identifier, Map<String, Integer> stateVariableMap,
            Map<String, Integer> eventIdentifierMap, Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap) {
        if (type != null && identifier != null) {
            // If we have a state, check and make sure it's valid.
            if (InformationTypesEnum.valueOf(type) == InformationTypesEnum.State) {
                return stateVariableMap.get(identifier) == null;
            } else if (InformationTypesEnum.valueOf(type) == InformationTypesEnum.Event) {
                return eventIdentifierMap.get(identifier) == null;
            } else if (informationTypesEnumMap.get(InformationTypesEnum.valueOf(type)) != null) {
                // Otherwise we have an information type, so check and make sure that's valid.
                return informationTypesEnumMap.get(InformationTypesEnum.valueOf(type)).get(identifier) == null;
            }
        }

        return true;
    }
}

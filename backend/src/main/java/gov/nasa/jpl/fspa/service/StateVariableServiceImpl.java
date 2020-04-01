package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.RelationshipDao;
import gov.nasa.jpl.fspa.dao.RelationshipDaoImpl;
import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.*;

import java.util.*;

public class StateVariableServiceImpl implements StateVariableService {
    private final CsvServiceImpl outputService;
    private final RelationshipDao relationshipDao;
    private final StateVariableDao stateVariableDao;

    public StateVariableServiceImpl() {
        this.outputService = new CsvServiceImpl();
        this.relationshipDao = new RelationshipDaoImpl();
        this.stateVariableDao = new StateVariableDaoImpl();
    }

    /**
     * Checks for duplicate identifiers.
     * @param stateVariables The new list of state variables we are checking for duplicates.
     * @return A list of the duplicate identifiers.
     */
    public List<String> getDuplicateIdentifiers(List<StateVariable> stateVariables) {
        List<String> duplicateIdentifiers = new ArrayList<>();
        Map<String, Integer> mappedIdentifiers = getMappedIdentifiers();

        for (StateVariable stateVariable: stateVariables) {
            if (mappedIdentifiers.get(stateVariable.getIdentifier()) != null
                    && !mappedIdentifiers.get(stateVariable.getIdentifier()).equals(stateVariable.getId())) {
                duplicateIdentifiers.add(stateVariable.getIdentifier());
            }
        }

        return duplicateIdentifiers;
    }

    @Override
    public Map<Integer, Relationship> getRelationships() {
        List<Relationship> relationships = relationshipDao.getRelationships();
        Map<Integer, Relationship> relationshipMap = new HashMap<>();

        for (Relationship relationship: relationships) {
            relationshipMap.put(relationship.getId(), relationship);
        }

        return relationshipMap;
    }

    @Override
    public Map<Integer, RelationshipHistory> getRelationshipHistory() {
        List<RelationshipHistory> relationshipHistoryList = relationshipDao.getRelationshipHistory();
        Map<Integer, RelationshipHistory> relationshipHistoryMap = new HashMap<>();

        for (RelationshipHistory relationshipHistory: relationshipHistoryList) {
            relationshipHistoryMap.put(relationshipHistory.getId(), relationshipHistory);
        }

        return relationshipHistoryMap;
    }

    @Override
    public Map<Integer, List<StateEnumeration>> getStateEnumerations() {
        return mapEnumerations(stateVariableDao.getStateEnumerations());
    }

    @Override
    public Map<Integer, StateHistory> getStateHistory() {
        List<StateHistory> stateHistoryList = stateVariableDao.getStateHistory();
        Map<Integer, StateHistory> stateHistoryMap = new HashMap<>();

        for (StateHistory stateHistory: stateHistoryList) {
            stateHistoryMap.put(stateHistory.getId(), stateHistory);
        }

        return stateHistoryMap;
    }

    /**
     * Gets our state variables sets their list of enumerations if they exist.
     * @return The list of state variables with their enumerations.
     */
    @Override
    public Map<Integer, StateVariable> getStateVariables() {
        return mapStateVariables(stateVariableDao.getStateVariables());
    }

    @Override
    public String getStateVariablesAsCsv() {
        return outputService.outputAsCsv(stateVariableDao.getStateVariables(), StateVariable.class);
    }

    @Override
    public Map<Integer, StateVariable> mapStateVariables(List<StateVariable> stateVariables) {
        Map<Integer, StateVariable> stateVariableMap = new HashMap<>();

        for (StateVariable stateVariable: stateVariables) {
            stateVariableMap.put(stateVariable.getId(), stateVariable);
        }

        return stateVariableMap;
    }

    @Override
    public Relationship modifyRelationship(Relationship relationship) {
        return relationshipDao.saveRelationship(relationship);
    }

    @Override
    public StateVariable modifyStateVariable(StateVariable stateVariable) {
        List<StateVariable> stateVariables = new ArrayList<>();

        stateVariables.add(stateVariable);

        List<String> duplicateIdentifiers = getDuplicateIdentifiers(stateVariables);

        if (duplicateIdentifiers.isEmpty()) {
            return stateVariableDao.createStateVariable(stateVariable);
        }

        return null;
    }

    @Override
    public Map<String, Integer> getMappedIdentifiers() {
        Map<String, Integer> mappedIdentifiers = new HashMap<>();
        List<Identifier> identifiers = stateVariableDao.getIdentifiers();

        for (Identifier identifier: identifiers) {
            mappedIdentifiers.put(identifier.getIdentifier(), identifier.getStateVariableId());
        }

        return mappedIdentifiers;
    }

    @Override
    public List<String> getIdentifiers() {
        List<String> identifiers = new ArrayList<>();
        List<Identifier> idIdentifiers = stateVariableDao.getIdentifiers();

        for (Identifier identifier: idIdentifiers) {
            identifiers.add(identifier.getIdentifier());
        }

        return identifiers;
    }

    /**
     * This method processes the posted set of enumerations for a given state variable.
     * It figures out which enumerations to delete, create, and update based on IDs and what enumerations aren't
     * included in the posted list.
     * @param stateVariableId The grouping of enums we're going to modify.
     * @param stateEnumerations The new list of enumerations we're going to create / update.
     * @return The final list of enumerations for a given state variable.
     */
    @Override
    public List<StateEnumeration> saveStateEnumerations(int stateVariableId, List<StateEnumeration> stateEnumerations) {
        List<StateEnumeration> currentStateEnumerationList = stateVariableDao.getStateEnumerationsByStateVariableId(stateVariableId);
        List<StateEnumeration> stateEnumerationsToSave = new ArrayList<>();
        List<StateEnumeration> stateEnumerationsToUpdate = new ArrayList<>();
        Map<Integer, StateEnumeration> currentStateEnumerationMap = new HashMap<>();

        // Create a map of our current state enumerations so we know what to delete as we look at the changes.
        for (StateEnumeration currentStateEnumeration: currentStateEnumerationList) {
            currentStateEnumerationMap.put(currentStateEnumeration.getId(), currentStateEnumeration);
        }

        for (StateEnumeration stateEnumeration: stateEnumerations) {
            stateEnumeration.setStateVariableId(stateVariableId);

            if (stateEnumeration.getId() == null) {
                stateEnumerationsToSave.add(stateEnumeration);
            } else {
                // Remove any ids we come across, so we're left with a map of enumerations to delete.
                currentStateEnumerationMap.remove(stateEnumeration.getId());
                stateEnumerationsToUpdate.add(stateEnumeration);
            }
        }

        stateVariableDao.deleteStateEnumerations(currentStateEnumerationMap.values());
        stateVariableDao.saveStateEnumerations(stateEnumerationsToSave);
        stateVariableDao.updateStateEnumerations(stateEnumerationsToUpdate);

        return stateVariableDao.getStateEnumerations();
    }

    @Override
    public Map<Integer, StateVariable> saveStateVariables(List<StateVariable> stateVariables) {
        List<StateVariable> savedStateVariables = new ArrayList<>();

        for (StateVariable stateVariable: stateVariables) {
            savedStateVariables.add(stateVariableDao.createStateVariable(stateVariable));
        }

        return mapStateVariables(savedStateVariables);
    }

    @Override
    public Map<Integer, List<StateEnumeration>> saveUploadedEnumerations(List<StateEnumeration> enumerations) {
        stateVariableDao.saveStateEnumerations(enumerations);

        return mapEnumerations(enumerations);
    }

    private Map<Integer, List<StateEnumeration>> mapEnumerations(List<StateEnumeration> enumerations) {
        Map<Integer, List<StateEnumeration>> enumerationMap = new HashMap<>();

        for (StateEnumeration stateEnumeration: enumerations) {
            if (enumerationMap.get(stateEnumeration.getStateVariableId()) == null) {
                enumerationMap.put(stateEnumeration.getStateVariableId(), new ArrayList<StateEnumeration>());
            }

            enumerationMap.get(stateEnumeration.getStateVariableId()).add(stateEnumeration);
        }

        return enumerationMap;
    }
}

package gov.nasa.jpl.fspa.states.service;

import gov.nasa.jpl.fspa.states.dao.StateDao;
import gov.nasa.jpl.fspa.states.dao.StateDaoImpl;
import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.service.CsvParseServiceImpl;
import gov.nasa.jpl.fspa.service.ValidationService;
import gov.nasa.jpl.fspa.service.ValidationServiceImpl;

import java.util.*;

public class StateServiceImpl implements StateService {
    private final CsvParseServiceImpl outputService;
    private final StateDao stateDao;
    private final ValidationService validationService;

    public StateServiceImpl() {
        outputService = new CsvParseServiceImpl();
        stateDao = new StateDaoImpl();
        validationService = new ValidationServiceImpl();
    }

    @Override
    public Map<Integer, List<StateEnumeration>> getStateEnumerations(int collectionId) {
        return mapEnumerations(stateDao.getStateEnumerations(collectionId));
    }

    @Override
    public Map<Integer, StateHistory> getStateHistory(int collectionId) {
        List<StateHistory> stateHistoryList = stateDao.getStateHistory(collectionId);
        Map<Integer, StateHistory> stateHistoryMap = new HashMap<>();

        for (StateHistory stateHistory: stateHistoryList) {
            stateHistoryMap.put(stateHistory.getId(), stateHistory);
        }

        return stateHistoryMap;
    }

    /**
     * Gets our states and sets their list of enumerations if they exist.
     * @return The list of states with their enumerations.
     */
    @Override
    public Map<Integer, State> getStateMap(int collectionId) {
        return mapStates(stateDao.getStates(collectionId));
    }

    @Override
    public String getStatesAsCsv(int collectionId) {
        return outputService.output(stateDao.getStates(collectionId), State.class);
    }

    @Override
    public Map<Integer, State> mapStates(List<State> stateList) {
        Map<Integer, State> stateMap = new HashMap<>();

        for (State state : stateList) {
            stateMap.put(state.getId(), state);
        }

        return stateMap;
    }

    @Override
    public State modifyState(int collectionId, State state) {
        List<State> stateList = new ArrayList<>();

        stateList.add(state);

        List<String> duplicateIdentifiers = validationService.getDuplicateIdentifiers(stateList, getMappedIdentifiers(collectionId));

        if (duplicateIdentifiers.isEmpty()) {
            return stateDao.createState(collectionId, state);
        }

        return null;
    }

    @Override
    public Map<String, Integer> getMappedIdentifiers(int collectionId) {
        Map<String, Integer> mappedIdentifiers = new HashMap<>();
        List<Identifier> identifiers = stateDao.getStateIdentifiers(collectionId);

        for (Identifier identifier: identifiers) {
            mappedIdentifiers.put(identifier.getIdentifier(), identifier.getItemId());
        }

        return mappedIdentifiers;
    }

    @Override
    public List<String> getStateIdentifiers(int collectionId) {
        List<String> stateIdentifierList = new ArrayList<>();
        List<Identifier> identifierList = stateDao.getStateIdentifiers(collectionId);

        for (Identifier identifier: identifierList) {
            stateIdentifierList.add(identifier.getIdentifier());
        }

        return stateIdentifierList;
    }

    /**
     * This method processes the posted set of enumerations for a given state.
     * It figures out which enumerations to delete, create, and update based on IDs and what enumerations aren't
     * included in the posted list.
     * @param stateId The grouping of enums we're going to modify.
     * @param stateEnumerations The new list of enumerations we're going to create / update.
     * @return The final list of enumerations for a given state.
     */
    @Override
    public List<StateEnumeration> saveStateEnumerations(int collectionId, int stateId, List<StateEnumeration> stateEnumerations) {
        List<StateEnumeration> currentStateEnumerationList = stateDao.getStateEnumerationsByStateId(stateId);
        List<StateEnumeration> stateEnumerationsToSave = new ArrayList<>();
        List<StateEnumeration> stateEnumerationsToUpdate = new ArrayList<>();
        Map<Integer, StateEnumeration> currentStateEnumerationMap = new HashMap<>();

        // Create a map of our current state enumerations so we know what to delete as we look at the changes.
        for (StateEnumeration currentStateEnumeration: currentStateEnumerationList) {
            currentStateEnumerationMap.put(currentStateEnumeration.getId(), currentStateEnumeration);
        }

        for (StateEnumeration stateEnumeration: stateEnumerations) {
            stateEnumeration.setCollectionId(collectionId);
            stateEnumeration.setStateId(stateId);

            if (stateEnumeration.getId() == null) {
                stateEnumerationsToSave.add(stateEnumeration);
            } else {
                // Remove any ids we come across, so we're left with a map of enumerations to delete.
                currentStateEnumerationMap.remove(stateEnumeration.getId());
                stateEnumerationsToUpdate.add(stateEnumeration);
            }
        }

        stateDao.deleteStateEnumerations(currentStateEnumerationMap.values());
        stateDao.saveStateEnumerations(stateEnumerationsToSave);
        stateDao.updateStateEnumerations(stateEnumerationsToUpdate);

        return stateDao.getStateEnumerations(collectionId);
    }

    @Override
    public Map<Integer, State> saveStates(int collectionId, List<State> stateList) {
        List<State> savedStateList = new ArrayList<>();

        for (State state : stateList) {
            savedStateList.add(stateDao.createState(collectionId, state));
        }

        return mapStates(savedStateList);
    }

    @Override
    public Map<Integer, List<StateEnumeration>> saveUploadedEnumerations(List<StateEnumeration> enumerations) {
        stateDao.saveStateEnumerations(enumerations);

        return mapEnumerations(enumerations);
    }

    private Map<Integer, List<StateEnumeration>> mapEnumerations(List<StateEnumeration> enumerations) {
        Map<Integer, List<StateEnumeration>> enumerationMap = new HashMap<>();

        for (StateEnumeration stateEnumeration: enumerations) {
            if (enumerationMap.get(stateEnumeration.getStateId()) == null) {
                enumerationMap.put(stateEnumeration.getStateId(), new ArrayList<StateEnumeration>());
            }

            enumerationMap.get(stateEnumeration.getStateId()).add(stateEnumeration);
        }

        return enumerationMap;
    }
}

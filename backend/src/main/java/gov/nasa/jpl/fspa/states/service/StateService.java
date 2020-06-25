package gov.nasa.jpl.fspa.states.service;

import gov.nasa.jpl.fspa.model.*;

import java.util.List;
import java.util.Map;

public interface StateService {
    /**
     * Gets our state enumerations by collectionId.
     * @param collectionId The collection we're looking at.
     * @return A map of ids to state enumerations.
     */
    Map<Integer, List<StateEnumeration>> getStateEnumerations(int collectionId);

    Map<Integer, StateHistory> getStateHistory(int collectionId);

    /**
     * Gets all our states by collectionId.
     * @return A map of ids to states.
     */
    Map<Integer, State> getStateMap(int collectionId);

    /**
     * Takes a new or existing state variable that should be created or updated.
     * @param state The updated / new state variable.
     * @return The entire list of state variables.
     */
    State modifyState(int collectionId, State state);

    String getStatesAsCsv(int collectionId);

    Map<Integer, State> mapStates(List<State> stateList);

    Map<String, Integer> getMappedIdentifiers(int collectionId);

    List<String> getStateIdentifiers(int collectionId);

    List<StateEnumeration> saveStateEnumerations(int collectionId, int stateVariableId, List<StateEnumeration> stateEnumerations);

    Map<Integer, State> saveStates(int collectionId, List<State> stateList);

    Map<Integer, List<StateEnumeration>> saveUploadedEnumerations(List<StateEnumeration> enumerations);
}

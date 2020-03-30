package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.RelationshipHistory;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;
import java.util.Map;

public interface StateVariableService {
    List<String> getDuplicateIdentifiers(List<StateVariable> stateVariables);

    Map<Integer, Relationship> getRelationships();

    Map<Integer, RelationshipHistory> getRelationshipHistory();

    /**
     * Gets all our state enumerations.
     * @return A map of ids to state enumerations.
     */
    Map<Integer, List<StateEnumeration>> getStateEnumerations();

    /**
     * Gets all our state variables.
     * @return A map of ids to state variables.
     */
    Map<Integer, StateVariable> getStateVariables();

    Relationship modifyRelationship(Relationship relationship);


    /**
     * Takes a new or existing state variable that should be created or updated.
     * @param stateVariable The updated / new state variable.
     * @return The entire list of state variables.
     */
    StateVariable modifyStateVariable(StateVariable stateVariable);

    String getStateVariablesAsCsv();

    Map<Integer, StateVariable> mapStateVariables(List<StateVariable> stateVariables);

    Map<String, Integer> getMappedIdentifiers();

    List<String> getIdentifiers();

    List<StateEnumeration> saveStateEnumerations(int stateVariableId, List<StateEnumeration> stateEnumerations);

    Map<Integer, StateVariable> saveStateVariables(List<StateVariable> stateVariables);

    Map<Integer, List<StateEnumeration>> saveUploadedEnumerations(List<StateEnumeration> enumerations);
}

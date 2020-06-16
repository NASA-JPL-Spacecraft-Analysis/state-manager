package gov.nasa.jpl.fspa.states.dao;

import gov.nasa.jpl.fspa.model.*;

import java.util.Collection;
import java.util.List;

public interface StateDao {
    List<State> getStates(int collectionId);

    /**
     * Creates a single {@link State}.
     * @param collectionId The id of the collection that we are creating the state inside.
     * @param state The state variable we are creating.
     * @return The id of the created state variable.
     */
    State createState(int collectionId, State state);

    List<StateEnumeration> getStateEnumerations(int collectionId);
    List<StateEnumeration> getStateEnumerationsByStateId(Integer id);

    List<StateHistory> getStateHistory(int collectionId);

    List<Identifier> getStateIdentifiers(int collectionId);

    void deleteStateEnumerations(Collection<StateEnumeration> stateEnumerations);
    void saveStateEnumerations(List<StateEnumeration> stateEnumerations);
    void updateStateEnumerations(List<StateEnumeration> stateEnumerations);
}

package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.*;

import java.util.Collection;
import java.util.List;

public interface StateVariableDao {
    List<StateVariable> getStateVariables();

    /**
     * Creates a single {@link StateVariable}.
     * @param stateVariable The state variable we are creating.
     * @return The id of the created state variable.
     */
    StateVariable createStateVariable(StateVariable stateVariable);

    List<StateEnumeration> getStateEnumerations();
    List<StateEnumeration> getStateEnumerationsByStateVariableId(Integer id);

    List<StateHistory> getStateHistory();

    List<Identifier> getIdentifiers();

    void deleteStateEnumerations(Collection<StateEnumeration> stateEnumerations);
    void saveStateEnumerations(List<StateEnumeration> stateEnumerations);
    void updateStateEnumerations(List<StateEnumeration> stateEnumerations);
}

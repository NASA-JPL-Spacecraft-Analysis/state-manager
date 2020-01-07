package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;

public interface StateVariableDao {
    List<StateVariable> getStateVariables();
    List<StateEnumeration> getStateEnumerations();

    /**
     * Creates a single {@link StateVariable}.
     * @param stateVariable The state variable we are creating.
     * @return The id of the created state variable.
     */
    int createStateVariable(StateVariable stateVariable);

    /**
     * Creates a list of {@link StateVariable}s.
     * @param stateVariables The list of state variables we are creating.
     */
    void createStateVariables(List<StateVariable> stateVariables);

    List<String> getIdentifiers();
}

package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;

public interface StateVariableDao {
    List<StateVariable> getStateVariables();
    int saveStateVariable(StateVariable stateVariable);
    void createStateVariables(List<StateVariable> stateVariables);

    List<String> getIdentifiers();
}

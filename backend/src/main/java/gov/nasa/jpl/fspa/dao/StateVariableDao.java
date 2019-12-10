package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;

public interface StateVariableDao {
    List<StateVariable> getStateVariables();
    int postStateVariable(StateVariable stateVariable);
}

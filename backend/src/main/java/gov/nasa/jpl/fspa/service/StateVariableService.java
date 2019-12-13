package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;

public interface StateVariableService {
    List<StateVariable> getStateVariables();
    List<StateVariable> modifyStateVariable(StateVariable stateVariable);
    String getStateVariablesAsCsv();

    List<String> getIdentifiers();
}

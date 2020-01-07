package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.List;

public interface StateVariableService {
    List<StateVariable> getStateVariables();

    /**
     * Gets all our state variables with their enumerations.
     * @return The list of state variables with enumerations.
     */
    List<StateVariable> getStateVariablesWithEnumerations();
    List<StateVariable> modifyStateVariable(StateVariable stateVariable);
    String createStateVariables(List<StateVariable> stateVariables);
    String getStateVariablesAsCsv();

    List<String> getIdentifiers();
}

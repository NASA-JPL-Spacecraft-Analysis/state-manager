package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.util.StateVariableConstants;

import java.util.*;

public class StateVariableServiceImpl implements StateVariableService {
    private final OutputServiceImpl<StateVariable> outputService;
    private final StateVariableDao stateVariableDao;

    public StateVariableServiceImpl() {
        this.outputService = new OutputServiceImpl<>(StateVariable.class);
        this.stateVariableDao = new StateVariableDaoImpl();
    }

    @Override
    public List<StateVariable> getStateVariables() {
        return stateVariableDao.getStateVariables();
    }

    /**
     * Gets our state variables sets their list of enumerations if they exist.
     * @return The list of state variables with their enumerations.
     */
    @Override
    public List<StateVariable> getStateVariablesWithEnumerations() {
        List<StateVariable> stateVariables = getStateVariables();
        List<StateEnumeration> stateEnumerations = stateVariableDao.getStateEnumerations();
        Map<Integer, List<StateEnumeration>> stateEnumerationMap = new HashMap<>();

        // Setup a map from state variable ids to a list of enumerations.
        for (StateEnumeration stateEnumeration: stateEnumerations) {
            if (stateEnumerationMap.get(stateEnumeration.getStateVariableId()) == null) {
                stateEnumerationMap.put(stateEnumeration.getStateVariableId(), new ArrayList<StateEnumeration>());
            }

            // Add our enumeration to the list.
            stateEnumerationMap.get(stateEnumeration.getStateVariableId()).add(stateEnumeration);
        }

        for (StateVariable stateVariable: stateVariables) {
            // If we have enumerations for a given state variable, set them.
            if (stateEnumerationMap.get(stateVariable.getId()) != null) {
                stateVariable.setEnumarations(stateEnumerationMap.get(stateVariable.getId()));
            }
        }

        return stateVariables;
    }

    @Override
    public String getStateVariablesAsCsv() {
        return outputService.outputAsCsv(this.getStateVariables());
    }

    @Override
    public List<StateVariable> modifyStateVariable(StateVariable stateVariable) {
        // TODO: Do a check here to make sure the identifier is unique.
        int id = stateVariableDao.createStateVariable(stateVariable);

        if (id != -1) {
            return getStateVariables();
        }

        return new ArrayList<>();
    }

    @Override
    public String createStateVariables(List<StateVariable> stateVariables) {
        List<String> identifiers = getIdentifiers();

        // If there's duplicate identifiers, respond with an error.
        if (containsDuplicateIdentifiers(stateVariables, identifiers)) {
            return StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE;
        }

        if (!containsDuplicateIdentifiers(stateVariables, identifiers)) {
            stateVariableDao.createStateVariables(stateVariables);
        }

        return "";
    }

    @Override
    public List<String> getIdentifiers() {
        return stateVariableDao.getIdentifiers();
    }

    /**
     * Checks for duplicate identifiers.
     * @param stateVariables The new list of state variables we are checking for duplicates.
     * @param identifiers The current list of identifiers we have.
     * @return True or false based on if we find a duplicate or not.
     */
    private boolean containsDuplicateIdentifiers(List<StateVariable> stateVariables, List<String> identifiers) {
        Set<String> identifierMap = new HashSet<>(identifiers);

        for (StateVariable stateVariable: stateVariables) {
            if (identifierMap.contains(stateVariable.getIdentifier())) {
                return true;
            }
        }

        return false;
    }
}

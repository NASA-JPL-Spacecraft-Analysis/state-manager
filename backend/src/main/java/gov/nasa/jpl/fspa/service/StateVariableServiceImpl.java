package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.util.StateVariableConstants;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Override
    public String getStateVariablesAsCsv() {
        return outputService.outputAsCsv(this.getStateVariables());
    }

    @Override
    public List<StateVariable> modifyStateVariable(StateVariable stateVariable) {
        // TODO: Do a check here to make sure the identifier is unique.
        int id = stateVariableDao.saveStateVariable(stateVariable);

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
     *
     * @param stateVariables
     * @param identifiers
     * @return
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

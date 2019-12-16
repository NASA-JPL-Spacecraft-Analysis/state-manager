package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.ArrayList;
import java.util.List;

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
    public List<String> getIdentifiers() {
        return stateVariableDao.getIdentifiers();
    }
}

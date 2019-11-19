package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.StateVariable;

import java.util.ArrayList;
import java.util.List;

public class StateVariableServiceImpl implements StateVariableService {
    private final StateVariableDao stateVariableDao;

    public StateVariableServiceImpl() {
        this.stateVariableDao = new StateVariableDaoImpl();
    }

    @Override
    public List<StateVariable> getStateVariables() {
        return stateVariableDao.getStateVariables();
    }

    @Override
    public List<StateVariable> postStateVariable(StateVariable stateVariable) {
        // TODO: Do a check here to make sure the identifier is unique.
        int id = stateVariableDao.postStateVariable(stateVariable);

        if (id != -1) {
            return getStateVariables();
        }

        return new ArrayList<>();
    }
}

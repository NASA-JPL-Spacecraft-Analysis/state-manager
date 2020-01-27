package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.StateVariableDao;
import gov.nasa.jpl.fspa.dao.StateVariableDaoImpl;
import gov.nasa.jpl.fspa.model.Identifier;
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
    public Map<Integer, StateEnumeration> getStateEnumerations() {
        List<StateEnumeration> stateEnumerations = stateVariableDao.getStateEnumerations();
        Map<Integer, StateEnumeration> stateEnumerationMap = new HashMap<>();

        for (StateEnumeration stateEnumeration: stateEnumerations) {
            stateEnumerationMap.put(stateEnumeration.getId(), stateEnumeration);
        }

        return stateEnumerationMap;
    }

    /**
     * Gets our state variables sets their list of enumerations if they exist.
     * @return The list of state variables with their enumerations.
     */
    @Override
    public Map<Integer, StateVariable> getStateVariables() {
        List<StateVariable> stateVariables = stateVariableDao.getStateVariables();
        List<StateEnumeration> stateEnumerations = stateVariableDao.getStateEnumerations();
        Map<Integer, StateVariable> stateVariableMap = new HashMap<>();

        for (StateVariable stateVariable: stateVariables) {
            stateVariableMap.put(stateVariable.getId(), stateVariable);
        }

        // Add our enumeration ids to our state variables.
        for (StateEnumeration stateEnumeration: stateEnumerations) {
            StateVariable currentStateVariable = stateVariableMap.get(stateEnumeration.getStateVariableId());

            if (currentStateVariable.getEnumerationIds() == null) {
                currentStateVariable.setEnumerationIds(new ArrayList<Integer>());
            }

            currentStateVariable.getEnumerationIds().add(stateEnumeration.getId());
        }

        return stateVariableMap;
    }

    @Override
    public String getStateVariablesAsCsv() {
        return outputService.outputAsCsv(stateVariableDao.getStateVariables());
    }

    @Override
    public StateVariable modifyStateVariable(StateVariable stateVariable) {
        List<StateVariable> stateVariables = new ArrayList<>();

        stateVariables.add(stateVariable);

        List<String> duplicateIdentifiers = getDuplicateIdentifiers(stateVariables);

        if (duplicateIdentifiers.isEmpty()) {
            return stateVariableDao.createStateVariable(stateVariable);
        }

        return null;
    }

    @Override
    public String createStateVariables(List<StateVariable> stateVariables) {
        List<String> duplicateIdentifiers = getDuplicateIdentifiers(stateVariables);

        if (duplicateIdentifiers.isEmpty()) {
            stateVariableDao.createStateVariables(stateVariables);
        } else {
            // If there's duplicate identifiers, respond with an error.
            return StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE_WITH_DUPLICATES + duplicateIdentifiers.toString();
        }

        return "";
    }

    @Override
    public List<String> getIdentifiers() {
        List<String> identifiers = new ArrayList<>();
        List<Identifier> idIdentifiers = stateVariableDao.getIdentifiers();

        for (Identifier identifier: idIdentifiers) {
            identifiers.add(identifier.getIdentifier());
        }

        return identifiers;
    }

    /**
     * Checks for duplicate identifiers.
     * @param stateVariables The new list of state variables we are checking for duplicates.
     * @return A list of the duplicate identifiers.
     */
    private List<String> getDuplicateIdentifiers(List<StateVariable> stateVariables) {
        List<Identifier> identifiers = stateVariableDao.getIdentifiers();
        List<String> duplicateIdentifiers = new ArrayList<>();
        Map<String, Integer> identifierMap = new HashMap<>();

        // Create our map of state variable ids to identifiers, and populate our identifiers set.
        for (Identifier identifier: identifiers) {
            identifierMap.put(identifier.getIdentifier(), identifier.getStateVariableId());
        }

        for (StateVariable stateVariable: stateVariables) {
            if (identifierMap.get(stateVariable.getIdentifier()) != null
                && !identifierMap.get(stateVariable.getIdentifier()).equals(stateVariable.getId())) {
                duplicateIdentifiers.add(stateVariable.getIdentifier());
            }
        }

        return duplicateIdentifiers;
    }
}

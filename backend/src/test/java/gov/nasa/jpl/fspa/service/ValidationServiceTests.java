package gov.nasa.jpl.fspa.service;

import static org.junit.Assert.*;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.StateVariable;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationServiceTests {
    @InjectMocks
    ValidationServiceImpl validationService;

    public Map<String, Integer> identifierMap;
    public Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesEnumMap;
    public List<Relationship> relationshipList;
    public List<StateVariable> stateVariableList;
    public Map<Integer, StateVariable> stateVariableMap;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Before
    public void before() {
        identifierMap = new HashMap<>();
        informationTypesEnumMap = new HashMap<>();
        relationshipList = new ArrayList<>();
        stateVariableList = new ArrayList<>();
        stateVariableMap = new HashMap<>();

        for (InformationTypesEnum informationTypesEnum: InformationTypesEnum.values()) {
            informationTypesEnumMap.put(informationTypesEnum, new HashMap<Integer, InformationTypes>());
        }
    }

    // hasInvalidStates

    @Test
    public void invalidStateVariables() {
        stateVariableList.add(new StateVariable());

        assertTrue(validationService.hasInvalidStateVariables(stateVariableList));
    }

    @Test
    public void validStateVariables() {
        StateVariable stateVariable = new StateVariable();
        stateVariable.setIdentifier("TEST");
        stateVariable.setDisplayName("Test Display Name");
        stateVariable.setType("Test Type");
        stateVariable.setUnits("Test Units");
        stateVariable.setSource("Test Source");
        stateVariable.setSubsystem("Test Subsystem");

        stateVariableList.add(stateVariable);

        assertFalse(validationService.hasInvalidStateVariables(stateVariableList));
    }

    // getDuplicateIdentifiers

    @Test
    public void hasDuplicateIdentifiers() {
        StateVariable stateVariable = new StateVariable();

        identifierMap.put("TEST_IDENTIFIER", 1);

        stateVariable.setIdentifier("TEST_IDENTIFIER");
        stateVariableList.add(stateVariable);

        assertEquals(validationService.getDuplicateIdentifiers(stateVariableList, identifierMap).size(), 1);
    }

    @Test
    public void hasUploadedDuplicateIdentifiers() {
        StateVariable stateVariable = new StateVariable();
        StateVariable stateVariable1 = new StateVariable();

        identifierMap.put("TEST_IDENTIFIER", 1);

        stateVariable.setIdentifier("TEST_IDENTIFIER_1");
        stateVariableList.add(stateVariable);

        stateVariable1.setIdentifier("TEST_IDENTIFIER_1");
        stateVariableList.add(stateVariable1);

        assertEquals(validationService.getDuplicateIdentifiers(stateVariableList, identifierMap).size(), 1);
    }

    @Test
    public void hasNoDuplicateIdentifiers() {
        StateVariable stateVariable = new StateVariable();

        identifierMap.put("TEST_IDENTIFIER", 1);

        stateVariable.setIdentifier("TEST_IDENTIFIER_1");
        stateVariableList.add(stateVariable);

        assertEquals(validationService.getDuplicateIdentifiers(stateVariableList, identifierMap).size(), 0);
    }

    @Test
    public void hasNoExistingIdentifiers() {
        StateVariable stateVariable = new StateVariable();

        stateVariable.setIdentifier("TEST_IDENTIFIER_1");
        stateVariableList.add(stateVariable);

        assertEquals(validationService.getDuplicateIdentifiers(stateVariableList, identifierMap).size(), 0);
    }

    // validateRelationships

    @Test
    public void hasInvalidSubjectStateTypeId() {
        Relationship relationship = new Relationship();
        relationship.setSubjectType(InformationTypesEnum.State);
        relationship.setSubjectTypeId(1);
        relationship.setTargetType(InformationTypesEnum.State);
        relationship.setTargetTypeId(2);
        relationshipList.add(relationship);

        stateVariableMap.put(2, new StateVariable());

        assertEquals(validationService.validateRelationships(relationshipList, stateVariableMap, informationTypesEnumMap).size(), 1);
    }

    @Test
    public void hasInvalidTargetStateTypeId() {
        Relationship relationship = new Relationship();
        relationship.setSubjectType(InformationTypesEnum.State);
        relationship.setSubjectTypeId(2);
        relationship.setTargetType(InformationTypesEnum.State);
        relationship.setTargetTypeId(1);
        relationshipList.add(relationship);

        stateVariableMap.put(2, new StateVariable());

        assertEquals(validationService.validateRelationships(relationshipList, stateVariableMap, informationTypesEnumMap).size(), 1);
    }

    @Test
    public void hasInvalidSubjectInformationTypeId() {
        Relationship relationship = new Relationship();
        relationship.setSubjectType(InformationTypesEnum.Activity);
        relationship.setSubjectTypeId(1);
        relationship.setTargetType(InformationTypesEnum.Activity);
        relationship.setTargetTypeId(2);
        relationshipList.add(relationship);

        informationTypesEnumMap.get(InformationTypesEnum.Activity).put(2, new InformationTypes());

        assertEquals(validationService.validateRelationships(relationshipList, stateVariableMap, informationTypesEnumMap).size(), 1);
    }

    @Test
    public void hasInvalidTargetInformationTypeId() {
        Relationship relationship = new Relationship();
        relationship.setSubjectType(InformationTypesEnum.Activity);
        relationship.setSubjectTypeId(2);
        relationship.setTargetType(InformationTypesEnum.Activity);
        relationship.setTargetTypeId(1);
        relationshipList.add(relationship);

        informationTypesEnumMap.get(InformationTypesEnum.Activity).put(2, new InformationTypes());

        assertEquals(validationService.validateRelationships(relationshipList, stateVariableMap, informationTypesEnumMap).size(), 1);
    }

    @Test
    public void hasValidSubjectAndTarget() {
        Relationship relationship = new Relationship();
        relationship.setSubjectType(InformationTypesEnum.State);
        relationship.setSubjectTypeId(1);
        relationship.setTargetType(InformationTypesEnum.Activity);
        relationship.setTargetTypeId(1);
        relationshipList.add(relationship);

        stateVariableMap.put(1, new StateVariable());

        informationTypesEnumMap.get(InformationTypesEnum.Activity).put(1, new InformationTypes());

        assertEquals(validationService.validateRelationships(relationshipList, stateVariableMap, informationTypesEnumMap).size(), 0);
    }
}

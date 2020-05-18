package gov.nasa.jpl.fspa.service;

import static org.junit.Assert.*;

import gov.nasa.jpl.fspa.model.*;
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
    public Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap;
    public List<InformationTypesUpload> informationTypesUploadList;
    public List<RelationshipUpload> relationshipUploadList;
    public List<StateVariable> stateVariableList;
    public Map<String, Integer> stateVariableMap;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Before
    public void before() {
        identifierMap = new HashMap<>();
        informationTypesEnumMap = new HashMap<>();
        informationTypesUploadList = new ArrayList<>();
        relationshipUploadList = new ArrayList<>();
        stateVariableList = new ArrayList<>();
        stateVariableMap = new HashMap<>();

        for (InformationTypesEnum informationTypesEnum: InformationTypesEnum.values()) {
            informationTypesEnumMap.put(informationTypesEnum, new HashMap<String, InformationTypes>());
        }
    }

    // hasInvalidRelationships

    @Test
    public void invalidRelationshipsNoDisplayName() {
        RelationshipUpload relationshipUpload = new RelationshipUpload();
        relationshipUploadList.add(relationshipUpload);

        assertTrue(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));
    }

    @Test
    public void invalidRelationshipsNoIdentifier() {
        RelationshipUpload relationshipUpload = new RelationshipUpload();
        relationshipUpload.setDisplayName("Test Relationship");
        relationshipUpload.setSubjectType("State");
        relationshipUpload.setTargetType("State");
        relationshipUpload.setTargetIdentifier("TEST_STATE");
        relationshipUploadList.add(relationshipUpload);

        assertTrue(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));
    }

    @Test
    public void invalidRelationshipsNoIdentifierState() {
        RelationshipUpload relationshipUpload = new RelationshipUpload();
        relationshipUpload.setDisplayName("Test Relationship");
        relationshipUpload.setSubjectType("State");
        relationshipUpload.setSubjectIdentifier("TEST_state");

        relationshipUploadList.add(relationshipUpload);
        stateVariableMap.put("TEST_STATE", 1);

        assertTrue(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));
    }

    @Test
    public void invalidRelationshipsSubjectActivity() {
        RelationshipUpload relationshipUpload = new RelationshipUpload();
        relationshipUpload.setDisplayName("Test Relationship");
        relationshipUploadList.add(relationshipUpload);

        assertTrue(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));

        relationshipUpload.setSubjectType("Activity");
        // Identifier is case sensitive so this will fail.
        relationshipUpload.setSubjectIdentifier("TEST_ACTIVITY");
        informationTypesEnumMap.get(InformationTypesEnum.Activity).put("TEST_Activity", new InformationTypes());

        assertTrue(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));
    }

    @Test
    public void validRelationship() {
        // Information types only
        RelationshipUpload relationshipUpload = new RelationshipUpload();
        relationshipUpload.setDisplayName("Test Relationship");
        relationshipUpload.setSubjectType("Activity");
        relationshipUpload.setSubjectIdentifier("TEST_ACTIVITY");
        relationshipUpload.setTargetType("Command");
        relationshipUpload.setTargetIdentifier("TEST_COMMAND");
        relationshipUploadList.add(relationshipUpload);

        informationTypesEnumMap.get(InformationTypesEnum.Activity).put("TEST_ACTIVITY", new InformationTypes());
        informationTypesEnumMap.get(InformationTypesEnum.Command).put("TEST_COMMAND", new InformationTypes());

        assertFalse(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));

        // State and information type

        RelationshipUpload relationshipUpload1 = new RelationshipUpload();
        relationshipUpload1.setDisplayName("Test Relationship 1");
        relationshipUpload1.setSubjectType("Activity");
        relationshipUpload1.setSubjectIdentifier("TEST_ACTIVITY");
        relationshipUpload1.setTargetType("State");
        relationshipUpload1.setTargetIdentifier("TEST_STATE");
        relationshipUploadList.add(relationshipUpload);

        stateVariableMap.put("TEST_STATE", 1);

        assertFalse(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));

        // Both states

        RelationshipUpload relationshipUpload2 = new RelationshipUpload();
        relationshipUpload2.setDisplayName("Test Relationship 2");
        relationshipUpload2.setSubjectType("State");
        relationshipUpload2.setSubjectIdentifier("TEST_STATE");
        relationshipUpload2.setTargetType("State");
        relationshipUpload2.setTargetIdentifier("TEST_STATE_1");
        relationshipUploadList.add(relationshipUpload);

        stateVariableMap.put("TEST_STATE", 1);
        stateVariableMap.put("TEST_STATE_1", 2);

        assertFalse(validationService.hasInvalidRelationships(relationshipUploadList, stateVariableMap, informationTypesEnumMap));
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

    // validateInformationTypes

    @Test
    public void invalidInformationType() {
        InformationTypesUpload informationTypesUpload = new InformationTypesUpload();
        informationTypesUpload.setInformationType("States");
        informationTypesUploadList.add(informationTypesUpload);

        assertTrue(validationService.validateInformationTypes(informationTypesUploadList).size() > 0);
    }

    @Test
    public void validInformationType() {
        InformationTypesUpload activity = new InformationTypesUpload();
        InformationTypesUpload command = new InformationTypesUpload();
        InformationTypesUpload flightRule = new InformationTypesUpload();
        InformationTypesUpload model = new InformationTypesUpload();

        activity.setInformationType("Activity");
        command.setInformationType("Command");
        flightRule.setInformationType("FlightRule");
        model.setInformationType("Model");

        informationTypesUploadList.add(activity);
        informationTypesUploadList.add(command);
        informationTypesUploadList.add(flightRule);
        informationTypesUploadList.add(model);

        assertEquals(0, validationService.validateInformationTypes(informationTypesUploadList).size());
    }
}

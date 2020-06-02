package gov.nasa.jpl.fspa.relationships.service;

import gov.nasa.jpl.fspa.model.*;

import java.util.List;
import java.util.Map;

public interface RelationshipService {
    List<Relationship> convertRelationshipUploads(List<RelationshipUpload> relationshipUploadList, Map<String, Integer> stateVariableIdentifierMap,
                                                         Map<String, Integer> eventIdentifierMap, Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap);

    Map<Integer, Relationship> getRelationships();

    Map<Integer, RelationshipHistory> getRelationshipHistory();

    Relationship modifyRelationship(Relationship relationship);

    Map<Integer, Relationship> saveRelationships(List<Relationship> relationshipList);
}

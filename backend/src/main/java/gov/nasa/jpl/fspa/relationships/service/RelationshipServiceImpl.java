package gov.nasa.jpl.fspa.relationships.service;

import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.relationships.dao.RelationshipDao;
import gov.nasa.jpl.fspa.relationships.dao.RelationshipDaoImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RelationshipServiceImpl implements RelationshipService {
    private final RelationshipDao relationshipDao;

    public RelationshipServiceImpl() {
        relationshipDao = new RelationshipDaoImpl();
    }

    @Override
    public List<Relationship> convertRelationshipUploads(List<RelationshipUpload> relationshipUploadList, Map<String, Integer> stateVariableIdentifierMap,
                                                         Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap) {
        List<Relationship> relationshipList = new ArrayList<>();

        for (RelationshipUpload relationshipUpload: relationshipUploadList) {
            Relationship relationship = new Relationship();

            relationship.setDisplayName(relationshipUpload.getDisplayName());
            relationship.setDescription(relationshipUpload.getDescription());

            // Check the subject type, it's either a state or information type.
            if (InformationTypesEnum.valueOf(relationshipUpload.getSubjectType()) == InformationTypesEnum.State) {
                relationship.setSubjectType(InformationTypesEnum.State);
                relationship.setSubjectTypeId(stateVariableIdentifierMap.get(relationshipUpload.getSubjectIdentifier()));
            } else {
                InformationTypesEnum currentType = InformationTypesEnum.valueOf(relationshipUpload.getSubjectType());

                relationship.setSubjectType(currentType);

                if (informationTypesEnumMap.get(currentType).get(relationshipUpload.getSubjectIdentifier()) != null) {
                    relationship.setSubjectTypeId(informationTypesEnumMap.get(currentType).get(relationshipUpload.getSubjectIdentifier()).getId());
                }

            }

            // Check the target type, it's either a state or information type.
            if (InformationTypesEnum.valueOf(relationshipUpload.getTargetType()) == InformationTypesEnum.State) {
                relationship.setTargetType(InformationTypesEnum.State);
                relationship.setTargetTypeId(stateVariableIdentifierMap.get(relationshipUpload.getTargetIdentifier()));
            } else {
                InformationTypesEnum currentType = InformationTypesEnum.valueOf(relationshipUpload.getTargetType());

                relationship.setTargetType(currentType);

                if (informationTypesEnumMap.get(currentType).get(relationshipUpload.getTargetIdentifier()) != null) {
                    relationship.setTargetTypeId(informationTypesEnumMap.get(currentType).get(relationshipUpload.getTargetIdentifier()).getId());
                }
            }

            relationshipList.add(relationship);
        }

        return relationshipList;
    }

    @Override
    public Map<Integer, Relationship> getRelationships() {
        List<Relationship> relationships = relationshipDao.getRelationships();
        Map<Integer, Relationship> relationshipMap = new HashMap<>();

        for (Relationship relationship: relationships) {
            relationshipMap.put(relationship.getId(), relationship);
        }

        return relationshipMap;
    }

    @Override
    public Map<Integer, RelationshipHistory> getRelationshipHistory() {
        List<RelationshipHistory> relationshipHistoryList = relationshipDao.getRelationshipHistory();
        Map<Integer, RelationshipHistory> relationshipHistoryMap = new HashMap<>();

        for (RelationshipHistory relationshipHistory: relationshipHistoryList) {
            relationshipHistoryMap.put(relationshipHistory.getId(), relationshipHistory);
        }

        return relationshipHistoryMap;
    }


    @Override
    public Relationship modifyRelationship(Relationship relationship) {
        return relationshipDao.modifyRelationship(relationship);
    }

    @Override
    public Map<Integer, Relationship> saveRelationships(List<Relationship> relationshipList) {
        relationshipDao.saveRelationshipList(relationshipList);

        return getRelationships();
    }
}

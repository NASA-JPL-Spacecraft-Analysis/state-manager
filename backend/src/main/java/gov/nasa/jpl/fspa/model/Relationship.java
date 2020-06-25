package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class Relationship {
    private Integer id;
    private Integer collectionId;
    private String displayName;
    private String description;
    private InformationTypesEnum subjectType;
    private InformationTypesEnum targetType;
    private Integer subjectTypeId;
    private Integer targetTypeId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Integer collectionId) {
        this.collectionId = collectionId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public InformationTypesEnum getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(InformationTypesEnum subjectType) {
        this.subjectType = subjectType;
    }

    public InformationTypesEnum getTargetType() {
        return targetType;
    }

    public void setTargetType(InformationTypesEnum targetType) {
        this.targetType = targetType;
    }

    public Integer getSubjectTypeId() {
        return subjectTypeId;
    }

    public void setSubjectTypeId(Integer subjectTypeId) {
        this.subjectTypeId = subjectTypeId;
    }

    public Integer getTargetTypeId() {
        return targetTypeId;
    }

    public void setTargetTypeId(Integer targetTypeId) {
        this.targetTypeId = targetTypeId;
    }
}

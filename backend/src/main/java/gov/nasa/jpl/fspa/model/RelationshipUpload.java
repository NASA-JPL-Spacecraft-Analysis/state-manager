package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class RelationshipUpload {
    @CsvBindByName(required = true)
    private String displayName;

    @CsvBindByName()
    private String description;

    @CsvBindByName(required = true)
    private String subjectType;

    @CsvBindByName(required = true)
    private String subjectIdentifier;

    @CsvBindByName(required = true)
    private String targetType;

    @CsvBindByName(required = true)
    private String targetIdentifier;

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

    public String getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(String subjectType) {
        this.subjectType = subjectType;
    }

    public String getSubjectIdentifier() {
        return subjectIdentifier;
    }

    public void setSubjectIdentifier(String subjectIdentifier) {
        this.subjectIdentifier = subjectIdentifier;
    }

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public String getTargetIdentifier() {
        return targetIdentifier;
    }

    public void setTargetIdentifier(String targetIdentifier) {
        this.targetIdentifier = targetIdentifier;
    }
}

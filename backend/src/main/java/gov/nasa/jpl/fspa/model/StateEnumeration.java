package gov.nasa.jpl.fspa.model;

import com.opencsv.bean.CsvBindByName;

public class StateEnumeration {
    private Integer id;
    private int collectionId;
    private int stateId;

    @CsvBindByName(required = true)
    private String label;

    @CsvBindByName(required = true)
    private int value;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(int collectionId) {
        this.collectionId = collectionId;
    }

    public int getStateId() {
        return stateId;
    }

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

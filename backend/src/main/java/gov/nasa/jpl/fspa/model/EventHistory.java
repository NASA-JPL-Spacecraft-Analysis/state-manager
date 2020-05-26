package gov.nasa.jpl.fspa.model;

public class EventHistory extends Event {
    private Integer eventId;
    private String updated;

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
}

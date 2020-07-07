package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.collections.service.CollectionService;
import gov.nasa.jpl.fspa.collections.service.CollectionServiceImpl;
import gov.nasa.jpl.fspa.events.service.EventService;
import gov.nasa.jpl.fspa.events.service.EventServiceImpl;
import gov.nasa.jpl.fspa.informationtypes.service.InformationTypesService;
import gov.nasa.jpl.fspa.informationtypes.service.InformationTypesServiceImpl;
import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.relationships.service.RelationshipService;
import gov.nasa.jpl.fspa.relationships.service.RelationshipServiceImpl;
import gov.nasa.jpl.fspa.service.*;

import gov.nasa.jpl.fspa.states.service.StateService;
import gov.nasa.jpl.fspa.states.service.StateServiceImpl;
import gov.nasa.jpl.fspa.util.StateManagementConstants;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Path("v1/")
public class StateManagementResource {
    private final CollectionService collectionService;
    private final CsvParseServiceImpl csvParseServiceImpl;
    private final EnumerationService enumerationService;
    private final EventService eventService;
    private final InformationTypesService informationTypesService;
    private final JsonParseServiceImpl jsonParseServiceImpl;
    private final RelationshipService relationshipService;
    private final StateService stateService;
    private final ValidationService validationService;

    public StateManagementResource() {
        collectionService = new CollectionServiceImpl();
        csvParseServiceImpl = new CsvParseServiceImpl();
        enumerationService = new EnumerationServiceImpl();
        eventService = new EventServiceImpl();
        informationTypesService = new InformationTypesServiceImpl();
        jsonParseServiceImpl = new JsonParseServiceImpl();
        relationshipService = new RelationshipServiceImpl();
        stateService = new StateServiceImpl();
        validationService = new ValidationServiceImpl();
    }

    @GET
    @Path("/collections")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCollections() {
        Map<Integer, Collection> collectionMap = collectionService.getCollections();

        if (collectionMap.keySet().isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(collectionMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/event-history-map")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventHistoryMap(@PathParam("collectionId") Integer collectionId) {
        Map<Integer, EventHistory> eventHistoryMap = eventService.getEventHistoryMap(collectionId);

        if (eventHistoryMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(eventHistoryMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/event-map")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventMap(@PathParam("collectionId") int collectionId) {
        Map<Integer, Event> eventMap = eventService.getEventMap(collectionId);

        if (eventMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(eventMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/information-types")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInformationTypes(@PathParam("collectionId") int collectionId) {
        Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesMap = informationTypesService.getInformationTypes(collectionId);

        if (informationTypesMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(informationTypesMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/relationships")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationships(@PathParam("collectionId") int collectionId) {
        Map<Integer, Relationship> relationshipMap = relationshipService.getRelationships(collectionId);

        if (relationshipMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(relationshipMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/relationship-history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationshipHistory(@PathParam("collectionId") int collectionId) {
        Map<Integer, RelationshipHistory> relationshipHistoryMap = relationshipService.getRelationshipHistory(collectionId);

        if (relationshipHistoryMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(relationshipHistoryMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/state-enumerations")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateEnumerations(@PathParam("collectionId") int collectionId) {
        Map<Integer, List<StateEnumeration>> stateEnumerationMap = stateService.getStateEnumerations(collectionId);

        if (stateEnumerationMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateEnumerationMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/state-history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateHistory(@PathParam("collectionId") int collectionId) {
        Map<Integer, StateHistory> stateHistoryMap = stateService.getStateHistory(collectionId);

        if (stateHistoryMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateHistoryMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/state-identifiers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIdentifiers(@PathParam("collectionId") int collectionId) {
        List<String> stateIdentifierList = stateService.getStateIdentifiers(collectionId);

        if (stateIdentifierList.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateIdentifierList).build();
    }

    @GET
    @Path("/collection/{collectionId}/states")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStates(@PathParam("collectionId") int collectionId) {
        Map<Integer, State> stateMap = stateService.getStateMap(collectionId);

        if (stateMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateMap).build();
    }

    @GET
    @Path("/collection/{collectionId}/states-csv")
    @Produces({ "text/csv" })
    public Response getStatesCsv(@PathParam("collectionId") int collectionId) {
        String statesCsv = stateService.getStatesAsCsv(collectionId);

        if (statesCsv.equals("")) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK)
                .entity(getOutputAsCsv(statesCsv.getBytes()))
                .header("Content-Disposition", "attachment;filename=States.csv")
                .build();
    }

    @POST
    @Path("/collection/{collectionId}/enumerations-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEnumerationsCsv(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedStateEnumerations(collectionId, csvParseServiceImpl.parseStateEnumerations(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/enumerations-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEnumerationsJson(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedStateEnumerations(collectionId, jsonParseServiceImpl.parseStateEnumerations(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/events-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEventsCsv(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedEvents(csvParseServiceImpl.parseEvents(inputStream), collectionId);
    }

    @POST
    @Path("/collection/{collectionId}/events-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEventsJson(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedEvents(jsonParseServiceImpl.parseEvents(inputStream), collectionId);
    }

    @POST
    @Path("/collection/{collectionId}/information-types-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postInformationTypesCsv(@FormDataParam("file") InputStream inputStream, @PathParam("collectionId") int collectionId) {
        return saveParsedInformationTypes(csvParseServiceImpl.parseInformationTypes(inputStream), collectionId);
    }

    @POST
    @Path("/collection/{collectionId}/information-types-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postInformationTypesJson(@FormDataParam("file") InputStream inputStream, @PathParam("collectionId") int collectionId) {
        return saveParsedInformationTypes(jsonParseServiceImpl.parseInformationTypes(inputStream), collectionId);
    }

    @POST
    @Path("/collection/{collectionId}/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationship(@PathParam("collectionId") int collectionId, Relationship relationship) {
        Relationship createdRelationship = relationshipService.modifyRelationship(collectionId, relationship);

        if (createdRelationship == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(createdRelationship).build();
    }

    @POST
    @Path("/collection/{collectionId}/relationships-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationshipsCsv(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedRelationships(collectionId, csvParseServiceImpl.parseRelationships(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/relationships-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationshipsJson(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedRelationships(collectionId, jsonParseServiceImpl.parseRelationships(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/state")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postState(@PathParam("collectionId") int collectionId, State state) {
        State createdState = stateService.modifyState(collectionId, state);

        if (createdState == null) {
            return Response.status(Response.Status.CONFLICT).entity(StateManagementConstants.DUPLICATE_IDENTIFIER_MESSAGE).build();
        }

        return Response.status(Response.Status.CREATED).entity(createdState).build();
    }

    @POST
    @Path("/collection/{collectionId}/states-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStatesCsv(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedStates(collectionId, csvParseServiceImpl.parseStates(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/states-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStatesJson(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedStates(collectionId, jsonParseServiceImpl.parseStates(inputStream));
    }

    @POST
    @Path("/collection/{collectionId}/state-enumerations/{stateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateEnumerations(@PathParam("collectionId") int collectionId, @PathParam("stateId") int stateId, List<StateEnumeration> stateEnumerations) {
        List<StateEnumeration> savedStateEnumerations = stateService.saveStateEnumerations(collectionId, stateId, stateEnumerations);

        if (savedStateEnumerations == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(savedStateEnumerations).build();
    }

    @PUT
    @Path("/collection/{collectionId}/state")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putState(@PathParam("collectionId") int collectionId, State state) {
        State editedState = stateService.modifyState(collectionId, state);

        if (editedState == null) {
            return Response.status(Response.Status.CONFLICT).entity(StateManagementConstants.DUPLICATE_IDENTIFIER_MESSAGE).build();
        }

        return Response.status(Response.Status.CREATED).entity(editedState).build();
    }

    @PUT
    @Path("/collection/{collectionId}/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putRelationship(@PathParam("collectionId") int collectionId, Relationship relationship) {
        Relationship editedRelationship = relationshipService.modifyRelationship(collectionId, relationship);

        if (editedRelationship == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(editedRelationship).build();
    }

    @POST
    @Path("/event")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEvent(Event event) {
        Event createdEvent = eventService.modifyEvent(event);

        if (createdEvent == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(createdEvent).build();
    }

    @PUT
    @Path("/event")
    @Produces(MediaType.APPLICATION_JSON)
    public Response editEvent(Event event) {
        Event editedEvent = eventService.modifyEvent(event);

        if (editedEvent == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(editedEvent).build();
    }

    /**
     * Outputs our excel file.
     *
     * @param csvBytes
     * @return
     */
    private StreamingOutput getOutputAsCsv(final byte[] csvBytes) {
        return new StreamingOutput() {
            @Override
            public void write(OutputStream out) throws IOException, WebApplicationException {
                out.write(csvBytes);
            }
        };
    }

    private Response saveParsedInformationTypes(List<InformationTypesUpload> parsedInformationTypesUploadList, int collectionId) {
        if (parsedInformationTypesUploadList.size() > 0) {
            List<String> invalidInformationTypesList = validationService.validateInformationTypes(parsedInformationTypesUploadList);

            if (invalidInformationTypesList.size() == 0) {
                Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesMap =
                        informationTypesService.saveUploadedInformationTypes(informationTypesService.convertInformationTypesUpload(parsedInformationTypesUploadList), collectionId);

                return Response.status(Response.Status.CREATED).entity(informationTypesMap).build();
            } else {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateManagementConstants.INVALID_INFORMATION_TYPES + invalidInformationTypesList.toString()
                ).build();
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedStateEnumerations(int collectionId, List<StateEnumerationUpload> parsedStateEnumerationUploads) {
        if (parsedStateEnumerationUploads.size() > 0) {
            Map<String, Integer> identifierToStateIdMap = stateService.getMappedIdentifiers(collectionId);
            // A list to hold enumerations not tied to a valid identifier
            List<String> invalidIdentifiers = enumerationService.invalidIdentifierCheck(parsedStateEnumerationUploads, identifierToStateIdMap);

            if (invalidIdentifiers.size() == 0) {
                List<StateEnumeration> parsedEnumerations = enumerationService.convertEnumerationCsvToEnumeration(parsedStateEnumerationUploads, identifierToStateIdMap);
                Map<Integer, List<StateEnumeration>> mappedEnumerations = stateService.saveUploadedEnumerations(parsedEnumerations);

                if (mappedEnumerations.keySet().size() > 0) {
                    return Response.status(Response.Status.CREATED).entity(mappedEnumerations).build();
                }
            } else {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateManagementConstants.INVALID_IDENTIFIER_MESSAGE_WITH_IDENTIFIERS + invalidIdentifiers.toString()
                ).build();
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedEvents(List<Event> parsedEventList, int collectionId) {
        if (parsedEventList.size() > 0) {
            Map<Integer, Event> eventMap = eventService.saveUploadedEvents(parsedEventList, collectionId);

            if (eventMap.keySet().size() > 0) {
                return Response.status(Response.Status.CREATED).entity(eventMap).build();
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedRelationships(int collectionId, List<RelationshipUpload> parsedRelationshipUploadList) {
        if (parsedRelationshipUploadList.size() > 0) {
            Map<String, Integer> eventIdentifierMap = eventService.getMappedIdentifiers(collectionId);
            Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap =  informationTypesService.getInformationTypesByIdentifier(collectionId);
            Map<String, Integer> stateIdentifierMap = stateService.getMappedIdentifiers(collectionId);

            // If we have invalid relationships, return an error.
            if (validationService.hasInvalidRelationships(eventIdentifierMap, parsedRelationshipUploadList, stateIdentifierMap, informationTypesEnumMap)) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateManagementConstants.INVALID_RELATIONSHIPS
                ).build();
            } else {
                List<Relationship> parsedRelationships = relationshipService.convertRelationshipUploads(
                        parsedRelationshipUploadList, stateIdentifierMap, eventIdentifierMap, informationTypesEnumMap);

                if (parsedRelationships.size() > 0) {
                    return Response.status(Response.Status.CREATED).entity(relationshipService.saveRelationships(collectionId, parsedRelationships)).build();
                }
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedStates(int collectionId, List<State> parsedStateList) {
        if (parsedStateList.size() > 0) {
            if (validationService.hasInvalidStates(parsedStateList)) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateManagementConstants.INVALID_STATE_VARIABLES
                ).build();
            }

            List<String> duplicateIdentifiers = validationService.getDuplicateIdentifiers(parsedStateList, stateService.getMappedIdentifiers(collectionId));

            if (duplicateIdentifiers.size() > 0) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateManagementConstants.DUPLICATE_IDENTIFIER_MESSAGE_WITH_DUPLICATES + duplicateIdentifiers.toString()
                ).build();
            }

            return Response.status(Response.Status.CREATED).entity(stateService.saveStates(collectionId, parsedStateList)).build();
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }
}

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

import gov.nasa.jpl.fspa.util.StateVariableConstants;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.util.List;
import java.util.Map;

@Path("v1/")
public class StateManagementResource {
    private final CollectionService collectionService;
    private final CsvParseServiceImpl csvParseServiceImpl;
    private final EnumerationService enumerationService;
    private final EventService eventService;
    private final InformationTypesService informationTypesService;
    private final JsonParseServiceImpl jsonParseServiceImpl;
    private final RelationshipService relationshipService;
    private final StateVariableService stateVariableService;
    private final ValidationService validationService;

    public StateManagementResource() {
        collectionService = new CollectionServiceImpl();
        csvParseServiceImpl = new CsvParseServiceImpl();
        enumerationService = new EnumerationServiceImpl();
        eventService = new EventServiceImpl();
        informationTypesService = new InformationTypesServiceImpl();
        jsonParseServiceImpl = new JsonParseServiceImpl();
        relationshipService = new RelationshipServiceImpl();
        stateVariableService = new StateVariableServiceImpl();
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
    @Path("/relationships")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationships() {
        Map<Integer, Relationship> relationshipMap = relationshipService.getRelationships();

        if (relationshipMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(relationshipMap).build();
    }

    @GET
    @Path("/relationship-history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationshipHistory() {
        Map<Integer, RelationshipHistory> relationshipHistoryMap = relationshipService.getRelationshipHistory();

        if (relationshipHistoryMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(relationshipHistoryMap).build();
    }

    @GET
    @Path("/state-enumerations")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateEnumerations() {
        Map<Integer, List<StateEnumeration>> stateEnumerationMap = stateVariableService.getStateEnumerations();

        if (stateEnumerationMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateEnumerationMap).build();
    }

    @GET
    @Path("/state-history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateHistory() {
        Map<Integer, StateHistory> stateHistoryMap = stateVariableService.getStateHistory();

        if (stateHistoryMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateHistoryMap).build();
    }

    @GET
    @Path("/state-variables")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateVariables() {
        Map<Integer, StateVariable> stateVariableMap = stateVariableService.getStateVariables();

        if (stateVariableMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateVariableMap).build();
    }

    @GET
    @Path("/state-variable-csv")
    @Produces({ "text/csv" })
    public Response getStateVariablesCsv() {
        String stateVariableCsv = stateVariableService.getStateVariablesAsCsv();

        if (stateVariableCsv.equals("")) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK)
                .entity(getOutputAsCsv(stateVariableCsv.getBytes()))
                .header("Content-Disposition", "attachment;filename=StateVariables.csv")
                .build();
    }

    @GET
    @Path("/state-identifiers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIdentifiers() {
        List<String> identifiers = stateVariableService.getIdentifiers();

        if (identifiers.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(identifiers).build();
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

    @POST
    @Path("/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationship(Relationship relationship) {
        Relationship createdRelationship = relationshipService.modifyRelationship(relationship);

        if (createdRelationship == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(createdRelationship).build();
    }

    @POST
    @Path("/state-enumerations/{stateVariableId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateEnumerations(@PathParam("stateVariableId") int stateVariableId, List<StateEnumeration> stateEnumerations) {
        List<StateEnumeration> savedStateEnumerations = stateVariableService.saveStateEnumerations(stateVariableId, stateEnumerations);

        if (savedStateEnumerations == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(savedStateEnumerations).build();
    }

    @POST
    @Path("/state-variable")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariable(StateVariable stateVariable) {
        StateVariable createdStateVariable = stateVariableService.modifyStateVariable(stateVariable);

        if (createdStateVariable == null) {
            return Response.status(Response.Status.CONFLICT).entity(StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE).build();
        }

        return Response.status(Response.Status.CREATED).entity(createdStateVariable).build();
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
    @Path("/enumerations-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEnumerationsCsv(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateEnumerations(csvParseServiceImpl.parseStateEnumerations(inputStream));
    }

    @POST
    @Path("/enumerations-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEnumerationsJson(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateEnumerations(jsonParseServiceImpl.parseStateEnumerations(inputStream));
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
    @Path("/collection/{collectionId}/relationships-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationshipsCsv(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedRelationships(csvParseServiceImpl.parseRelationships(inputStream), collectionId);
    }

    @POST
    @Path("/collection/{collectionId}/relationships-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationshipsJson(@PathParam("collectionId") int collectionId, @FormDataParam("file") InputStream inputStream) {
        return saveParsedRelationships(jsonParseServiceImpl.parseRelationships(inputStream), collectionId);
    }

    @POST
    @Path("/state-variables-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariablesCsv(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateVariables(csvParseServiceImpl.parseStateVariables(inputStream));
    }

    @POST
    @Path("/state-variables-json")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariablesJson(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateVariables(jsonParseServiceImpl.parseStateVariables(inputStream));
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

    @PUT
    @Path("/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putRelationship(Relationship relationship) {
        Relationship editedRelationship = relationshipService.modifyRelationship(relationship);

        if (editedRelationship == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.CREATED).entity(editedRelationship).build();
    }

    @PUT
    @Path("/state-variable")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putStateVariable(StateVariable stateVariable) {
        StateVariable editedStateVariable = stateVariableService.modifyStateVariable(stateVariable);

        if (editedStateVariable == null) {
            return Response.status(Response.Status.CONFLICT).entity(StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE).build();
        }

        return Response.status(Response.Status.CREATED).entity(editedStateVariable).build();
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
                        StateVariableConstants.INVALID_INFORMATION_TYPES + invalidInformationTypesList.toString()
                ).build();
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedStateEnumerations(List<StateEnumerationUpload> parsedStateEnumerationUploads) {
        if (parsedStateEnumerationUploads.size() > 0) {
            Map<String, Integer> identifierToVariableIdMap = stateVariableService.getMappedIdentifiers();
            // A list to hold enumerations not tied to a valid identifier
            List<String> invalidIdentifiers = enumerationService.invalidIdentifierCheck(parsedStateEnumerationUploads, identifierToVariableIdMap);

            if (invalidIdentifiers.size() == 0) {
                List<StateEnumeration> parsedEnumerations = enumerationService.convertEnumerationCsvToEnumeration(parsedStateEnumerationUploads, identifierToVariableIdMap);
                Map<Integer, List<StateEnumeration>> mappedEnumerations = stateVariableService.saveUploadedEnumerations(parsedEnumerations);

                if (mappedEnumerations.keySet().size() > 0) {
                    return Response.status(Response.Status.CREATED).entity(mappedEnumerations).build();
                }
            } else {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateVariableConstants.INVALID_IDENTIFIER_MESSAGE_WITH_IDENTIFIERS + invalidIdentifiers.toString()
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

    private Response saveParsedRelationships(List<RelationshipUpload> parsedRelationshipUploadList, int collectionId) {
        if (parsedRelationshipUploadList.size() > 0) {
            Map<String, Integer> eventIdentifierMap = eventService.getMappedIdentifiers();
            Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesEnumMap =  informationTypesService.getInformationTypesByIdentifier(collectionId);
            Map<String, Integer> stateVariableIdentifierMap = stateVariableService.getMappedIdentifiers();

            // If we have invalid relationships, return an error.
            if (validationService.hasInvalidRelationships(eventIdentifierMap, parsedRelationshipUploadList, stateVariableIdentifierMap, informationTypesEnumMap)) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateVariableConstants.INVALID_RELATIONSHIPS
                ).build();
            } else {
                List<Relationship> parsedRelationships = relationshipService.convertRelationshipUploads(
                        parsedRelationshipUploadList, stateVariableIdentifierMap, eventIdentifierMap, informationTypesEnumMap);

                if (parsedRelationships.size() > 0) {
                    return Response.status(Response.Status.CREATED).entity(relationshipService.saveRelationships(parsedRelationships)).build();
                }
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private Response saveParsedStateVariables(List<StateVariable> parsedStateVariables) {
        if (parsedStateVariables.size() > 0) {
            if (validationService.hasInvalidStateVariables(parsedStateVariables)) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateVariableConstants.INVALID_STATE_VARIABLES
                ).build();
            }

            List<String> duplicateIdentifiers = validationService.getDuplicateIdentifiers(parsedStateVariables, stateVariableService.getMappedIdentifiers());

            if (duplicateIdentifiers.size() > 0) {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE_WITH_DUPLICATES + duplicateIdentifiers.toString()
                ).build();
            }

            return Response.status(Response.Status.CREATED).entity(stateVariableService.saveStateVariables(parsedStateVariables)).build();
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }
}

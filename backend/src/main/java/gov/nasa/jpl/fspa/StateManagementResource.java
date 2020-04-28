package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.informationtypes.service.InformationTypesService;
import gov.nasa.jpl.fspa.informationtypes.service.InformationTypesServiceImpl;
import gov.nasa.jpl.fspa.model.*;
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
    private final CsvParseServiceImpl csvParseServiceImpl;
    private final EnumerationService enumerationService;
    private final InformationTypesService informationTypesService;
    private final JsonParseServiceImpl jsonParseServiceImpl;
    private final StateVariableService stateVariableService;
    private final ValidationService validationService;

    public StateManagementResource() {
        csvParseServiceImpl = new CsvParseServiceImpl();
        enumerationService = new EnumerationServiceImpl();
        informationTypesService = new InformationTypesServiceImpl();
        jsonParseServiceImpl = new JsonParseServiceImpl();
        stateVariableService = new StateVariableServiceImpl();
        validationService = new ValidationServiceImpl();
    }

    @GET
    @Path("/information-types")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInformationTypes() {
        Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesMap = informationTypesService.getInformationTypes();

        if (informationTypesMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(informationTypesMap).build();
    }

    @GET
    @Path("/relationships")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationships() {
        Map<Integer, Relationship> relationshipMap = stateVariableService.getRelationships();

        if (relationshipMap.keySet().size() == 0) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(relationshipMap).build();
    }

    @GET
    @Path("/relationship-history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRelationshipHistory() {
        Map<Integer, RelationshipHistory> relationshipHistoryMap = stateVariableService.getRelationshipHistory();

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
    @Path("/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postRelationship(Relationship relationship) {
        Relationship createdRelationship = stateVariableService.modifyRelationship(relationship);

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
    @Path("/information-types-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postInformationTypesCsv(@FormDataParam("file") InputStream inputStream) {
        List<InformationTypes> parsedInformationTypesList = csvParseServiceImpl.parseInformationTypes(inputStream);

        if (parsedInformationTypesList.size() > 0) {
            // TODO: Check information type identifiers for duplicates.
            Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesMap =
                    informationTypesService.saveUploadedInformationTypes(parsedInformationTypesList);

            return Response.status(Response.Status.CREATED).entity(informationTypesMap).build();
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @POST
    @Path("/enumerations-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEnumerationsCsv(@FormDataParam("file") InputStream inputStream) {
        List<EnumerationCsv> parsedCsvEnumerations = csvParseServiceImpl.parseStateEnumerations(inputStream);

        if (parsedCsvEnumerations.size() > 0) {
            Map<String, Integer> identifierToVariableIdMap = stateVariableService.getMappedIdentifiers();
            // A list to hold enumerations not tied to a valid identifier
            List<String> invalidIdentifiers = enumerationService.invalidIdentifierCheck(parsedCsvEnumerations, identifierToVariableIdMap);

            if (invalidIdentifiers.size() == 0) {
                List<StateEnumeration> parsedEnumerations = enumerationService.convertEnumerationCsvToEnumeration(parsedCsvEnumerations, identifierToVariableIdMap);
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

    @POST
    @Path("/state-variables-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariablesCsv(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateVariables(csvParseServiceImpl.parseStateVariables(inputStream));
    }

    @POST
    @Path("/test")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariablesJson(@FormDataParam("file") InputStream inputStream) {
        return saveParsedStateVariables(jsonParseServiceImpl.parseStateVariables(inputStream));
    }

    @PUT
    @Path("/relationship")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putRelationship(Relationship relationship) {
        Relationship editedRelationship = stateVariableService.modifyRelationship(relationship);

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

package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.model.Relationship;
import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.service.CsvService;
import gov.nasa.jpl.fspa.service.CsvServiceImpl;
import gov.nasa.jpl.fspa.service.StateVariableService;
import gov.nasa.jpl.fspa.service.StateVariableServiceImpl;
import gov.nasa.jpl.fspa.util.StateVariableConstants;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

@Path("v1/")
public class StateManagementResource {
    private final CsvService<StateVariable> csvService;
    private final StateVariableService stateVariableService;

    public StateManagementResource() {
        csvService = new CsvServiceImpl<>(StateVariable.class);
        stateVariableService = new StateVariableServiceImpl();
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
    @Path("/state-variables-csv")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariables(@FormDataParam("file") InputStream inputStream) {
        List<StateVariable> parsedStateVariables = csvService.parseCsv(inputStream);

        if (parsedStateVariables.size() > 0) {
            List<String> duplicateIdentifiers = stateVariableService.getDuplicateIdentifiers(parsedStateVariables);

            if (duplicateIdentifiers.size() == 0) {
                Map<Integer, StateVariable> mappedStateVariables = stateVariableService.saveStateVariables(parsedStateVariables);

                return Response.status(Response.Status.CREATED).entity(mappedStateVariables).build();
            } else {
                return Response.status(Response.Status.CONFLICT).entity(
                        StateVariableConstants.DUPLICATE_IDENTIFIER_MESSAGE_WITH_DUPLICATES + duplicateIdentifiers.toString()
                ).build();
            }
        }

        return Response.status(Response.Status.NO_CONTENT).build();
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
}

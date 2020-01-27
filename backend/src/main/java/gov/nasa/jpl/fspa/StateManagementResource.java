package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.model.StateEnumeration;
import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.service.StateVariableService;
import gov.nasa.jpl.fspa.service.StateVariableServiceImpl;
import gov.nasa.jpl.fspa.util.StateVariableConstants;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

@Path("v1/")
public class StateManagementResource {
    private final StateVariableService stateVariableService;

    public StateManagementResource() {
        stateVariableService = new StateVariableServiceImpl();
    }

    @GET
    @Path("/state-enumerations")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateEnumerations() {
        Map<Integer, StateEnumeration> stateEnumerationMap = stateVariableService.getStateEnumerations();

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
    @Path("/state-variables")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postStateVariables(List<StateVariable> stateVariables) {
        String output = this.stateVariableService.createStateVariables(stateVariables);

        // State variables not created successfully.
        if (!output.equals("")) {
            return Response.status(Response.Status.CONFLICT).entity(output).build();
        }

        return Response.status(Response.Status.CREATED).entity(stateVariableService.getStateVariables()).build();
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

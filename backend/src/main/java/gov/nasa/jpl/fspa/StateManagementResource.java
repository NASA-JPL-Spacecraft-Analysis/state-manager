package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.model.StateVariable;
import gov.nasa.jpl.fspa.service.StateVariableService;
import gov.nasa.jpl.fspa.service.StateVariableServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("v1/")
public class StateManagementResource {
    private final StateVariableService stateVariableService;

    public StateManagementResource() {
        stateVariableService = new StateVariableServiceImpl();
    }

    @GET
    @Path("/state-variable")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateVariables() {
        List<StateVariable> stateVariables = stateVariableService.getStateVariables();

        if (stateVariables.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateVariables).build();
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
        List<StateVariable> stateVariables = stateVariableService.modifyStateVariable(stateVariable);

        if (stateVariables.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateVariables).build();
    }

    @PUT
    @Path("/state-variable")
    @Produces(MediaType.APPLICATION_JSON)
    public Response putStateVariable(StateVariable stateVariable) {
        List<StateVariable> stateVariables = stateVariableService.modifyStateVariable(stateVariable);

        if (stateVariables.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(stateVariables).build();
    }
}

package gov.nasa.jpl.fpsa;

import gov.nasa.jpl.fpsa.service.TestStringService;
import gov.nasa.jpl.fpsa.service.TestStringServiceImpl;
import gov.nasas.jpl.fpsa.model.TestString;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("v1/")
public class FpsaProtoResource {
    private final TestStringService testStringService;

    public FpsaProtoResource() {
        testStringService = new TestStringServiceImpl();
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        List<TestString> testStrings = testStringService.getTestStrings();

        if (testStrings.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(testStrings).build();
    }

    @POST
    @Path("/data")
    @Produces(MediaType.APPLICATION_JSON)
    public Response data(String data) {
        List<TestString> testStrings = testStringService.postNewData(data);

        if (testStrings.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(testStrings).build();
    }
}

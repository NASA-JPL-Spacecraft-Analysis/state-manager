package gov.nasa.jpl.fspa;

import gov.nasa.jpl.fspa.service.TestStringService;
import gov.nasa.jpl.fspa.service.TestStringServiceImpl;
import gov.nasa.jpl.fspa.model.TestString;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("v1/")
public class FspaProtoResource {
    private final TestStringService testStringService;

    public FspaProtoResource() {
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

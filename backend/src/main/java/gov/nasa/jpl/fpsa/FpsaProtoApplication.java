package gov.nasa.jpl.fpsa;

import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("api")
public class FpsaProtoApplication extends ResourceConfig {
    public FpsaProtoApplication() {
        register(FpsaProtoResource.class);
    }
}

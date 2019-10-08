package gov.nasa.jpl.fspa;

import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("api")
public class FspaProtoApplication extends ResourceConfig {
    public FspaProtoApplication() {
        register(CorsFilter.class);
        register(FspaProtoResource.class);
    }
}

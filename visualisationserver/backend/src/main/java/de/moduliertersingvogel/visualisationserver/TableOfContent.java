package de.moduliertersingvogel.visualisationserver;

import java.nio.file.Files;
import java.util.Arrays;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("/toc")
public class TableOfContent {
	private static Logger logger = LogManager.getLogger("de.moduliertersingvogel.visualisationserver");;

	@GET
	@Path("/topics")
	@Produces(MediaType.APPLICATION_JSON)
	public Response topics(){
		try {
			String[] topics = Files.list(Utils.getTopicBasePath()).map(p->p.getFileName().toString()).collect(Collectors.toList()).toArray(new String[0]);
			return Response.ok(topics).build();
		} catch (Exception e) {
			logger.catching(e);
			return Response.serverError().entity("Error while retrieving topics.").build();
		}
	}
	
	@GET
	@Path("/{topic}/files")
	@Produces(MediaType.APPLICATION_JSON)
	public Response files(@PathParam("topic") String topic){
		try {
			String[] topics = Files.list(Utils.getTopicPath(topic)).map(p->p.getFileName().toString()).collect(Collectors.toList()).toArray(new String[0]);
			return Response.ok(topics).build();
		} catch (Exception e) {
			logger.catching(e);
			return Response.serverError().entity("Error while retrieving files for topic: "+topic+".").build();
		}
	}
}

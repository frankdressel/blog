package de.moduliertersingvogel.visualisationserver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("/data")
public class DataBroker {
	private static Logger logger = LogManager.getLogger("de.moduliertersingvogel.visualisationserver");;

	@POST
	@Path("{topic}/multiple")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response receiveMultiple(@PathParam("topic") String topic, List<List<RawData>> data) {
		logger.debug("Receiving data for topic: " + topic);

		HashMap<String, Data> hashMap = new HashMap<>();
		for (int i = 0; i < data.size(); i++) {
			List<RawData> l = data.get(i);
			for (RawData d : l) {
				hashMap.put(d.date, new Data(d.date, new ArrayList<>()));
			}
		}
		for (int i = 0; i < data.size(); i++) {
			List<RawData> l = data.get(i);
			for (RawData d : l) {
				hashMap.get(d.date).values.set(i, d.value);
			}
		}

		ArrayList<Data> list = new ArrayList<Data>(hashMap.values());
		list.sort((a, b) -> a.date.compareTo(b.date));

		try {
			Files.write(Utils.getTopicFilePath(topic),
					list.stream().map(d -> d.toString()).collect(Collectors.toList()));
			return Response.status(Status.CREATED).build();
		} catch (IOException e) {
			logger.error(Arrays.stream(e.getStackTrace()).map(s->s.toString()).collect(Collectors.joining("\n")));
			return Response.serverError().entity("Error while writing file.").build();
		}
	}
	
	@POST
	@Path("{topic}/single")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response receiveSingle(@PathParam("topic") String topic, Data[] input) {
		logger.debug("Receiving data for topic: " + topic);

		List<Data> data = Arrays.asList(input);
		data.sort((a, b) -> a.date.compareTo(b.date));

		try {
			java.nio.file.Path path = Utils.getTopicFilePath(topic);
			File file = path.toAbsolutePath().toFile();
			file.getParentFile().mkdirs();
			file.createNewFile();
			Files.write(path,
					data.stream().map(d -> d.toString()).collect(Collectors.toList()));
			return Response.status(Status.CREATED).build();
		} catch (Exception e) {
			logger.error(Arrays.stream(e.getStackTrace()).map(s->s.toString()).collect(Collectors.joining("\n")));
			return Response.serverError().entity("Error while writing file.").build();
		}
	}
	
	@GET
	@Path("{topic}/{file}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getFile(@PathParam("topic") String topic, @PathParam("file") String file){
		try {
			String content = Files.readAllLines(Utils.getTopicPath(topic).resolve(file)).stream().collect(Collectors.joining("\n"));
			return Response.ok(content).build();
		} catch (IOException e) {
			logger.error(Arrays.stream(e.getStackTrace()).map(s->s.toString()).collect(Collectors.joining("\n")));
			return Response.serverError().entity("Error while retrieving file.").build();
		}
	}
}

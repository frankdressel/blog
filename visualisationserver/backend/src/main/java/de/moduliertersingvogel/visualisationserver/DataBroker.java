package de.moduliertersingvogel.visualisationserver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
			Files.write(Paths.get(topic, System.nanoTime() + ""),
					list.stream().map(d -> d.toString()).collect(Collectors.toList()));
		} catch (IOException e) {
			e.printStackTrace();
		}

		Response response = null;
		return response;
	}
	
	@POST
	@Path("{topic}/single")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response receiveSingle(@PathParam("topic") String topic, Data[] input) {
		logger.debug("Receiving data for topic: " + topic);

		List<Data> data = Arrays.asList(input);
		data.sort((a, b) -> a.date.compareTo(b.date));

		try {
			java.nio.file.Path path = Paths.get(topic, System.nanoTime() + "");
			File file = path.toAbsolutePath().toFile();
			file.getParentFile().mkdirs();
			file.createNewFile();
			Files.write(path,
					data.stream().map(d -> d.toString()).collect(Collectors.toList()));
		} catch (Exception e) {
			e.printStackTrace();
		}

		Response response = null;
		return response;
	}
}
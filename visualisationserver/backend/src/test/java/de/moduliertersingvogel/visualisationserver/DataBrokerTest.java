package de.moduliertersingvogel.visualisationserver;

import static org.junit.Assert.fail;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

import de.moduliertersingvogel.visualisationutils.model.Data;

public class DataBrokerTest {

	private DataBroker out;
	private String topic;

	@Before
	public void setup() {
		this.out = new DataBroker();
		this.topic = System.nanoTime() + "";
	}

	@After
	public void tearDown() {
		Path topicPath = Utils.getTopicPath(topic);
		if (topicPath.toAbsolutePath().toFile().exists()) {
			try {
				Files.list(topicPath).forEach(p -> p.toAbsolutePath().toFile().delete());
			} catch (IOException e) {
				e.printStackTrace();
			}
			topicPath.toAbsolutePath().toFile().delete();
		}
	}

	@Test
	public void testreceiveMultiple() {
		fail("Not yet implemented");
	}

	@Test
	public void testreceiveSingle() throws IOException {
		Path topicPath = Utils.getTopicPath(this.topic);
		File topicFile = topicPath.toAbsolutePath().toFile();
		assertFalse(topicFile.exists());

		Response response = out.receiveSingle(this.topic, new String[]{"Date", "One", "Two", "Three"}, 
				new Data[] { new Data("2017-04-01", Arrays.asList(new Object[] { 1, 2, 3 })) });
		assertEquals(Status.CREATED.getStatusCode(), response.getStatus());
		
		assertEquals(1, Files.list(topicPath).count());
		Files.list(topicPath).forEach(p->{
			try {
				List<String> lines = Files.readAllLines(p);
				assertEquals(2, lines.size());
				assertEquals("Date,One,Two,Three", lines.get(0));
				assertEquals("2017-04-01,1,2,3", lines.get(1));
			} catch (IOException e) {
				e.printStackTrace();
				fail();
			}
		});

		assertTrue(topicFile.exists());
	}

	@Test
	public void testgetFile() {
		fail("Not yet implemented");
	}
}

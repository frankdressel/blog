package de.moduliertersingvogel.visualisationserver;

import java.nio.file.Path;
import java.nio.file.Paths;

public class Utils {
	public static Path getTopicBasePath(){
		return Paths.get("topics");
	}
	
	public static Path getTopicPath(String topic) {
		return getTopicBasePath().resolve(Paths.get(topic));
	}
	
	public static Path getTopicFilePath(String topic) {
		return getTopicBasePath().resolve(Paths.get(topic, System.nanoTime() + ""));
	}
}

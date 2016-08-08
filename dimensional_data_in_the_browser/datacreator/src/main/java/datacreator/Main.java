package datacreator;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Main {

	public static void main(String[] args) {
		LocalDate start = LocalDate.parse(args[0], DateTimeFormatter.ISO_DATE);
		LocalDate end = LocalDate.parse(args[1], DateTimeFormatter.ISO_DATE);
		
        System.out.println("Date, Day_of_year, Day_of_month, Day_of_week");
		System.out.printf("%s, %s, %s, %s\n", start.toString(), start.getDayOfYear(), start.getDayOfMonth(), start.getDayOfWeek().toString());
		while(start.isBefore(end)){
			start=start.plus(1, ChronoUnit.DAYS);
			System.out.printf("%s, %s, %s, %s\n", DateTimeFormatter.ISO_DATE.format(start), start.getDayOfYear(), start.getDayOfMonth(), start.getDayOfWeek().toString());
		}
	}
}

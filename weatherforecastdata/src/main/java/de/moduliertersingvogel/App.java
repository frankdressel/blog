package de.moduliertersingvogel;

import java.io.IOException;
import java.util.List;

import ucar.ma2.ArrayDouble;
import ucar.ma2.ArrayFloat;
import ucar.nc2.Attribute;
import ucar.nc2.Dimension;
import ucar.nc2.NetcdfFile;
import ucar.nc2.Variable;

public class App 
{
    public static void main( String[] args ) {
        String filename = "ICON_GDS_europe_reg_0.250x0.250_T_2M_2017032106.grib2";
        try {
            NetcdfFile dataFile = NetcdfFile.open(filename);
            System.out.println("******** Dimensions ********");
            List<Dimension> dimensions = dataFile.getDimensions();
            for (Dimension dimension : dimensions) {
                System.out.println(dimension.getFullName());
            }
            System.out.println("******** Attributes ********");
            List<Attribute> globalAttributes = dataFile.getGlobalAttributes();
            for (Attribute attribute : globalAttributes) {
                System.out.println(attribute.getFullName());
            }
            System.out.println("******** Variables ********");
            List<Variable> variables = dataFile.getVariables();
            // Print out the informations you need to parse the file.
            for (Variable variable : variables) {
                System.out.println(variable.getFullName());
                System.out.println(variable.getUnitsString());
                System.out.println(variable.getDimensions());
            }

            // Parse the file according to the informations obtained above.
            ArrayDouble.D1 time = (ArrayDouble.D1) dataFile.findVariable("time").read();
            ArrayFloat.D1 height = (ArrayFloat.D1) dataFile.findVariable("height_above_ground").read();
            ArrayFloat.D1 lat = (ArrayFloat.D1) dataFile.findVariable("lat").read();
            ArrayFloat.D1 lon = (ArrayFloat.D1) dataFile.findVariable("lon").read();
            ArrayFloat.D4 temp = (ArrayFloat.D4) dataFile.findVariable("Temperature_height_above_ground").read();

            // Print out. You can do more fancy stuff here.
            for (int timeIndex = 0; timeIndex < time.getShape()[0]; timeIndex++) {
                for (int heightIndex = 0; heightIndex < height.getShape()[0]; heightIndex++) {
                    for (int latIndex = 0; latIndex < lat.getShape()[0]; latIndex++) {
                        float latValue = lat.get(latIndex);
                        // Filter for a location of interest. 
                        if (Math.abs(latValue - 48)<0.25) {
                            for (int lonIndex = 0; lonIndex < lon.getShape()[0]; lonIndex++) {
                                float lonValue = lon.get(lonIndex);
                                // Filter for a location of interest. 
                                if (Math.abs(lonValue%360 - 12.75)<0.25) {
                                    System.out.println(String.format("%f %f %f %f %f", time.get(timeIndex),
                                                height.get(heightIndex), lat.get(latIndex), lon.get(lonIndex),
                                                temp.get(timeIndex, heightIndex, latIndex, lonIndex)));
                                }
                            }
                        }
                    }
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

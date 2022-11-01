
*[Back to the main page](../README.md)*

## Creating an elevation map from Copernicus data

I'm going to create a 3D elevation map, using Copernicus elevation data ([EU-DEM](https://land.copernicus.eu/imagery-in-situ/eu-dem/)). For that, I download two tiles, North and South of Madrid (`eu_dem_v11_E30N10.zip` and `eu_dem_v11_E30N20.zip`). I unzip them, which produces four files per tile (with extensions `TFw`, `TIF`). All of them are in directory `$demdata`.

To work with these maps, and produce maps with the information I need, I install [gdal](https://gdal.org/). In Debian, that's easy because it is a regular package:

```bash
sudo apt install gdal-bin
```

Now, I build a gdal virtual dataset with both tiles, and produce a file in ENVI format (`map.bin`) with the elevation data. I do that in the `tmp` directory, whcih I will use as a temporary storage for the intermediary maps and datasets I need: 

```bash
mkdir tmp
cd tmp
gdalbuildvrt map.vrt $demdata/eu_dem_v11_E30N10.TIF $demdata/eu_dem_v11_E30N20.TIF
gdalinfo -mm map.vrt
gdalwarp -te 3000000 2000000 3100000 2100000 map.vrt map.tif
gdalinfo -mm map.tif
gdal_translate -scale 0 2522 0 255 -outsize 200 200 -of PNG map.tif ../map.png
gdal_translate -scale 0 2522 0 65535 -ot UInt16 -outsize 200 200 -of ENVI map.tif ../map.bin
```

Let's explain the process in some more detail:

* I start by using [gdalbuildvrt](https://gdal.org/programs/gdalbuildvrt.html) to build a dataset (in this case, with two TIF files for elevation data).

* Then, we get the coordinates of the generated vrt file. These coordinated mean the data for this file is between 3 Mmeters (3,000 Km) and 4 Mmeters West, and between 1 Mmeters and 3 Mmeters North:

```
Corner Coordinates:
Upper Left  ( 3000000.000, 3000000.000) (  8d 7'39.52"W, 48d38'23.47"N)
Lower Left  ( 3000000.000, 1000000.000) (  3d40'26.43"W, 30d56'55.67"N)
Upper Right ( 4000000.000, 3000000.000) (  5d31' 4.07"E, 50d 1'26.83"N)
Lower Right ( 4000000.000, 1000000.000) (  6d39'15.95"E, 31d56'35.96"N)
Center      ( 3500000.000, 2000000.000) (  0d18'45.65"E, 40d37'27.81"N)
Band 1 Block=128x128 Type=Float32, ColorInterp=Gray
Min=-33.271 Max=3451.047   Computed Min/Max=-33.271,3451.047
```

* Then, I use [gdalwarp](https://gdal.org/programs/gdalwarp.html) to build a TIF file, `test.tif`, corresponding to a fraction of the dataset. In this case, the lower correspond to the lower left corner of the upper image included in the dataset.  Coordinates are Xmin Ymin Xmax Ymax. Have in mind that not all coordinates have values, since the map covers only Europe (and not, for example, Africa), which means that if you select a region with no values, it will say there is no elevation data, when asking for the elevation.

* Then, I check with `gdalinfo` the coordinates of the produced file, and find the max and min elevation:

```
Upper Left  ( 3000000.000, 2100000.000) (  5d41'57.17"W, 40d45'34.34"N)
Lower Left  ( 3000000.000, 2000000.000) (  5d28'46.07"W, 39d52'33.70"N)
Upper Right ( 3100000.000, 2100000.000) (  4d32' 7.72"W, 40d56'21.51"N)
Lower Right ( 3100000.000, 2000000.000) (  4d19'51.35"W, 40d 3'10.47"N)
Center      ( 3050000.000, 2050000.000) (  5d 0'39.47"W, 40d24'31.80"N)
Band 1 Block=4000x1 Type=Float32, ColorInterp=Gray
    Computed Min/Max=249.094,2521.040
```

* The first part confirms that the coordinates in `test.tif` are from 3 Mmeters W to 3.1 Mmeters W, and from 2 Mmeters N to 2.1 Mmeters N.

* Then, we produce a PNG file ([map.png](map.png)), with less resolution, to make it manageable. The first two numbers (0 2522) are the real elevation range in meters, from the TIF file, to be translated to the second two numbers (0 255), range of the PNG file (256 levels). This file is mainly to check how things are going, because you can see the relief in it, but I won´t use anymore.

* The second `gdal_translate` does the same, but producing an ENVI file ([map.bin](map.bin)), in which long integers (16 bit) can be used, thus having much better resolution.

Now, this file can already be included in the [aframe-terrain-model](https://github.com/bryik/aframe-terrain-model-component) as follows: 

``` html
<a-entity terrain-model="dem: url(map.bin);
        planeWidth: 346;
        planeHeight: 346;
        segmentsWidth: 199;
        segmentsHeight: 199;
        zPosition: 100;
    wireframe: true"
        id="terrain"></a-entity>
```

We can see the result by inserting this entity in an A-Frame scene, as I do in `wireframe.html`. [Check the actual scene in your browser](wireframe.html)

To have colored texture, we start by creating a color relief file, as explained in [Creating color relief and slope shading with gdaldem](https://blog.mastermaps.com/2012/06/creating-color-relief-and-slope-shading.html). For example (first column is elevation, the other three is RGB): 

```
0 110 220 110
900 240 250 160
1300 230 220 170
1900 220 220 220
2500 250 250 250
```

Then, we use this file to produce a file for the texture: 

```bash
gdaldem color-relief test.tif test_relief.txt test_colour_relief.tif
gdaldem hillshade -combined test.tif test_hillshade.tif
```

Then, we use [Mapnik](https://mapnik.org/) to combine the files. There are Debian packages, so, I first install them: 

```bash
sudo apt install mapnik-utils python3-mapnik
```

Now, to run mapnik, we create an XML file specifying how to combine data (see details in [Land cover mapping with Mapnik](https://blog.mastermaps.com/2012/07/land-cover-mapping-with-mapnik.html)): 

	  ```
	  	  <Map srs="+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs">
	  	  
	  	    <Style name="color relief style">
	  	      <Rule>
	  	        <RasterSymbolizer mode="normal" />
	  	      </Rule>
	  	    </Style>  
	  	  
	  	    <Style name="hillshade style">
	  	      <Rule>
	  	        <RasterSymbolizer opacity="0.3" mode="multiply" scaling="bilinear" />
	  	      </Rule>
	  	    </Style>
	  	  
	  	    <Layer name="color relief">
	  	      <StyleName>color relief style</StyleName>
	  	      <Datasource>
	  	        <Parameter name="type">gdal</Parameter>
	  	        <Parameter name="file">test_colour_relief.tif</Parameter>
	  	      </Datasource>
	  	    </Layer>
	  	    
	  	    <Layer name="hillshade">
	  	      <StyleName>hillshade style</StyleName>
	  	      <Datasource>
	  	        <Parameter name="type">gdal</Parameter>
	  	        <Parameter name="file">test_hillshade.tif</Parameter>
	  	      </Datasource>
	  	    </Layer>  
	  	    
	  	  </Map>
	  ```

And a Python file, which will be the driver for Mapnik: 

``` python
#!/usr/bin/env python3

import mapnik
map = mapnik.Map(3134, 3134)
mapnik.load_map(map, 'test_terrain.xml')
bbox = mapnik.Box2d(mapnik.Coord(3000000, 2000000), mapnik.Coord(3100000, 2100000))
map.zoom_to_box(bbox)
mapnik.render_to_file(map, 'test_terrain.png')
```

Finally, we just run that script: 

```bash
python3 test_terrain.py
```

This produces a nice `test_terrain.png` file, which can be used a texture for the map.

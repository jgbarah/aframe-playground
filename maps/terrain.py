#!/usr/bin/env python3

import mapnik
map = mapnik.Map(3134, 3134)
mapnik.load_map(map, 'terrain.xml')
bbox = mapnik.Box2d(mapnik.Coord(3000000, 2000000), mapnik.Coord(3100000, 2100000))
map.zoom_to_box(bbox)
mapnik.render_to_file(map, 'terrain.png')

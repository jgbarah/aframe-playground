#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Authors:
#     Jesus M. Gonzalez-Barahona <jgb@bitergia.com>
#

import argparse
import os.path
import sys

from pyqart import QArtist, QrHalftonePrinter, QrImagePrinter, QrPainter

description = "Generate QArt RQ codes with embedded logos"

QR_VERSION = 10

def parse_args ():

    parser = argparse.ArgumentParser(description = description)

    parser.add_argument("logo", type=str, nargs=1,
                        help="Logo file name (PNG, GIF, JPG)")
    parser.add_argument("--url", type=str, default='https://jgbarah.github.io',
                        help="Directory where generated QRs are written")
    parser.add_argument("--dir", type=str, default='.',
                        help="Directory where generated QRs are written")
    parser.add_argument("--points", type=str, default=10,
                        help="Points per pixel")
    args = parser.parse_args()
    return args

def main ():
    args = parse_args()
    logo = args.logo[0]
    dir = args.dir
    url = args.url
    points = args.points

    artist = QArtist(url, logo, QR_VERSION)
    painter = QrPainter(url, QR_VERSION)
    artist_data_only = QArtist(url, logo, QR_VERSION, only_data=True)

    # Normal
    QrImagePrinter.print(painter, path=os.path.join(dir, 'normal.png'), point_width=points)
    # Halftone
    QrHalftonePrinter.print(painter, path=os.path.join(dir, 'halftone.png'), img=logo,
                            point_width=points, colorful=False)
    # Halftone colorful
    QrHalftonePrinter.print(painter, path=os.path.join(dir, 'halftone-color.png'), img=logo,
                            point_width=points)
    # Halftone pixel
    QrHalftonePrinter.print(painter, path=os.path.join(dir, 'halftone-pixel.png'), img=logo,
                            point_width=points, colorful=False,
                            pixelization=True)
    # QArt
    QrImagePrinter.print(artist, path=os.path.join(dir, 'qart.png'), point_width=points)
    # QArt data only
    QrImagePrinter.print(artist_data_only, path=os.path.join(dir, 'qart-data-only.png'),
                         point_width=points)
    # HalfArt
    QrHalftonePrinter.print(artist, path=os.path.join(dir, 'halfart.png'), point_width=points)
    # HalfArt data only
    QrHalftonePrinter.print(artist_data_only, path=os.path.join(dir, 'halfart-data-only.png'),
                            point_width=points)

if __name__ == "__main__":
    main()

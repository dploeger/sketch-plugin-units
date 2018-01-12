# Units

Units is a [Sketch](https://https://sketchapp.com/) plugin for working with print units (inch, cm, mm) in Sketch's pixel world.

Additionally, the plugin can be used to translate to other units by specifying a scale.

## Features

* Calculates the destination unit value from the pixel value for width and heights and back
* Resizes one or more layers based on pixel unit values

## Manual Installation

* Download the plugin and extract the archive
* Double click on the de.dieploegers.sketchplugin file

## Usage

Use the settings dialog to set up your desired unit and the scale value (see below).

Then select a layer and use the resize command to either display the print unit value for its current size or resize it to a new value.

## Scale values

The scale value is the main factor for converting pixels to units and back.

If you plan to export your design as a vector file (e.g. PDF) you should set it to 72, because that's Sketch's default value.

On the other hand, if you plan to export to an image file, you can basically set this value to what you like, but for print it's usually 300.

Alternatively if you want to convert to other units (non-fixed ones like em or rem for example), you can just select "other" as the unit and set the scale to a factor you use.

Dynamic Slider
==============

Introduction
------------

This is a very, very simple jQuery-plugin that provides an image slider (ie. an image slideshow). The only used transition is fading between images. This is achieved using the CSS transition property. So it can only be used in modern browsers.

The main benefit of this plugin is the ability to dynamically add or remove images from the slider.

Usage
-----
This is a jQuery-plugin. So you have to include [jQUery](http://jquery.com/) on your site first and add the dynamic slider script.
Basically then you only need a container with images on your site and let go the plugin on it.

```html
    <div id="myContainer">
        <img src="1.jpg" alt="" />
        <img src="2.jpg" alt="" />
        <img src="3.jpg" alt="" />
    </div>
```

```javascript
    <script>
        $('#myContainer').dynamicSlider({duration: 6000, progressBar: true});
    </script>
```

Options
-------

The plugin's options have to be provided in an JS-object when the slider is initialized.

This are the supported options:

| name          | type          | default      | description                                 |
| ------------- |:-------------:|:------------:|--------------------------------------------:|
| duration      | integer (ms)  | 5000         | time between the image transitions          |
| progressBar   | boolean       | true         | whether or not a progress bar will be shown |


Methods
-------

To start the slider simply apply the plugin to the jQuery-element that contains the images:

    $('#myContainer').dynamicSlider({duration: 6000, progressBar: true});

The initialisation is done by giving the option-object or at least an empty object when using the default values.

Other methods are invoked by giving the method-name and parameters if needed.

This are the available methods:

### next

#### Parameters
none

#### Description
Show the next image. The slider is always looping which means that it shows the first image again after the last one.

#### Example

    $('#myContainer').dynamicSlider('next');


### previous

#### Parameters
none

#### Description
Show the previous image. If the first image is currently shown this methods makes the last image appear.

#### Example

    $('#myContainer').dynamicSlider('previous');


### add

#### Parameters
string|object

#### Description
If a string is given it is assumed to be a path to a new image and a new DOM-node is created and added to the list ob images.
Any other object is just added to the list as is. So this only makes sense for a jQuery-object.

#### Example

    $('#myContainer').dynamicSlider('add', 'img/1.jpg');


### remove    

#### Parameters
string|object

#### Description
If a string is given it is assumed to be a path and the existing images are searched for this path. A matching image is removed then.
You can also give a jQuery-object which is used directly.

#### Example

    $('#myContainer').dynamicSlider('remove', 'img/1.jpg');

Examples
--------

There are examples in the examples folder that show the usage of the plugin.
 


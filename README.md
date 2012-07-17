# jquery-phslider

## Overview

**jquery-phslider** is a simple jquery slider plugin. 

Any bugs and suggestions, please open a ticket. Thanks.

## TODO
- Custom animations
- Check compatibility
- Let more than one plugin instance (multiple sliders)

## How to use

1) Include the plugin in your site:

	<script async type="text/javascript" src="jquery-phslider.js"></script>
	
2) Have the following markup

	<div class="the-main-layer">
		<div class="slide">…</div>
		<div class="slide">…</div>
		<div class="slide">…</div>
		<div class="slide">…</div>
	</div>
	
3) Init the plugin

	<script type="text/javascript">
		$(function() {
			$('.the-main-layer').phslider();
		})
	</script>
	
or
	
	<script type="text/javascript">
		$(function() {
			$('.the-main-layer').phslider({ 
				option: value
			});
		})
	</script>

### Options

- **width**: [int] slider width
- **height** [int] slider height
- **duration** [int] default duration of each slide in seconds
- **animation** [str] default animation of each slide
- **onInit** [function(int totalSlides)] perform operations on phslider init sequence
- **onSlideChange** [function(obj slide, int totalSlides)] perform operations when a slide changes

**About the width/height options** if you do not define width/height parameters, the plugin will get it from the parent element, there's no default width/height values by default.

#### Animations

**slidetop**, **slideleft**, **slidebottom**, **slideright** and **fade**.


#### Handlers
##### onInit(totalSlides)
	totalSlides = null; // Total number of slides
##### onSlideChange(slide, totalSlides)
	slide = {
		slide: null, // Current slide number
		duration: null, // Current slide duration
		animation: null, // Current slide animation
		animationDuration: null // Current slide animation duration
	}

	totalSlides = null; // Total number of slides

###  Customize each slide options

Also, pretty damn simple, just include the apropiate tags in the slide you want to customize:

	…
	<div class="slide" data-duration="3" data-animation="fade">…</div>
	… 
	
Available options:

- **data-duration**: Duration of the slide
- **data-animation**: Animation of the slide 

### Using the button handlers
It's really easy too. Just create HTML elements with the attribute `data-phslider` set to:

- **nextButton**: Go to next slide 
- **prevButton**: Go to previous slide
- **slideToButton**: Go to slide defined in `data-slide` attribute

See example for more details.

## Demo

View **demo.html** included with the plugin or the [online demo](http://pyronhell.github.com/jquery-phslider/) (0.3.1).
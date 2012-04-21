# jquery-phslider

## Overview

**jquery-phslider** is a simple slider for jquery. 

Any bugs and suggestions, please open a ticket. Thanks.

## Compatibility 

*work in progress*

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

- **width**: slider width
- **height** slider height
- **duration** default duration of each slide in seconds
- **animation** default animation of each slide

**About the width/height options** if you do not define width/height parameters, the plugin will get it from the parent element, there's no default width/height values.

#### Animations

**slidetop**, **slideleft**, **slidebottom**, **slideright** and **fade**.

###  Customize each slide options

Also, pretty damn simple, just include the apropiate tags in the slide you want to customize:

	…
	<div class="slide" data-duration="3" data-animation="fade">…</div>
	… 
	
Available options:

- **data-duration**: Duration of the slide
- **data-animation**: Animation of the slide 

## Demo

View **demo.html** included with the plugin or view the [online demo](http://pyronhell.github.com/jquery-phslider/).
// Paperpusher is a jQuery Plugin that takes a JSON object and gives you a
// Bootstrap compatible HTML form.

// It was written by Daniel Baker for Double Negative

// Current repo is at http://stash/projects/PRODSYS/repos/paperpusher/
// Full documentation should be in the included README.md file.

(function( $ ) {

	$.fn.paperPusher = function( options ){

		// Custom Error function
		function err(msg){
			jQuery.error("Paperpusher: "+msg);
			return true;
		}

		// Setting Defaults

		// Default options makeup
		var settings = $.extend({
			elements :	[],
			prepend	:	false,
			buttons	:	[],
		}, options);

		// Default elements makeup and error handling for required objects
		for (var i=0;i<settings.elements.length;i++){
			// Error Handling for required objects
			if (!settings.elements[i].type){
				err("Found Element object without 'type'. This is required for\
 every Element.");
			}
			if (!settings.elements[i].name){
				err("Found Element object without 'name'. This is required for\
 every Element.");
			}
			// Default elements makeup
			settings.elements[i] = $.extend({
				type:	null,
				name:	null,
				label:	"",
				placeholder:	"",
				help:	"",
				required:	false,
				value:	"",
				disabled:	false,
				events:	false
			}, settings.elements[i])
		}

		// Default buttons makeup
		for (var i=0;i<settings.buttons.length;i++){
			settings.buttons[i] = $.extend({
				submit:	false,
				type:	"default",
				label:	"",
				id:	null
			}, settings.buttons[i])
		}

		// Boilerplate input attributes

		function attributes(element){
			var required = "", disabled = "";
			if (element.required){
				required = "required";
			}
			if (element.disabled){
				disabled = "disabled";
			}
			$.each(element, function(key,value){
				if (!value){
					element[key] = "";
				}
			})
			return "id='"+element.name+"' name='"+element.name+"' "+disabled+" \
			placeholder='"+element.placeholder+"' value='"+element.value+"'"+required;
		}

		// Helptext

		function helptext(element){
			var required = "";
			if (element.required){
				required = "<span class='help-block pull-right' style='margin-top:0px'>\
				Required</span>";
			}
			if (element.help.length > 0){
				return "<span class='help-block'>"+ element.help + required +"</span>";
			} else {
				return required;
			}
		}

		// Create options for a select field

		function selectOptions(options){
			var output = "";
			for (var i=0;i<options.length;i++){
				var selected = "";
				if (!options[i].label){
					options[i].label = options[i].value;
				}
				if (options[i].selected){
					selected = 'selected';
				}
				output += "<option value='"+options[i].value+"' "+selected+">\
"+options[i].label+"</option>";
			}
			return output;
		}

		// Fields
		var field = new Object;

		// Text field
		field.text = function(element){
			var output = "";
			output += "<div class='form-group'>";
			output += "<label for='"+element.name+"'>"+element.label+"</label>";
			output += "<input type='text' class='form-control' \
			"+attributes(element)+" >";
			output += helptext(element);
			output += "</div>";
			return output;
		}

		// Email field
		field.email = function(element){
			var output = "";
			output += "<div class='form-group'>";
			output += "<label for='"+element.name+"'>"+element.label+"</label>";
			output += "<input type='email' class='form-control' \
			"+attributes(element)+" >";
			output += helptext(element);
			output += "</div>";
			return output;
		}

		// Date field
		field.date = function(element){
			var output = "";
			output += "<div class='form-group'>";
			output += "<label for='"+element.name+"'>"+element.label+"</label>";
			output += "<input type='date' class='form-control' \
			"+attributes(element)+" >";
			output += helptext(element);
			output += "</div>";
			return output;
		}

		// Select field
		field.select = function(element){
			var output = "", multiple = "";
			if (element.multiple){
				multiple = "multiple";
			}
			output += "<div class='form-group'>";
			output += "<label for='"+element.name+"'>"+element.label+"</label>";
			output += "<select class='form-control' \
			"+attributes(element)+" "+multiple+">";
			output += selectOptions(element.options);
			output += "</select>";
			output += helptext(element);
			output += "</div>";
			return output;
		}

		// Buttons!
		function buttons(button){
			if (button.submit){
				var type = 'submit';
			} else {
				var type = 'button';
			}
			return "<button type='"+type+"' class='btn btn-"+button.type+"' \
			id='"+button.id+"'>"+button.label+"</button>";
		}

		// Various event hooks
		function events(element){
			$.each(element.events, function(event, action){
				$(document).on(event, '#'+element.name, function(){
					action(this);
				})
			});
		}

		if (options == 'types'){
			var keys = [];
			for(var k in field) keys.push(k);
			return keys;
		}

		// Main
		this.each(function(){
			var parent = $(this), html = "";
			for(var i=0;i<settings.elements.length;i++){
				if (field[elements[i].type]){
					html += field[elements[i].type](elements[i]);
				} else {
					err("Cannot find field type: '"+elements[i].type+"'")
				}
				if (settings.elements[i].events){
					events(settings.elements[i])
				}
			}
			if (settings.buttons.length > 0){
				html += "<div class='btn-group'>";
			}
			for(var i=0;i<settings.buttons.length;i++){
				html += buttons(settings.buttons[i]);
			}
			if (settings.buttons.length > 0){
				html += "</div>";
			}
			if (settings.prepend){
				parent.prepend(html);
			} else {
				parent.append(html);
			}
		});
	};

	return this;

}( jQuery ));

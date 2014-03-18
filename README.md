paperpusher
===========

A jQuery Plugin that takes a JSON object and gives you a Bootstrap compatible HTML form.

## Dependencies
While Paperpusher will work without Bootstrap, it creates a bootstrap-flavoured form for a reason. If you're not using Bootstrap in your project, the markup will be easy to style, and you could always go look at what Bootstrap are doing to their classes if you want to replicate any of it. (*see more at [Bootstrap](http://getbootstrap.com/)*)

Paperpusher is a jQuery plugin, and thus depends on jQuery being loaded before you load in the paperpusher.js file.

## Installation
You can download just the paperpusher.min.js file and include it after jQuery in your project for the minimal installation.

To install via Bower:
````
bower install paperpusher
````

## Usage
Before using Paperpusher in your project, include jQuery and paperpusher.js (or minified).

Make yourself a container. This can be a form object, or just a div if you're not wanting to do traditional HTML submissions.

```` html
<form id='formid' role='form' action='submit.html' method='post'>
</form>
````

Then you want to define your elements in Javascript. Each element is an input in your form. Here's an example, but see the Documentation section for all the options.

```` javascript
var elements = [
	{
    	type: 'text',
        name: 'fullname',
        label: 'Full Name',
        placeholder: 'e.g. Frank Black',
        help: 'Please put your full name',
        required: true
    },
    {
    	type: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. frank@thepixies.com',
        help: 'Use a *real* email address',
        required: true
    }
]
````

When you've got your elements, you need to define what buttons you want.

```` javascript
var buttons = [
	{
    	label: 'Sign Up!',
        id: 'submit-btn',
        submit: true,
        type: 'success'
    },
    {
    	label: 'Cancel',
        id: 'cancel-btn',
        type: 'warning'
    }
]
````

You don't actually have to define buttons. But buttons are pretty useful for forms. The ID part here is important - if you want to have your buttons do things other than submit, you'll use the ID to hook onto a click event.

You can then initiate the form!

```` javascript
$('#formid').paperPusher({
	elements: elements,
    buttons: buttons,
    prepend: true
});
````

That's it!

## Documentation

### Paperpusher

#### elements - *array*
Array of Objects that describe the form's elements. Documentation on an 'element' is below.
#### buttons - *array*
Array of Objects that describe the form's buttons. Documentation on a 'button' is below.
#### prepend - *boolean*
*Default: false*

When True, this will prepend, rather than append, the form's markup to the parent selector.

### Elements

#### type - *string, required*
The type of field element. You can see a list of supported field types by running the command
````javascript
$().paperPusher('types');
````
#### name - *string, required*
This will be the field element's 'name' and 'id'. When a form is submitted this will be the value's key
#### label - *string*
This label appears above the field and describes what the field is.
#### placeholder - *string*
This is an HTML5 placeholder and appears in the field if it is empty. Useful for examples in your form. Only applicable in certain fields - such as text and email, rather than selects.
#### help - *string*
Help text appears below the field and can be a good place to explain what a user needs to input here.
#### required - *boolean*
*Default: false*

If True, this attaches an HTML5 required tag to the element. Also adds a 'Required' label.
#### value - *string*
*Default: null*

If not null, this will be the starting value of this field. Will only work on applicable fields, such as text and email, rather than selects.
#### disabled - *boolean*
*Default: false*

If True, this will attach an HTML5 'disbaled' tag to the form element to grey it out.
#### options - *array*
Only applicable to select fields, this is an array of objects that form the options for your select.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**options[i].label - *string***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
This should be the text that shows up in the select option. If not present, the label will be equal to the value.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**options[i].value - *string, required***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
This is the value of the select option. If there is no specified label, then it will also be the label.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**options[i].selected - *boolean***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
*Default: false*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
If True, this will preselect this option. There should only be one of these True in the Array.

#### events - *object*
Here you can specify any events to be attached to this element. They should have keys that match valid jQuery events, and the value should be the function to run on that event. It accepts one argument, which is the element that it is attached to. Here's an example:
```` javascript
events: {
  focus: function(element){
    console.log('You just focussed on '+element.id);
  }
}
````

### Buttons

#### label - *string*
This is the text that shows up in the button

#### id - *string*
This is the ID of the button. Take note of this, as you may want to hook onto a click of this button using this ID.

#### type - *string*
*Default: 'default'*

This will be added as a class to the button with the prefix 'btn-'. In Bootstrap this affects the styling of the button, for example currently a button with a class of 'btn-primary' is blue, and 'btn-default' is white. See Bootstrap docs for more.

#### submit - *boolean*
*Default: false*

If True, this will set the button to be a submit button, and will submit the form.

## License

Paperpusher is distributed under the MIT License. If you use this utility in a public environment, please attribute and link back to the github repo in your code.

For more on the MIT License, look [here](http://choosealicense.com/licenses/mit/).

## Contributing

If you want to extend Paperpusher in any way, please do! If you think your work would be benificial to others, then I'm happy to accept pull requests.

For more on pull requests, look [here](http://oss-watch.ac.uk/resources/pullrequest).

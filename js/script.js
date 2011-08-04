/* Author: 

*/
var startidx = 0;
var loopTimer;

$( '.note' ).click(function(){
    if ($(this).hasClass('clicked')) {
	$(this).removeClass('clicked')
    } else {
	$( this ).addClass('clicked');
    }
});

var playing = new Array();
var audiolet = new Audiolet();
var siner = null;

var notevalues = [
    110.00,
    116.54,
    123.47,
    130.81,
    138.59,
    146.83,
    155.56,
    164.81,
    174.61,
    185.00,
    196.00,
    207.65,
    220.00,
    233.08,
    246.94,
    261.63,
    277.18,
    293.67,
    311.13,
    329.63,
    349.23,
    369.99,
    392.00,
    415.30,
    440.00,
    466.16,
    493.88,
    523.25,
    554.37,
    587.33,
    622.25,
    659.26].reverse();

function updateBPM() {
    if (loopTimer) {
	clearInterval(loopTimer);
    } 
    
    loopTimer = setInterval(function() {
	
	while(playing.length > 0) {
	    var valitem = playing.pop();
	    valitem.disconnect(audiolet.output);
	};

	$('.notecolum').get(startidx).className="notecolum";
	startidx = (startidx + 1) % 32;
	$('.notecolum').get(startidx).className="notecolum playing";
	$('.playing').children('.clicked').each(function(idx,valitem) {
	    console.log("hello");
	    siner = new Sine(audiolet,notevalues[valitem.dataset.column]);
	    siner.connect(audiolet.output);
	    playing.push(siner);
	});
    },$('#bpm-setting').val());
    $('#bpmnumbers').html(Math.ceil(60000 / ($('#bpm-setting').val() * 4)));
    return false;
};

$('#playbutton').click(updateBPM);

$('#clearbutton').click(function() {
	if (loopTimer) {
	    clearInterval(loopTimer);
	} 
    $('.playing').removeClass('playing');
    startidx = 0;
    $('.clicked').each(function(idx,valitem) {
	
	valitem.removeClass('clicked');
    });
});

//var sinetwo = new Sine(audiolet, 550);
//var sinethree = new Sine(audiolet, 650);
//sine.connect(audiolet.output);
//sinetwo.connect(audiolet.output);
//sinethree.connect(audiolet.output);
























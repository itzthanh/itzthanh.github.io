$(document).ready(function () {
	//change current section tab on navigation header
	$('.nav > li').on('click', function(e) {
    	$('.nav > li').removeClass('active');
    	$(this).addClass('active');
	});

	//change href based on section of page user scrolled to
	$(window).on('activate.bs.scrollspy', function (e) {	
  		history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
  		var currentSection = e.target;
}	);

	//scroll to page rather than "jump" to it when user clicks on a tab
  	$(".navbar a").on('click', function() {
    	if (this.hash) {
    		// var active = $(this).parent()[0];
    		// $(".nav").find(".active").removeClass("active");
    		// $(active).toggleClass("active");
	      	event.preventDefault();
	      	var location = this.hash;
	      	if (location == "#contact"){
	      		history.replaceState({}, "", $("a[href^='#']", location).attr("href"));
	      	}
	      	$('html, body').animate({
	        	scrollTop: $(location).offset().top-25
	      	}, 500, function(){
	      	}); 	
    	}
  	});
  	
  	//hides skills chart when user isn't viewing the about or home section
  	var barGraph;
  	$(document).on("scroll", function(){
  		if(location.hash.toString() != '#about' && location.hash.toString() != "#home"){
  	  		barGraph.reset();
  	  	} else{
  	  		barGraph.update(2500,false);
  	  	}
  	});

  	lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
    })

  	//renders "skills" bargraph
  	generateGraph();

  	//photo slideshow
  	var slideIndex = 0;
	slideShow();

	/******functions below*****/
	function slideShow() {
	    var slides = document.getElementsByClassName("thanh_images");
	    if (slideIndex == 0){
	    	slides[slides.length-1].style.display = "none";
	    } else{
	    	slides[slideIndex-1].style.display = "none";
	    	slides[slideIndex-1].style.opacity = 0;

	    }
	    slides[slideIndex].style.display = "block"; 
	    slides[slideIndex].style.opacity = 1;
	    slideIndex++;
	    if (slideIndex == slides.length){
	    	slideIndex = 0;
	    }
	    setTimeout(slideShow, 3000);
	}

	function generateGraph(){
		var ctx = document.getElementById("myChart").getContext('2d');
	  	Chart.defaults.global.defaultFontColor = 'white';
	  	Chart.defaults.global.defaultFontFamily = 'Roboto', 'serif';
	  	Chart.defaults.global.defaultFontStyle = "bolder";
	  	Chart.defaults.global.legend.display = false;
	  	Chart.defaults.global.tooltips.enabled = false;
	  	Chart.defaults.global.animation.duration = 3000;
	  	Chart.defaults.global.animation.easing = 'easeOutBounce';
		var myChart = new Chart(ctx, {
		    type: 'horizontalBar',
		    data: {
		        labels: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Java"],
		        datasets: [{
		            label: '',
		            data: [5,5,4,3,2,2],
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                '#557A95',
		                '#9d8b7b',
		                '#669966',
		                '#666699',
		                '#997a00'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                '#cedae3',
		                '#d4cbc4',
		                '#66CC66',
		                'rgba(153, 102, 255, 1)',
		                '#ffcc00'
		            ],
		            hoverBorderWidth: 2,
		            borderWidth: 1
		        }]
		    },
		    options: {
		    	maintainAspectRatio: false,
		    	responsive: true,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    callback: function(value, index, values){              
		                    	return value;
		                    }		                  
		                },
		                gridLines: {
		        			display: true
		        		}
		            }],
		            xAxes: [{
		            	gridLines: {
		            		display: false
		            	}, 
		            	ticks: {
		            		beginAtZero: true,
		            		steps: 3,
		            		stepSize: 2,
		            		max: 6,
		            		callback: function(value, index, values){
		            			switch (value){
		            				case 2:
		            					return 'Basic Knowledge';
		            				case 4:
		            					return 'Working Knowledge';
		            			}
		            		}
		            	}
		            }],
		        }
		    }
		});
		barGraph = myChart;
	}

});
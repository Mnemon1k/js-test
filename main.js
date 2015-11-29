var items = (function(){

		var usedItems = [],
				availableItems = [],

				$el = $("#itemsModule"),
				
				$availableUl = $el.find("#available"),
				$usedUl = $el.find("#used"),
				
				availableTemplate = $el.find("#available-template").html(),
				usedTemplate = $el.find("#used-template").html(),
				
				$addBnt = $el.find("#add"),
				$removeBnt = $el.find("#remove"),
				$resetBnt = $el.find("#reset");

				settings = {
					"dataPath": "data/items.json"
				};

		var request = new XMLHttpRequest();

		//Initialization
		_makeRequest();
		// _render(true);

		//Getting data from server
		function _makeRequest (){
			request.open("GET", settings["dataPath"], true);
			request.onreadystatechange = _saveDataFromJson;
			request.send(null); 
		}

		function _saveDataFromJson(){
			if (request.readyState === 4 && request.status === 200) { 
				usedItems = JSON.parse(request.responseText)["usedItems"];
				availableItems = JSON.parse(request.responseText)["availableItems"];
				_render(true);
			 }
		}

		function _render( binding ){
			var data = {
				available: availableItems,
				used: usedItems
			};

			$availableUl.html(Mustache.render(availableTemplate, data));
			$usedUl.html(Mustache.render(usedTemplate, data));
			
			// if(binding){
				_bindEvents();
			// }
		}

		function _bindEvents(){
			//Single item handler`s
			$("#available i").on("click", _addItem);
			$("#used i").on("click", _removeItem);

			// Button handler`s
			$addBnt.on("click", _addAllItems);
			$removeBnt.on("click", _removeAllItems);
			$resetBnt.on("click", _makeRequest);

			//Drag & Drop
			// $(".items .item").draggable({
			// 	containment: 'document', 
			// 	revert: true,
			// 	cancel: "i",
			// 	opacity: 0.35,
			// 	start: function(){
			// 		movedItemIndex = $(this).parent().find(".item").index( $(this) );
			// 		$(".items").addClass("plus");
			// 		$(this).parent().removeClass("plus");
			// 	},
			// 	stop: function(){
			// 		$(".items").removeClass("plus");
			// 	}
			// });

			// $('.items.used').droppable({
			// 	accept: '.available .item',
			// 	drop: function(){
			// 		if($(this).hasClass("used")){
			// 			usedItems.push(availableItems[movedItemIndex]);
			// 			availableItems.splice(movedItemIndex, 1);
			// 			_render();
			// 		} 
			// 	}
			// });
			// $('.items.available').droppable({
			// 	accept: '.used .item',
			// 	drop: function(){
			// 		if($(this).hasClass("available")){
			// 			availableItems.push(usedItems[movedItemIndex]);
			// 			usedItems.splice(movedItemIndex, 1);
			// 			_render();
			// 		} 
			// 	}
			// });
		}
		function _addItem (){
				//Identifaing clicked item and removing it to array with used items 
			var curentItemIndex = $(this).parent().parent().find(".item").index($(this).parent());
			usedItems.push(availableItems[curentItemIndex]);
			availableItems.splice(curentItemIndex, 1);

			_render();
		}
		function _removeItem (){
				//Identifaing clicked item and removing it to array with available items 
			var curentItemIndex = $(this).parent().parent().find(".item").index($(this).parent());
			availableItems.push(usedItems[curentItemIndex]);
			usedItems.splice(curentItemIndex, 1);

			_render();
		}
		function _addAllItems (){
			//Move all items to array with used items
			usedItems = usedItems.concat(availableItems);
			availableItems = [];
			_render();
		}
		function _removeAllItems (){
			//Move all items to array with available items
			availableItems = availableItems.concat(usedItems);
			usedItems = [];
			_render();
		}

		// API
		return {};
})();
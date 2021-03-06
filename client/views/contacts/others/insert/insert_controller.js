this.ContactsOthersInsertController = RouteController.extend({
	template: "ContactsOthersInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("other_empty"),
			Meteor.subscribe("other_list")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			other_empty: Others.findOne({_id:null}, {}),
			other_list: Others.find({}, {sort:["name"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
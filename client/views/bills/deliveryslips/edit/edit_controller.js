this.BillsDeliveryslipsEditController = RouteController.extend({
	template: "BillsDeliveryslipsEdit",
	

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
			Meteor.subscribe("customer_list_select"),
			Meteor.subscribe("deliveryslip_details", this.params.deliveryslipId)
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
			customer_list_select: Customers.find({}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			deliveryslip_details: Deliveryslips.findOne({_id:this.params.deliveryslipId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
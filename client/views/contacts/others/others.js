var pageSession = new ReactiveDict();

Template.ContactsOthers.rendered = function() {
	
};

Template.ContactsOthers.events({
	
});

Template.ContactsOthers.helpers({
	
});

var ContactsOthersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsOthersViewSearchString");
	var sortBy = pageSession.get("ContactsOthersViewSortBy");
	var sortAscending = pageSession.get("ContactsOthersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["industry", "name", "phone", "email", "website", "address", "note"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var ContactsOthersViewExport = function(cursor, fileType) {
	var data = ContactsOthersViewItems(cursor);
	var exportFields = ["industry", "name", "phone", "email", "website", "address", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ContactsOthersView.rendered = function() {
	pageSession.set("ContactsOthersViewStyle", "table");
	
};

Template.ContactsOthersView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("ContactsOthersViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("ContactsOthersViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("ContactsOthersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.others.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContactsOthersViewExport(this.other_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactsOthersViewExport(this.other_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactsOthersViewExport(this.other_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactsOthersViewExport(this.other_list, "json");
	}

	
});

Template.ContactsOthersView.helpers({

	"insertButtonClass": function() {
		return Others.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.other_list || this.other_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.other_list && this.other_list.count() > 0;
	},
	"isNotFound": function() {
		return this.other_list && pageSession.get("ContactsOthersViewSearchString") && ContactsOthersViewItems(this.other_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactsOthersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactsOthersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactsOthersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactsOthersViewStyle") == "gallery";
	}

	
});


Template.ContactsOthersViewTable.rendered = function() {
	
};

Template.ContactsOthersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ContactsOthersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactsOthersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactsOthersViewSortAscending") || false;
			pageSession.set("ContactsOthersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactsOthersViewSortAscending", true);
		}
	},
	
});

Template.ContactsOthersViewTable.helpers({
	"tableItems": function() {
		return ContactsOthersViewItems(this.other_list);
	}
});


Template.ContactsOthersViewTableItems.rendered = function() {
	
};

Template.ContactsOthersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("contacts.others.details", {otherId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Others.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();

		var me = this,
			el = $('.modal');

		el.openModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			ready: function() {
				el.find('.modal-confirm').on('click', function() {
					Others.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("contacts.others.edit", {otherId: this._id});
		return false;
	}
});

Template.ContactsOthersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Others.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Others.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

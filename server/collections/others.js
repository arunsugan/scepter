Others.allow({
	insert: function (userId, doc) {
		return Others.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Others.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Others.userCanRemove(userId, doc);
	}
});

Others.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Others.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Others.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Others.before.remove(function(userId, doc) {
	
});

Others.after.insert(function(userId, doc) {
	
});

Others.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Others.after.remove(function(userId, doc) {
	
});
